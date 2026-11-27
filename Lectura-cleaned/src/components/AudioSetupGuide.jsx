import { useState } from 'react'

const isMac = navigator.platform.toUpperCase().includes('MAC')
const isWin = navigator.platform.toUpperCase().includes('WIN')

export function AudioSetupGuide({ audioDevices, selectedDeviceId, onSelectDevice, onRefresh, onClose }) {
  const [os, setOs] = useState(isMac ? 'mac' : isWin ? 'win' : 'mac')

  const loopbackDevices = audioDevices.filter(d =>
    d.label.toLowerCase().includes('blackhole') ||
    d.label.toLowerCase().includes('stereo mix') ||
    d.label.toLowerCase().includes('loopback') ||
    d.label.toLowerCase().includes('virtual') ||
    d.label.toLowerCase().includes('cable') ||
    d.label.toLowerCase().includes('soundflower')
  )

  const otherDevices = audioDevices.filter(d => !loopbackDevices.includes(d))

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:200,
      display:'flex', alignItems:'center', justifyContent:'center'
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:'var(--radius)',
        width:520, maxHeight:'85vh', overflowY:'auto', padding:24
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h2 style={{ fontSize:15, fontWeight:700 }}>🎧 Audio Source Setup</h2>
          <button onClick={onClose} style={{ padding:'4px 10px', fontSize:11 }}>✕ Close</button>
        </div>

        {/* Current devices */}
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:11, fontWeight:600, color:'var(--text2)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>
            Available Audio Inputs
          </div>

          {loopbackDevices.length > 0 && (
            <div style={{ marginBottom:8, padding:'8px 10px', background:'var(--green-bg)', border:'1px solid rgba(74,222,128,0.2)', borderRadius:'var(--radius-sm)', fontSize:12, color:'var(--green)' }}>
              ✓ Loopback device detected! Select it below.
            </div>
          )}

          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {audioDevices.length === 0 && (
              <div style={{ fontSize:12, color:'var(--text3)', padding:'10px 0' }}>No devices found — click Refresh</div>
            )}
            {[...loopbackDevices, ...otherDevices].map(d => (
              <div
                key={d.deviceId}
                onClick={() => onSelectDevice(d.deviceId)}
                style={{
                  display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
                  borderRadius:'var(--radius-sm)', cursor:'pointer',
                  background: selectedDeviceId === d.deviceId ? 'var(--blue-bg)' : 'var(--bg3)',
                  border: `1px solid ${selectedDeviceId === d.deviceId ? 'rgba(96,165,250,0.3)' : 'var(--border)'}`,
                  transition:'all .15s'
                }}
              >
                <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0,
                  background: loopbackDevices.includes(d) ? 'var(--green)' : 'var(--text3)' }} />
                <span style={{ fontSize:12, flex:1, color: selectedDeviceId === d.deviceId ? 'var(--blue)' : 'var(--text)' }}>
                  {d.label || `Device ${d.deviceId.slice(0,8)}`}
                </span>
                {loopbackDevices.includes(d) && (
                  <span style={{ fontSize:10, color:'var(--green)', background:'var(--green-bg)', padding:'2px 7px', borderRadius:20 }}>loopback</span>
                )}
                {selectedDeviceId === d.deviceId && (
                  <span style={{ fontSize:10, color:'var(--blue)' }}>selected ✓</span>
                )}
              </div>
            ))}
          </div>
          <button onClick={onRefresh} style={{ marginTop:8, fontSize:11, width:'100%' }}>↻ Refresh device list</button>
        </div>

        <hr style={{ border:'none', borderTop:'1px solid var(--border)', marginBottom:20 }} />

        {/* OS tabs */}
        <div style={{ fontSize:11, fontWeight:600, color:'var(--text2)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>
          Setup Guide
        </div>
        <div style={{ display:'flex', gap:6, marginBottom:16 }}>
          {['mac','win','linux'].map(o => (
            <button key={o} onClick={() => setOs(o)} style={{
              padding:'5px 14px', fontSize:11,
              background: os === o ? 'var(--blue)' : 'var(--bg3)',
              color: os === o ? '#000' : 'var(--text2)',
              fontWeight: os === o ? 600 : 400
            }}>
              {o === 'mac' ? '🍎 macOS' : o === 'win' ? '🪟 Windows' : '🐧 Linux'}
            </button>
          ))}
        </div>

        {os === 'mac' && (
          <div style={{ fontSize:12, lineHeight:1.9, color:'var(--text2)' }}>
            <Step n={1} title="Install BlackHole (free)">
              Download from <Link href="https://existential.audio/blackhole/">existential.audio/blackhole</Link> — choose the 2ch version.
            </Step>
            <Step n={2} title="Create a Multi-Output Device">
              Open <b style={{color:'var(--text)'}}>Audio MIDI Setup</b> (search in Spotlight) → click <b style={{color:'var(--text)'}}>+</b> → <b style={{color:'var(--text)'}}>Create Multi-Output Device</b> → check both <b style={{color:'var(--text)'}}>BlackHole 2ch</b> and your speakers/headphones.
            </Step>
            <Step n={3} title="Set as system output">
              Click the speaker icon in the menu bar (or System Settings → Sound) → set output to the new <b style={{color:'var(--text)'}}>Multi-Output Device</b>. You'll still hear audio through your speakers.
            </Step>
            <Step n={4} title="Select BlackHole as input in Chrome">
              In Chrome, go to <b style={{color:'var(--text)'}}>chrome://settings/content/microphone</b> and set default to <b style={{color:'var(--text)'}}>BlackHole 2ch</b>.
            </Step>
            <Step n={5} title="Select it above">
              Refresh the device list above and select <b style={{color:'var(--text)'}}>BlackHole 2ch</b>.
            </Step>
            <div style={{ marginTop:12, padding:'10px 12px', background:'var(--amber-bg)', border:'1px solid rgba(251,191,36,0.2)', borderRadius:'var(--radius-sm)', fontSize:11, color:'var(--amber)' }}>
              ⚠ While using Multi-Output, volume control may be disabled. Use your speaker's physical volume knob or set volume before switching.
            </div>
          </div>
        )}

        {os === 'win' && (
          <div style={{ fontSize:12, lineHeight:1.9, color:'var(--text2)' }}>
            <Step n={1} title="Enable Stereo Mix">
              Right-click the speaker icon in the taskbar → <b style={{color:'var(--text)'}}>Sound settings</b> → <b style={{color:'var(--text)'}}>More sound settings</b> → <b style={{color:'var(--text)'}}>Recording</b> tab → right-click in the empty area → check <b style={{color:'var(--text)'}}>Show Disabled Devices</b> → right-click <b style={{color:'var(--text)'}}>Stereo Mix</b> → <b style={{color:'var(--text)'}}>Enable</b>.
            </Step>
            <Step n={2} title="If Stereo Mix is missing (common on newer PCs)">
              Install <Link href="https://vb-audio.com/Cable/">VB-Cable (free)</Link> instead. It creates a virtual audio cable — set your system output to <b style={{color:'var(--text)'}}>CABLE Input</b> and use <b style={{color:'var(--text)'}}>CABLE Output</b> as the mic.
            </Step>
            <Step n={3} title="Set Chrome microphone">
              In Chrome go to <b style={{color:'var(--text)'}}>chrome://settings/content/microphone</b> → set default to <b style={{color:'var(--text)'}}>Stereo Mix</b> or <b style={{color:'var(--text)'}}>CABLE Output</b>.
            </Step>
            <Step n={4} title="Select it above">
              Refresh the device list and select the loopback device.
            </Step>
            <div style={{ marginTop:12, padding:'10px 12px', background:'var(--blue-bg)', border:'1px solid rgba(96,165,250,0.2)', borderRadius:'var(--radius-sm)', fontSize:11, color:'var(--blue)' }}>
              💡 With VB-Cable, set your system audio output back to your speakers after testing — otherwise you won't hear anything.
            </div>
          </div>
        )}

        {os === 'linux' && (
          <div style={{ fontSize:12, lineHeight:1.9, color:'var(--text2)' }}>
            <Step n={1} title="Create a PulseAudio loopback">
              Run in terminal:
              <code style={{ display:'block', background:'var(--bg)', padding:'8px 12px', borderRadius:'var(--radius-sm)', marginTop:6, color:'var(--green)', fontSize:11 }}>
                pactl load-module module-loopback latency_msec=1
              </code>
            </Step>
            <Step n={2} title="Or use PipeWire (modern systems)">
              <code style={{ display:'block', background:'var(--bg)', padding:'8px 12px', borderRadius:'var(--radius-sm)', marginTop:6, color:'var(--green)', fontSize:11 }}>
                pw-loopback --capture-props='media.class=Audio/Sink'
              </code>
            </Step>
            <Step n={3} title="Select the monitor source in Chrome">
              In <b style={{color:'var(--text)'}}>chrome://settings/content/microphone</b>, select the <b style={{color:'var(--text)'}}>Monitor of [your output device]</b>.
            </Step>
          </div>
        )}

        <div style={{ marginTop:20, padding:'12px', background:'var(--bg3)', borderRadius:'var(--radius-sm)', fontSize:11, color:'var(--text3)', lineHeight:1.8 }}>
          <b style={{color:'var(--text2)'}}>Why Chrome specifically?</b><br/>
          The Web Speech API (used for transcription) is only fully supported in Chrome/Chromium. It also uses whatever mic Chrome is set to as default, which is why you set it in Chrome's settings rather than the OS.
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, children }) {
  return (
    <div style={{ display:'flex', gap:10, marginBottom:12 }}>
      <div style={{ width:20, height:20, borderRadius:'50%', background:'var(--blue)', color:'#000', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>{n}</div>
      <div>
        <div style={{ fontWeight:600, color:'var(--text)', marginBottom:2 }}>{title}</div>
        <div>{children}</div>
      </div>
    </div>
  )
}

function Link({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer" style={{ color:'var(--blue)', textDecoration:'underline' }}>{children}</a>
}
