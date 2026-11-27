import { useRef, useState, useCallback } from 'react'
import { getTopicStats, findMatchingTopics } from '../data/studentData'

const CLAUDE_API = 'http://localhost:3001/api/claude'
const MODEL = 'claude-sonnet-4-20250514'
const ERROR_RATE_THRESHOLD = 40 // % — alert if topic error rate exceeds this

async function callClaude(messages, system, maxTokens = 1000) {
  const res = await fetch(CLAUDE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages })
  })
  const data = await res.json()
  return data.content?.find(b => b.type === 'text')?.text ?? ''
}

export function useClaudeAgent() {
  const [topics, setTopics] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [thinking, setThinking] = useState(false)
  const [summaryDoc, setSummaryDoc] = useState(null)
  const topicsRef = useRef([])
  const chatRef = useRef([])
  const confusionCountRef = useRef(0)
  const lastConfusionPromptRef = useRef(0)
  const processedWindowsRef = useRef(new Set())
  const alertedTopicsRef = useRef(new Set()) // don't double-alert same topic

  const topicStats = getTopicStats()

  const addChatMessage = useCallback((msg) => {
    chatRef.current = [...chatRef.current, msg]
    setChatMessages([...chatRef.current])
  }, [])

  // Called every 2 minutes with completed transcript window
  const analyzeTranscriptSlice = useCallback(async (transcriptText, windowIndex, videoTimeSec) => {
    if (!transcriptText?.trim() || transcriptText.trim().length < 30) return
    if (processedWindowsRef.current.has(windowIndex)) return
    processedWindowsRef.current.add(windowIndex)

    setThinking(true)
    try {
      const system = `You are an educational assistant analyzing lecture transcripts. Return ONLY valid JSON, no markdown, no explanation.`
      const prompt = `Analyze this lecture transcript and identify the specific topic being taught.

Transcript:
"${transcriptText}"

Return JSON in exactly this format:
{
  "topicName": "Concise topic name (4-7 words, e.g. 'Isolating the Variable')",
  "bullets": [
    "Key concept explained",
    "Another key point",
    "Example or technique shown",
    "Important rule or takeaway"
  ]
}`
      const raw = await callClaude([{ role: 'user', content: prompt }], system)
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())

      const newTopic = {
        id: Date.now(),
        name: parsed.topicName,
        bullets: parsed.bullets,
        videoTime: videoTimeSec,
        windowIndex,
      }
      topicsRef.current = [...topicsRef.current, newTopic]
      setTopics([...topicsRef.current])

      // Cross-reference with student performance data
      await checkStudentDataAlert(parsed.topicName, parsed.bullets)

    } catch (e) {
      console.error('Topic analysis failed', e)
    }
    setThinking(false)
  }, [])

  // Check student data — match on topic name AND bullet content, flag anything above threshold
  const checkStudentDataAlert = useCallback(async (topicName, topicBullets) => {
    if (alertedTopicsRef.current.has(topicName)) return

    const matches = findMatchingTopics(topicName, topicBullets, topicStats)
    const flagged = matches.filter(m => m.errorRate >= ERROR_RATE_THRESHOLD)
    if (flagged.length === 0) return

    alertedTopicsRef.current.add(topicName)

    setThinking(true)
    try {
      const matchSummary = flagged.map(m =>
        `- "${m.topic}": ${m.errorRate}% error rate, avg ${m.avgTime}s to solve. Common mistakes: ${m.topErrors.join(', ')}. Matched on: ${(m.reasons || []).join(', ')}`
      ).join('\n')

      const system = `You are a supportive educational assistant. Be encouraging but direct. No markdown headers.`
      const prompt = `A student is watching a lecture about "${topicName}".

The lecture covers these concepts:
${topicBullets.map(b => '- ' + b).join('\n')}

Based on matching this content against student performance data, the following related topics have high error rates:
${matchSummary}

Write a concise, friendly alert (3-4 sentences) that:
1. Tells the student this area tends to be challenging, referencing the specific error rate(s)
2. Points out the most common mistake(s) to watch out for based on the data
3. Gives 2 short practice problems (with answers) directly related to what was just explained

Be warm and specific — mention the actual concepts from the lecture content above.`

      const response = await callClaude([{ role: 'user', content: prompt }], system)

      addChatMessage({
        role: 'assistant',
        content: response,
        id: Date.now(),
        type: 'student_data_alert',
        stats: flagged[0],
        allMatches: flagged,
      })
    } catch (e) {
      console.error('Student data alert failed', e)
    }
    setThinking(false)
  }, [topicStats, addChatMessage])

  const handleConfusion = useCallback(async (currentTopic) => {
    const now = Date.now()
    if (now - lastConfusionPromptRef.current < 90000) return
    lastConfusionPromptRef.current = now
    confusionCountRef.current++

    setThinking(true)
    try {
      const topicContext = currentTopic
        ? `The student is watching a lecture about: "${currentTopic.name}". Key points: ${currentTopic.bullets.join('; ')}.`
        : 'The student is watching a math lecture.'

      const system = `You are a warm, supportive educational assistant. Be concise and encouraging. No markdown.`
      const prompt = `${topicContext}

The student appears confused based on their facial expression. Write a short supportive message (2-3 sentences) that gently checks in and offers 2 specific clarifying questions or hints about the current topic.`

      const response = await callClaude([{ role: 'user', content: prompt }], system)
      addChatMessage({ role: 'assistant', content: response, id: Date.now(), type: 'confusion_prompt' })
    } catch (e) {
      console.error('Confusion handler failed', e)
    }
    setThinking(false)
  }, [addChatMessage])

  const sendMessage = useCallback(async (userText, currentTopic) => {
    addChatMessage({ role: 'user', content: userText, id: Date.now() })
    setThinking(true)

    try {
      const topicContext = currentTopic
        ? `The student is watching a lecture about "${currentTopic.name}". Points covered: ${currentTopic.bullets.join('; ')}.`
        : ''
      const system = `You are a helpful educational assistant. ${topicContext} Be concise, clear, and encouraging.`
      const history = chatRef.current.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
      const response = await callClaude(history, system)
      addChatMessage({ role: 'assistant', content: response, id: Date.now() + 1 })
    } catch {
      addChatMessage({ role: 'assistant', content: 'Sorry, I had trouble responding. Please try again.', id: Date.now() + 1 })
    }
    setThinking(false)
  }, [addChatMessage])

  const generateSummaryDoc = useCallback(async (allTopics, confusionCount, sessionDuration) => {
    if (allTopics.length === 0) return
    setThinking(true)
    try {
      const topicSummary = allTopics.map((t, i) =>
        `Topic ${i+1}: ${t.name}\n${t.bullets.map(b => `  - ${b}`).join('\n')}`
      ).join('\n\n')

      // Include student data insights in summary
      const dataInsights = allTopics.map(t => {
        const matches = findMatchingTopics(t.name, t.bullets || [], topicStats)
        const match = matches[0]
        if (match && match.errorRate >= ERROR_RATE_THRESHOLD) {
          return `${t.name}: ${match.errorRate}% error rate — common mistake: ${match.topErrors[0] || 'see notes'}`
        }
        return null
      }).filter(Boolean)

      const system = `You are an educational assistant creating a personalized lecture summary.`
      const prompt = `Create a lecture summary for a student based on these topics:

${topicSummary}

Session info:
- Duration: ${Math.floor(sessionDuration / 60)} minutes
- Confusion events: ${confusionCount}
${dataInsights.length > 0 ? `\nChallenging topics flagged by student data:\n${dataInsights.map(d => `  - ${d}`).join('\n')}` : ''}

Write a structured summary with:
1. Lecture overview
2. Each topic with clear explanation
3. Key rules to remember
4. Topics to review (based on confusion events and student data)
5. Suggested practice problems for flagged topics`

      const doc = await callClaude([{ role: 'user', content: prompt }], system, 2000)
      setSummaryDoc(doc)
      return doc
    } catch (e) {
      console.error('Summary failed', e)
    }
    setThinking(false)
  }, [topicStats])

  const reset = useCallback(() => {
    processedWindowsRef.current = new Set()
    alertedTopicsRef.current = new Set()
    topicsRef.current = []
    chatRef.current = []
    confusionCountRef.current = 0
    lastConfusionPromptRef.current = 0
    setTopics([])
    setChatMessages([])
    setSummaryDoc(null)
    setThinking(false)
  }, [])

  return {
    topics, chatMessages, thinking, summaryDoc,
    analyzeTranscriptSlice, handleConfusion, sendMessage,
    generateSummaryDoc, reset,
    get confusionCount() { return confusionCountRef.current }
  }
}
