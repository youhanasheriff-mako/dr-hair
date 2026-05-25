import React, { useState, useRef } from 'react'
import { IconCamera, IconFolder, IconCheck } from './Icons'

export default function UploadFlow({ interval, planName, onClose, onSave }) {
  const [step, setStep] = useState('tutorial') // tutorial | camera | gallery | preview | saving | done
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
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '16px',
          }}>Position Guide</h3>

          {/* Demo image placeholder */}
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8D5B0, #D4A96A)',
            margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '3px dashed var(--primary-gold)',
            position: 'relative',
          }}>
            {/* Simple scalp silhouette using CSS */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <ellipse cx="40" cy="38" rx="30" ry="32" fill="#C9956A" opacity="0.6"/>
              <path d="M20 45 Q25 30 40 25 Q55 30 60 45" stroke="#8B6914" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <path d="M25 42 Q30 28 40 24 Q50 28 55 42" stroke="#8B6914" strokeWidth="1" fill="none" opacity="0.3"/>
              <circle cx="40" cy="20" r="3" fill="#C9A84C" opacity="0.4"/>
            </svg>
            <div style={{
              position: 'absolute', bottom: '-8px',
              background: 'var(--primary-gold)', color: 'white',
              fontSize: '10px', fontWeight: 600, padding: '3px 8px',
              borderRadius: '50px', letterSpacing: '0.5px',
            }}>CROWN VIEW</div>
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
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                padding: '8px 0',
                fontSize: '14px',
                color: 'var(--text-primary)',
                lineHeight: '1.4',
              }}>
                <span style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: '#F5F4F0', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700,
                  flexShrink: 0, color: 'var(--primary-gold)',
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
        position: 'fixed', inset: 0, background: '#111',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}>
        {/* Camera view simulation */}
        <div style={{
          width: '280px', height: '360px', borderRadius: '16px',
          background: 'linear-gradient(180deg, #2a2a2a, #1a1a1a)',
          border: '2px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '40px', position: 'relative',
        }}>
          {/* Crosshair guides */}
          <div style={{
            width: '160px', height: '160px', borderRadius: '50%',
            border: '1.5px dashed rgba(201,168,76,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              <IconCamera size={32} />
              <p style={{ fontSize: '12px' }}>Position crown here</p>
            </div>
          </div>
          {/* Top label */}
          <div style={{
            position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 500,
          }}>Day {interval.day}</div>
        </div>

        {/* Capture button */}
        <button
          onClick={() => {
            setImagePreview(null) // will use placeholder
            setStep('preview')
          }}
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'white', border: '4px solid rgba(255,255,255,0.3)',
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
            background: 'none', border: 'none', color: 'white',
            fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-body)',
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
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            fontWeight: 600,
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
              border: '2px dashed var(--border)',
              borderRadius: '12px',
              padding: '36px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '12px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>
              <IconFolder size={40} />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>Tap to browse files</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>JPG, PNG · Max 5MB</p>
          </div>

          {error && (
            <p style={{
              fontSize: '13px', color: 'var(--danger)',
              textAlign: 'center', marginBottom: '12px',
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
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '16px',
          }}>Confirm Photo</h3>

          <div style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px',
            background: imagePreview
              ? `url(${imagePreview}) center/cover`
              : 'linear-gradient(135deg, #D4A96A, #E8D5B0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {!imagePreview && (
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>
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
            >Use This Photo</button>
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
            width: '48px', height: '48px', borderRadius: '50%',
            border: '3px solid var(--border)',
            borderTopColor: 'var(--primary-gold)',
            margin: '0 auto 16px',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '15px', fontWeight: 500 }}>Saving to Day {interval.day}...</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{planName}</p>
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)',
            marginBottom: '12px',
            animation: 'checkPop 0.4s ease',
          }}>
            <IconCheck size={48} />
          </div>
          <p style={{
            fontSize: '17px', fontWeight: 600,
            color: 'var(--success)',
          }}>Progress saved!</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Day {interval.day} recorded successfully
          </p>
        </div>
      </div>
    )
  }

  return null
}
