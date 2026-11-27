import { useState } from 'react'

function fmt(s) {
  if (s == null) return ''
  const m = Math.floor(s / 60), sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2,'0')}`
}

export function TopicDropdown({ topics, onTopicClick }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      {topics.length === 0 && (
        <div style={{ padding:'12px 0', fontSize:12, color:'var(--text3)', textAlign:'center' }}>
          Topics will appear here as the lecture progresses (every 2 min as video plays)
        </div>
      )}
      {topics.map((topic, i) => (
        <TopicItem key={topic.id} topic={topic} index={i} onTopicClick={onTopicClick} />
      ))}
    </div>
  )
}

function TopicItem({ topic, index, onTopicClick }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border:'1px solid var(--border2)', borderRadius:'var(--radius-sm)', overflow:'hidden', transition:'border-color .15s' }}>
      <button
        onClick={() => { setOpen(o => !o); onTopicClick?.(topic) }}
        style={{
          width:'100%', display:'flex', alignItems:'center', gap:10,
          padding:'9px 12px', background: open ? 'var(--bg4)' : 'var(--bg3)',
          border:'none', borderRadius:0, textAlign:'left', justifyContent:'flex-start'
        }}
      >
        <span style={{ fontSize:10, fontWeight:700, color:'var(--blue)', background:'var(--blue-bg)', padding:'2px 7px', borderRadius:20, flexShrink:0 }}>
          {`T${index+1}`}
        </span>
        <span style={{ flex:1, fontSize:12, fontWeight:500, color:'var(--text)' }}>{topic.name}</span>
        {topic.videoTime != null && (
          <span style={{ fontSize:10, color:'var(--text3)', flexShrink:0 }}>{fmt(topic.videoTime)}</span>
        )}
        <span style={{ color:'var(--text3)', fontSize:11, transform: open ? 'rotate(180deg)' : 'none', transition:'transform .2s', flexShrink:0 }}>▾</span>
      </button>
      {open && (
        <div style={{ padding:'10px 14px 12px', background:'var(--bg2)', borderTop:'1px solid var(--border)' }}>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
            {topic.bullets.map((b, j) => (
              <li key={j} style={{ display:'flex', gap:8, fontSize:12, color:'var(--text2)', lineHeight:1.5 }}>
                <span style={{ color:'var(--blue)', flexShrink:0, marginTop:1 }}>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
