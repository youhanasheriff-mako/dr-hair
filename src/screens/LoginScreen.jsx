import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [email] = useState('james.thornton@email.com')
  const [password] = useState('••••••••')

  return (
    <div className="screen-enter" style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 24px 40px',
    }}>
      <div style={{
        marginBottom: '48px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: '40px',
          fontWeight: 700,
          color: 'var(--primary-blue)',
          marginBottom: '4px',
        }}>DrHair</h1>
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}>Progress</p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          readOnly
          style={{ marginBottom: '16px' }}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          readOnly
          style={{ marginBottom: '32px' }}
        />

        <button
          className="btn btn-primary btn-block"
          onClick={() => navigate('/home')}
          style={{ fontSize: '16px', padding: '16px' }}
        >
          Login
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '14px',
          color: 'var(--text-muted)',
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{
            color: 'var(--primary-gold)',
            textDecoration: 'none',
            fontWeight: 600,
          }}>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}
