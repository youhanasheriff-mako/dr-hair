import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(160deg, #003170 0%, #114D8E 60%, #0A8FD4 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '18px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-20%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(206,233,246,0.18), transparent 70%)',
        filter: 'blur(20px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-15%',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(223,59,133,0.12), transparent 70%)',
        filter: 'blur(20px)',
      }} />

      <div style={{
        animation: 'logoPulse 2.4s ease infinite',
        display: 'flex',
        alignItems: 'baseline',
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: '54px',
        letterSpacing: '-1px',
        zIndex: 1,
      }}>
        <span style={{ color: '#FFFFFF' }}>Dr</span>
        <span style={{ color: '#0A8FD4', textShadow: '0 0 24px rgba(10,143,212,0.6)' }}>Hair</span>
      </div>

      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: '10px',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: '6px',
        textTransform: 'uppercase',
        fontWeight: 500,
        zIndex: 1,
      }}>
        Medical Specialists in Hair
      </p>

      <div style={{
        position: 'absolute',
        bottom: '48px',
        fontFamily: "var(--font-body)",
        fontSize: '10px',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        fontWeight: 500,
        zIndex: 1,
      }}>
        Track · Transform · Thrive
      </div>
    </div>
  )
}
