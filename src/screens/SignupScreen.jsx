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
      background: 'var(--bg-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px 24px 40px',
      overflowY: 'auto',
    }}>
      <div style={{ marginBottom: '36px', textAlign: 'center' }}>
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
        }}>Create Account</p>
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
          style={{ fontSize: '16px', padding: '16px' }}
        >
          Create Account
        </button>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '14px',
          color: 'var(--text-muted)',
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: 'var(--primary-gold)',
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
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}
