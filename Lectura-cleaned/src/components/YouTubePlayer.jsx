import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react'

const VIDEO_ID = 'Qyd_v3DGzTM'

export const YouTubePlayer = forwardRef(function YouTubePlayer({ onTimeUpdate, markers }, ref) {
  const iframeContainerRef = useRef(null)
  const playerRef = useRef(null)
  const currentTimeRef = useRef(0)
  const intervalRef = useRef(null)
  const onTimeUpdateRef = useRef(onTimeUpdate) // always holds latest callback
  const [playerReady, setPlayerReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Keep ref in sync so the setInterval closure is never stale
  useEffect(() => { onTimeUpdateRef.current = onTimeUpdate }, [onTimeUpdate])

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => currentTimeRef.current,
    seekTo: (t) => playerRef.current?.seekTo?.(t, true),
  }), [])

  useEffect(() => {
    const initPlayer = () => {
      if (!iframeContainerRef.current) return
      playerRef.current = new window.YT.Player(iframeContainerRef.current, {
        videoId: VIDEO_ID,
        width: '100%',
        height: '100%',
        playerVars: { autoplay: 0, modestbranding: 1, rel: 0, fs: 1, origin: window.location.origin },
        events: {
          onReady: (e) => {
            setDuration(e.target.getDuration())
            setPlayerReady(true)
            intervalRef.current = setInterval(() => {
              if (!playerRef.current?.getCurrentTime) return
              const t = playerRef.current.getCurrentTime()
              currentTimeRef.current = t
              setCurrentTime(t)
              onTimeUpdateRef.current?.(t) // always calls latest version
            }, 1000)
          },
          onError: () => {}
        }
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'yt-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      clearInterval(intervalRef.current)
      playerRef.current?.destroy?.()
    }
  }, [])

  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg2)', borderRadius:'var(--radius)', overflow:'hidden', border:'1px solid var(--border)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:11, fontWeight:600, color:'var(--text2)', textTransform:'uppercase', letterSpacing:'.06em' }}>Lecture Video</span>
          <span style={{ fontSize:10, background:'var(--red-bg)', color:'var(--red)', border:'1px solid rgba(248,113,113,0.2)', padding:'2px 7px', borderRadius:20, fontWeight:600 }}>YouTube</span>
        </div>
        <span style={{ fontSize:11, color:'var(--text3)' }}>Math Antics · Solving Basic Equations Pt.1</span>
      </div>

      <div style={{ flex:1, position:'relative', background:'#000', minHeight:0 }}>
        <div ref={iframeContainerRef} style={{ width:'100%', height:'100%' }} />
        {!playerReady && (
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'#000', color:'var(--text3)', fontSize:12, gap:8 }}>
            <span style={{ animation:'pulse 1.5s infinite' }}>●</span> Loading YouTube player…
          </div>
        )}
      </div>

      <div style={{ padding:'10px 14px', borderTop:'1px solid var(--border)', flexShrink:0, background:'var(--bg2)' }}>
        <div
          style={{ position:'relative', height:6, background:'var(--border2)', borderRadius:3, marginBottom:8, cursor:'pointer' }}
          onClick={e => {
            if (!duration) return
            const r = e.currentTarget.getBoundingClientRect()
            playerRef.current?.seekTo?.(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * duration, true)
          }}
        >
          <div style={{ position:'absolute', top:0, left:0, height:'100%', width:`${progress}%`, background:'var(--red)', borderRadius:3, pointerEvents:'none' }} />
          {markers && markers.filter(m => m.videoTime != null && duration > 0).map((m, i) => (
            <div key={i}
              onClick={e => { e.stopPropagation(); playerRef.current?.seekTo?.(m.videoTime, true) }}
              title={`Confusion at ${fmt(m.videoTime)}`}
              style={{ position:'absolute', top:-5, left:`calc(${(m.videoTime/duration)*100}% - 5px)`, width:10, height:16, background:'var(--amber)', borderRadius:2, cursor:'pointer', zIndex:2, border:'1px solid rgba(251,191,36,0.6)' }}
            />
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:10, color:'var(--text3)' }}>
            {markers?.length > 0 ? `${markers.length} confusion marker${markers.length !== 1 ? 's' : ''} (amber)` : 'amber markers = confusion detected'}
          </span>
          <span style={{ fontSize:11, color:'var(--text2)', fontVariantNumeric:'tabular-nums' }}>{fmt(currentTime)} / {fmt(duration)}</span>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }`}</style>
    </div>
  )
})
