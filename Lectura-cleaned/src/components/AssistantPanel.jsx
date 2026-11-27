import { useState, useRef, useEffect } from 'react'
import { TopicDropdown } from './TopicDropdown'

export function AssistantPanel({ topics, chatMessages, thinking, onSendMessage, onGenerateSummary, currentTopic, summaryDoc, sessionActive, confusionCount }) {
  const [tab, setTab] = useState('topics') // 'topics' | 'chat' | 'summary'
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (tab === 'chat') chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, tab])

  // Auto-switch to chat when a confusion prompt arrives
  useEffect(() => {
    const last = chatMessages[chatMessages.length - 1]
    if (last?.type === 'confusion_prompt') setTab('chat')
  }, [chatMessages])

  const send = () => {
    if (!input.trim()) return
    onSendMessage(input.trim())
    setInput('')
  }

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  const tabs = [
    { id: 'topics', label: 'Topics', badge: topics.length || null },
    { id: 'chat', label: 'Assistant', badge: chatMessages.filter(m => m.type === 'confusion_prompt').length || null },
    { id: 'summary', label: 'Summary' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg2)', borderRadius:'var(--radius)', border:'1px solid var(--border)', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background: sessionActive ? 'var(--green)' : 'var(--text3)', boxShadow: sessionActive ? '0 0 6px var(--green)' : 'none', transition:'all .3s' }} />
          <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>Smart Learning Assistant</span>
          {thinking && <span style={{ fontSize:10, color:'var(--blue)', marginLeft:'auto' }}>thinking…</span>}
        </div>
        {/* Tabs */}
        <div style={{ display:'flex', gap:2 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex:1, padding:'5px 8px', fontSize:11, fontWeight: tab === t.id ? 600 : 400,
              background: tab === t.id ? 'var(--blue)' : 'var(--bg3)',
              color: tab === t.id ? '#000' : 'var(--text2)',
              border:'1px solid var(--border2)', borderRadius:'var(--radius-sm)',
              display:'flex', alignItems:'center', justifyContent:'center', gap:5
            }}>
              {t.label}
              {t.badge > 0 && (
                <span style={{ background: tab===t.id ? 'rgba(0,0,0,0.2)' : 'var(--blue)', color: tab===t.id ? '#000' : '#000', fontSize:9, fontWeight:700, borderRadius:20, padding:'1px 5px', minWidth:16, textAlign:'center' }}>{t.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', minHeight:0 }}>

        {/* TOPICS TAB */}
        {tab === 'topics' && (
          <div style={{ flex:1, overflowY:'auto', padding:12 }}>
            {currentTopic && (
              <div style={{ marginBottom:10, padding:'8px 12px', background:'var(--blue-bg)', border:'1px solid rgba(96,165,250,0.2)', borderRadius:'var(--radius-sm)', fontSize:11 }}>
                <span style={{ color:'var(--text3)' }}>Current topic: </span>
                <span style={{ color:'var(--blue)', fontWeight:600 }}>{currentTopic.name}</span>
              </div>
            )}
            <TopicDropdown topics={topics} />
          </div>
        )}

        {/* CHAT TAB */}
        {tab === 'chat' && (
          <>
            <div style={{ flex:1, overflowY:'auto', padding:12, display:'flex', flexDirection:'column', gap:10 }}>
              {chatMessages.length === 0 && (
                <div style={{ textAlign:'center', color:'var(--text3)', fontSize:12, marginTop:20 }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>🎓</div>
                  Ask me anything about the lecture.<br/>I'll also check in if you seem confused.
                </div>
              )}
              {chatMessages.map(msg => (
                <div key={msg.id} style={{
                  display:'flex', flexDirection:'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  {msg.type === 'confusion_prompt' && (
                    <div style={{ fontSize:10, color:'var(--amber)', marginBottom:4, display:'flex', alignItems:'center', gap:4 }}>
                      <span>⚠</span> Confusion detected
                    </div>
                  )}
                  {msg.type === 'student_data_alert' && (
                    <div style={{ fontSize:10, color:'var(--red)', marginBottom:4, display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                      <span>📊</span>
                      <span>Student data insight</span>
                      {msg.allMatches?.map((m, i) => (
                        <span key={i} style={{ background:'rgba(248,113,113,0.15)', padding:'1px 7px', borderRadius:20, fontWeight:600 }}>
                          {m.topic} · {m.errorRate}% errors
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{
                    maxWidth:'88%', padding:'9px 12px', borderRadius: msg.role==='user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role==='user' ? 'var(--blue)'
                      : msg.type==='confusion_prompt' ? 'rgba(251,191,36,0.08)'
                      : msg.type==='student_data_alert' ? 'rgba(248,113,113,0.08)'
                      : 'var(--bg3)',
                    color: msg.role==='user' ? '#000' : 'var(--text)',
                    border: msg.type==='confusion_prompt' ? '1px solid rgba(251,191,36,0.2)'
                      : msg.type==='student_data_alert' ? '1px solid rgba(248,113,113,0.25)'
                      : '1px solid var(--border)',
                    fontSize:12, lineHeight:1.6, whiteSpace:'pre-wrap'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {thinking && tab === 'chat' && (
                <div style={{ display:'flex', gap:4, padding:'10px 12px' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--text3)', animation:`bounce 1.2s ${i*0.2}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding:10, borderTop:'1px solid var(--border)', flexShrink:0 }}>
              <div style={{ display:'flex', gap:6 }}>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about the lecture… (Enter to send)"
                  rows={2}
                  style={{ flex:1, fontSize:12 }}
                />
                <button className="primary" onClick={send} disabled={!input.trim() || thinking} style={{ alignSelf:'flex-end', padding:'8px 14px' }}>Send</button>
              </div>
            </div>
          </>
        )}

        {/* SUMMARY TAB */}
        {tab === 'summary' && (
          <div style={{ flex:1, overflowY:'auto', padding:12 }}>
            {!summaryDoc ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, marginTop:30 }}>
                <div style={{ textAlign:'center', color:'var(--text3)', fontSize:12, lineHeight:1.8 }}>
                  <div style={{ fontSize:28, marginBottom:8 }}>📋</div>
                  Your lecture summary will be generated<br/>when you end the session.
                  {topics.length > 0 && <div style={{ marginTop:6, color:'var(--blue)' }}>{topics.length} topic{topics.length!==1?'s':''} covered so far</div>}
                  {confusionCount > 0 && <div style={{ marginTop:4, color:'var(--amber)' }}>{confusionCount} confusion event{confusionCount!==1?'s':''} logged</div>}
                </div>
                {topics.length > 0 && (
                  <button className="primary" onClick={onGenerateSummary} disabled={thinking}>
                    {thinking ? 'Generating…' : 'Generate Summary Now'}
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <span style={{ fontSize:12, fontWeight:600 }}>Lecture Summary</span>
                  <button onClick={() => {
                    const a = document.createElement('a')
                    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(summaryDoc)
                    a.download = `lecture-summary-${new Date().toLocaleDateString().replace(/\//g,'-')}.txt`
                    a.click()
                  }}>⬇ Download</button>
                </div>
                <div style={{ fontSize:12, lineHeight:1.8, color:'var(--text)', whiteSpace:'pre-wrap', background:'var(--bg3)', padding:14, borderRadius:'var(--radius-sm)', border:'1px solid var(--border)' }}>
                  {summaryDoc}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
      `}</style>
    </div>
  )
}
