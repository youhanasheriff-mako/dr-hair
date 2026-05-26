import React, { useState, useRef } from 'react'
import { IconCamera, IconFolder, IconCheck } from './Icons'

export default function UploadFlow({ interval, planName, onClose, onSave }) {
  const [step, setStep] = useState('tutorial')
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setError(null)

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      setError('Only JPG and PNG files are accepted.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setImagePreview(ev.target.result)
      setStep('preview')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    setStep('saving')
    setTimeout(() => {
      setStep('done')
      setTimeout(() => {
        onSave()
      }, 1200)
    }, 1500)
  }

  // Tutorial step
  if (step === 'tutorial') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '6px' }}>How to capture</p>
          <h3 className="heading-display" style={{
            fontSize: '18px',
            color: 'var(--brand-navy)',
            textAlign: 'center',
            marginBottom: '20px',
          }}>Position Guide</h3>

          {/* Demo image placeholder */}
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--off-white-blue), #B9D9EA)',
            margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px dashed var(--brand-blue)',
            position: 'relative',
          }}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <ellipse cx="40" cy="38" rx="30" ry="32" fill="#114D8E" opacity="0.45"/>
              <path d="M20 45 Q25 30 40 25 Q55 30 60 45" stroke="#003170" strokeWidth="1.5" fill="none" opacity="0.55"/>
              <path d="M25 42 Q30 28 40 24 Q50 28 55 42" stroke="#003170" strokeWidth="1" fill="none" opacity="0.35"/>
              <circle cx="40" cy="20" r="3" fill="#0A8FD4" opacity="0.55"/>
            </svg>
            <div style={{
              position: 'absolute', bottom: '-10px',
              background: 'var(--brand-blue)', color: 'white',
              fontSize: '9px', fontWeight: 600, padding: '4px 10px',
              borderRadius: '50px', letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>Crown View</div>
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 4px',
            marginBottom: '24px',
          }}>
            {[
              'Stand under good natural light',
              'Part hair at crown, camera directly above',
              'Keep consistent framing each session',
            ].map((text, i) => (
              <li key={i} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '10px 0',
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: '1.5',
              }}>
                <span style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: 'var(--off-white-blue)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700,
                  flexShrink: 0, color: 'var(--brand-blue)',
                }}>{i + 1}</span>
                {text}
              </li>
            ))}
          </ul>

          <button
            className="btn btn-primary btn-block"
            onClick={() => setStep('camera')}
            style={{ marginBottom: '10px' }}
          >
            Got it, Take Photo
          </button>
          <button
            className="btn btn-outline btn-block"
            onClick={() => {
              setStep('gallery')
              setTimeout(() => fileInputRef.current?.click(), 100)
            }}
          >
            Upload from Gallery
          </button>
        </div>
      </div>
    )
  }

  // Camera capture simulation
  if (step === 'camera') {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#001A3C',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}>
        {/* Camera view simulation */}
        <div style={{
          width: '280px', height: '360px', borderRadius: '20px',
          background: 'linear-gradient(180deg, #002658, #001A3C)',
          border: '2px solid rgba(206,233,246,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '40px', position: 'relative',
        }}>
          {/* Crosshair guides */}
          <div style={{
            width: '160px', height: '160px', borderRadius: '50%',
            border: '1.5px dashed rgba(10,143,212,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(206,233,246,0.6)', textAlign: 'center' }}>
              <IconCamera size={32} />
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Position crown here</p>
            </div>
          </div>
          {/* Top label */}
          <div style={{
            position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(206,233,246,0.7)', fontSize: '10px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>Day {interval.day}</div>
        </div>

        {/* Capture button */}
        <button
          onClick={() => {
            setImagePreview(null)
            setStep('preview')
          }}
          style={{
            width: '76px', height: '76px', borderRadius: '50%',
            background: 'white', border: '4px solid rgba(10,143,212,0.5)',
            cursor: 'pointer', transition: 'transform 0.15s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Cancel */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '50px', right: '20px',
            background: 'none', border: 'none', color: 'rgba(206,233,246,0.8)',
            fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-body)',
            textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500,
          }}
        >Cancel</button>
      </div>
    )
  }

  // Gallery upload
  if (step === 'gallery') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3 className="heading-display" style={{
            fontSize: '16px',
            color: 'var(--brand-navy)',
            textAlign: 'center',
            marginBottom: '16px',
          }}>Upload from Gallery</h3>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--brand-blue-bright)',
              borderRadius: '14px',
              padding: '40px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '12px',
              background: 'var(--off-white)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--brand-blue)'
              e.currentTarget.style.background = 'var(--off-white-blue)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--brand-blue-bright)'
              e.currentTarget.style.background = 'var(--off-white)'
            }}
          >
            <div style={{ marginBottom: '10px', color: 'var(--brand-blue)' }}>
              <IconFolder size={40} />
            </div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tap to browse files</p>
            <p style={{ fontSize: '11px', color: 'var(--ui-gray-dark)', marginTop: '6px' }}>JPG, PNG · Max 5MB</p>
          </div>

          {error && (
            <p style={{
              fontSize: '12px', color: 'var(--accent-pink)',
              textAlign: 'center', marginBottom: '12px', fontWeight: 500,
            }}>{error}</p>
          )}

          <button className="btn btn-ghost btn-block" onClick={onClose}>Cancel</button>
        </div>
      </div>
    )
  }

  // Preview / Confirm
  if (step === 'preview') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3 className="heading-display" style={{
            fontSize: '16px',
            color: 'var(--brand-navy)',
            textAlign: 'center',
            marginBottom: '16px',
          }}>Confirm Photo</h3>

          <div style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '16px',
            background: imagePreview
              ? `url(${imagePreview}) center/cover`
              : 'linear-gradient(135deg, #114D8E, #0A8FD4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {!imagePreview && (
              <div style={{ color: 'rgba(255,255,255,0.85)' }}>
                <IconCamera size={64} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-outline"
              onClick={() => setStep('camera')}
              style={{ flex: 1 }}
            >Retake</button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              style={{ flex: 1 }}
            >Use Photo</button>
          </div>
        </div>
      </div>
    )
  }

  // Saving state
  if (step === 'saving') {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ textAlign: 'center' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            border: '3px solid var(--off-white-blue)',
            borderTopColor: 'var(--brand-blue)',
            margin: '0 auto 18px',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand-navy)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Saving Day {interval.day}</p>
          <p style={{ fontSize: '12px', color: 'var(--ui-gray-dark)', marginTop: '6px' }}>{planName}</p>
        </div>
      </div>
    )
  }

  // Done state
  if (step === 'done') {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--success), #4FB0A3)',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            animation: 'checkPop 0.4s ease',
            boxShadow: '0 8px 24px rgba(42,157,143,0.35)',
          }}>
            <IconCheck size={32} />
          </div>
          <p className="heading-display" style={{
            fontSize: '16px',
            color: 'var(--brand-navy)',
          }}>Progress Saved</p>
          <p style={{ fontSize: '12px', color: 'var(--ui-gray-dark)', marginTop: '6px' }}>
            Day {interval.day} recorded successfully
          </p>
        </div>
      </div>
    )
  }

  return null
}
