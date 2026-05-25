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
      background: '#0F172A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      <h1 style={{
        fontFamily: "var(--font-heading)",
        fontSize: '48px',
        fontWeight: 700,
        color: 'var(--primary-blue)',
        animation: 'logoPulse 2s ease infinite',
        letterSpacing: '2px',
      }}>
        DrHair
      </h1>
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: '12px',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '5px',
        textTransform: 'uppercase',
        fontWeight: 400,
      }}>
        Track. Transform. Thrive.
      </p>
    </div>
  )
}
