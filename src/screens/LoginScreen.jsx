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
      background: 'var(--off-white)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '64px 24px 40px',
      overflowY: 'auto',
    }}>
      <div style={{
        marginBottom: '12px',
        textAlign: 'center',
      }}>
        <div className="brand-logo" style={{ fontSize: '44px', marginBottom: '6px' }}>
          <span className="dr">Dr</span>
          <span className="hair">Hair</span>
        </div>
        <p style={{
          fontSize: '9px',
          color: 'var(--ui-gray-soft)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>Medical Specialists in Hair</p>
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        marginTop: '24px',
      }}>
        <h2 className="heading-display" style={{
          fontSize: '20px',
          color: 'var(--brand-navy)',
          marginBottom: '8px',
        }}>
          Welcome Back
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--ui-gray-dark)', lineHeight: '1.5' }}>
          Continue your hair restoration journey
        </p>
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
          style={{ padding: '16px' }}
        >
          Login
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '13px',
          color: 'var(--ui-gray-dark)',
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{
            color: 'var(--brand-blue)',
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
  fontSize: '10px',
  fontWeight: 500,
  color: 'var(--ui-gray-dark)',
  marginBottom: '8px',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
}
