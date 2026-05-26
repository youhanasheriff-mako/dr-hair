import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function SignupScreen() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  return (
    <div className="screen-enter" style={{
      width: '100%',
      height: '100%',
      background: 'var(--off-white)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '56px 24px 40px',
      overflowY: 'auto',
    }}>
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <div className="brand-logo" style={{ fontSize: '40px', marginBottom: '6px' }}>
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
        marginBottom: '28px',
        marginTop: '16px',
      }}>
        <h2 className="heading-display" style={{
          fontSize: '18px',
          color: 'var(--brand-navy)',
          marginBottom: '6px',
        }}>
          Kickstart Your Growth
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--ui-gray-dark)' }}>
          Assessment takes 1 minute
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>
        <label style={labelStyle}>Full Name</label>
        <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Enter your full name" style={{ marginBottom: '14px' }} />

        <label style={labelStyle}>Email</label>
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="Enter your email" style={{ marginBottom: '14px' }} />

        <label style={labelStyle}>Password</label>
        <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Create a password" style={{ marginBottom: '14px' }} />

        <label style={labelStyle}>Confirm Password</label>
        <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)} placeholder="Confirm your password" style={{ marginBottom: '28px' }} />

        <button
          className="btn btn-primary btn-block"
          onClick={() => navigate('/home')}
          style={{ padding: '16px' }}
        >
          Get Started
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '13px',
          color: 'var(--ui-gray-dark)',
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: 'var(--brand-blue)',
            textDecoration: 'none',
            fontWeight: 600,
          }}>Login</Link>
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
