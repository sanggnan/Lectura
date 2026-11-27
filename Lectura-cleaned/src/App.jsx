import { useState, useEffect, useRef, useCallback } from 'react'
import { YouTubePlayer } from './components/YouTubePlayer'
import { AssistantPanel } from './components/AssistantPanel'
import { useFaceDetection } from './hooks/useFaceDetection'
import { useClaudeAgent } from './hooks/useClaudeAgent'
import { fetchYouTubeTranscript, getTranscriptSlice } from './hooks/useYouTubeTranscript'

const WINDOW_SECS = 120
const CONFUSION_PERSIST = 8
const CONFUSION_COOLDOWN = 45000

export default function App() {
  const playerRef = useRef(null)
  const hiddenVideoRef = useRef(null)

  const [sessionActive, setSessionActive] = useState(false)
  const sessionActiveRef = useRef(false)
  const sessionStartRef = useRef(null)
  const [confusionMarkers, setConfusionMarkers] = useState([])
  const confusionMarkersRef = useRef([])
  const [faceState, setFaceState] = useState('noface')
  const [cameraError, setCameraError] = useState(null)
  const [transcriptLoaded, setTranscriptLoaded] = useState(false)

  const confusionFramesRef = useRef(0)
  const stateBufferRef = useRef([])
  const camStreamRef = useRef(null)
  const animRef = useRef(null)
  const currentTopicRef = useRef(null)
  const lastConfusionTimeRef = useRef(0)
  const transcriptRef = useRef([])
  const lastProcessedWindowRef = useRef(-1)

  const { modelsLoaded, modelError, loadModels, detectExpression, classifyResult } = useFaceDetection()
  const agentRef = useRef(null)
  const { topics, chatMessages, thinking, summaryDoc, analyzeTranscriptSlice, handleConfusion, sendMessage, generateSummaryDoc, reset, confusionCount } = useClaudeAgent()

  useEffect(() => {
    agentRef.current = { analyzeTranscriptSlice, handleConfusion, sendMessage, generateSummaryDoc, reset }
  })

  useEffect(() => { currentTopicRef.current = topics[topics.length - 1] ?? null }, [topics])

  useEffect(() => {
    loadModels()
    fetchYouTubeTranscript().then(t => {
      transcriptRef.current = t
      setTranscriptLoaded(true)
    })
  }, [loadModels])

  // Called every second by YouTubePlayer as the video plays
  // This is the ONLY place we check for new transcript windows
  const handleVideoTimeUpdate = useCallback((videoTime) => {
    if (!sessionActiveRef.current) return
    if (videoTime < 5 || transcriptRef.current.length === 0) return

    // Window N is complete once videoTime >= (N+1)*WINDOW_SECS
    const lastCompletedWindow = Math.floor(videoTime / WINDOW_SECS) - 1
    if (lastCompletedWindow < 0) return
    if (lastCompletedWindow <= lastProcessedWindowRef.current) return

    // Process each unprocessed completed window
    for (let w = lastProcessedWindowRef.current + 1; w <= lastCompletedWindow; w++) {
      const windowStart = w * WINDOW_SECS
      const windowEnd = windowStart + WINDOW_SECS
      const slice = getTranscriptSlice(transcriptRef.current, windowStart, windowEnd)
      lastProcessedWindowRef.current = w
      if (slice.trim().length > 20) {
        agentRef.current?.analyzeTranscriptSlice(slice, w, windowStart)
      }
    }
  }, [])

  // Face detection rAF loop
  const detectLoopRef = useRef(null)
  detectLoopRef.current = () => {
    if (!sessionActiveRef.current) return
    const video = hiddenVideoRef.current
    if (video && modelsLoaded && video.readyState >= 2) {
      const result = detectExpression(video)
      const state = classifyResult(result)
      stateBufferRef.current.push(state)
      if (stateBufferRef.current.length > 10) stateBufferRef.current.shift()
      const confusedCount = stateBufferRef.current.filter(s => s === 'confused').length
      const understoodCount = stateBufferRef.current.filter(s => s === 'understanding').length
      const smoothed = confusedCount >= 5 ? 'confused' : understoodCount >= 5 ? 'understanding' : 'neutral'
      setFaceState(smoothed)
      if (smoothed === 'confused') {
        confusionFramesRef.current++
        const now = Date.now()
        if (confusionFramesRef.current >= CONFUSION_PERSIST && now - lastConfusionTimeRef.current > CONFUSION_COOLDOWN) {
          lastConfusionTimeRef.current = now
          confusionFramesRef.current = 0
          const vt = playerRef.current?.getCurrentTime() ?? null
          const st = sessionStartRef.current ? (now - sessionStartRef.current) / 1000 : 0
          const marker = { sessionTime: st, videoTime: vt }
          confusionMarkersRef.current = [...confusionMarkersRef.current, marker]
          setConfusionMarkers([...confusionMarkersRef.current])
          agentRef.current?.handleConfusion(currentTopicRef.current)
        }
      } else {
        if (confusionFramesRef.current > 0) confusionFramesRef.current--
      }
    }
    animRef.current = requestAnimationFrame(detectLoopRef.current)
  }

  const startSession = async () => {
    agentRef.current?.reset()
    lastProcessedWindowRef.current = -1
    confusionFramesRef.current = 0
    stateBufferRef.current = []
    confusionMarkersRef.current = []

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, facingMode: 'user' } })
      camStreamRef.current = stream
      hiddenVideoRef.current.srcObject = stream
      await hiddenVideoRef.current.play()
    } catch {
      setCameraError('Camera unavailable — confusion detection disabled')
    }

    sessionStartRef.current = Date.now()
    sessionActiveRef.current = true
    setSessionActive(true)
    setConfusionMarkers([])
    animRef.current = requestAnimationFrame(detectLoopRef.current)
  }

  const stopSession = async () => {
    sessionActiveRef.current = false
    cancelAnimationFrame(animRef.current)
    if (camStreamRef.current) { camStreamRef.current.getTracks().forEach(t => t.stop()); camStreamRef.current = null }
    if (hiddenVideoRef.current) hiddenVideoRef.current.srcObject = null
    const duration = sessionStartRef.current ? (Date.now() - sessionStartRef.current) / 1000 : 0
    await agentRef.current?.generateSummaryDoc(topics, confusionCount, duration)
    setSessionActive(false)
    setFaceState('noface')
  }

  const currentTopic = topics[topics.length - 1] ?? null
  const faceColor = { understanding:'var(--green)', confused:'var(--red)', neutral:'var(--amber)', noface:'var(--text3)' }[faceState]
  const faceLabel = { understanding:'😊 engaged', confused:'😕 confused', neutral:'😐 neutral', noface:'no face' }[faceState]

  return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', padding:14, gap:10, background:'var(--bg)' }}>
      <video ref={hiddenVideoRef} autoPlay muted playsInline
        style={{ position:'fixed', top:0, left:0, width:1, height:1, opacity:0.01, pointerEvents:'none', zIndex:-1 }}
      />
      <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <span style={{ fontSize:15, fontWeight:700, color:'var(--text)', letterSpacing:'-.02em' }}>Lectura</span>
        <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 12px', background:'var(--bg3)', borderRadius:20, border:`1px solid ${faceColor}40`, transition:'all .5s' }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:faceColor, transition:'background .5s', boxShadow: sessionActive ? `0 0 6px ${faceColor}` : 'none' }} />
          <span style={{ fontSize:11, color:faceColor, fontWeight:500, transition:'color .5s' }}>{faceLabel}</span>
        </div>
        <span style={{ fontSize:11, color: modelsLoaded ? 'var(--green)' : modelError ? 'var(--red)' : 'var(--text3)' }}>
          {modelsLoaded ? '● AI ready' : modelError ? '● AI error' : '○ loading AI…'}
        </span>
        <span style={{ fontSize:11, color: transcriptLoaded ? 'var(--green)' : 'var(--text3)' }}>
          {transcriptLoaded ? '● transcript ready' : '○ loading transcript…'}
        </span>
        {cameraError && <span style={{ fontSize:11, color:'var(--amber)' }}>⚠ {cameraError}</span>}
        <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
          {sessionActive && (
            <span style={{ fontSize:11, color:'var(--text2)', display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block', animation:'pulse 2s infinite' }} />
              Live · {topics.length} topic{topics.length !== 1 ? 's' : ''} · {confusionMarkers.length} confusion{confusionMarkers.length !== 1 ? 's' : ''}
            </span>
          )}
          <button
            onClick={sessionActive ? stopSession : startSession}
            style={sessionActive
              ? { background:'var(--red-bg)', color:'var(--red)', borderColor:'var(--red)' }
              : { background:'var(--blue)', color:'#000', borderColor:'var(--blue)', fontWeight:600 }
            }
          >
            {sessionActive ? '⏹ End Session' : '▶ Start Session'}
          </button>
        </div>
      </div>
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 380px', gap:12, minHeight:0 }}>
        <YouTubePlayer ref={playerRef} markers={confusionMarkers} onTimeUpdate={handleVideoTimeUpdate} />
        <AssistantPanel
          topics={topics} chatMessages={chatMessages} thinking={thinking}
          onSendMessage={msg => sendMessage(msg, currentTopic)}
          onGenerateSummary={() => {
            const duration = sessionStartRef.current ? (Date.now() - sessionStartRef.current) / 1000 : 0
            generateSummaryDoc(topics, confusionCount, duration)
          }}
          currentTopic={currentTopic} summaryDoc={summaryDoc}
          sessionActive={sessionActive} confusionCount={confusionCount}
        />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }`}</style>
    </div>
  )
}
