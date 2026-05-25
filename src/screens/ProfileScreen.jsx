import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '../data/mockData'
import { IconChevronRight } from '../components/Icons'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const [notifPrefs, setNotifPrefs] = useState({
    intervalReminders: true,
    upcomingDue: true,
    completionAlerts: true,
  })
  const [showDelete, setShowDelete] = useState(false)

  const togglePref = (key) => setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="screen-content screen-enter" style={{ padding: '0 0 40px' }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 20px',
        background: 'var(--surface-white)',
        borderBottom: '1px solid var(--border)',
        marginBottom: '16px',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px',
          fontWeight: 600,
        }}>My Profile</h1>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Profile Card */}
        <div className="card" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 16px',
          marginBottom: '14px',
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'var(--primary-gold)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '20px',
            fontFamily: "'Playfair Display', serif",
            flexShrink: 0,
          }}>
            {mockUser.initials}
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '2px' }}>{mockUser.name}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{mockUser.email}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Member since {mockUser.memberSince}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="card" style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '18px 12px',
          marginBottom: '14px',
        }}>
          {[
            { value: '3', label: 'Plans' },
            { value: '13', label: 'Uploads' },
            { value: '65%', label: 'Avg Progress' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 700, color: 'var(--primary-gold)' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="card" style={{ marginBottom: '14px', padding: 0, overflow: 'hidden' }}>
          {['Edit Profile', 'Change Password'].map((item, i) => (
            <button key={item} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '15px 16px',
              background: 'none', border: 'none',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              fontSize: '14px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
            }}>
              <span>{item}</span>
              <IconChevronRight size={18} color="var(--text-muted)" />
            </button>
          ))}
        </div>

        {/* Notification Preferences */}
        <div className="card" style={{ marginBottom: '14px', padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '14px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            borderBottom: '1px solid var(--border)',
          }}>
            Notification Preferences
          </div>
          {[
            { key: 'intervalReminders', label: 'Interval Reminders' },
            { key: 'upcomingDue', label: 'Upcoming Due' },
            { key: 'completionAlerts', label: 'Completion Alerts' },
          ].map((pref, i) => (
            <div key={pref.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: '14px' }}>{pref.label}</span>
              <div
                className={`toggle-switch ${notifPrefs[pref.key] ? 'active' : ''}`}
                onClick={() => togglePref(pref.key)}
              />
            </div>
          ))}
        </div>

        {/* More links */}
        <div className="card" style={{ marginBottom: '14px', padding: 0, overflow: 'hidden' }}>
          {['Privacy Policy', 'Terms of Service', 'Help & Support'].map((item, i) => (
            <button key={item} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '15px 16px',
              background: 'none', border: 'none',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              fontSize: '14px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
            }}>
              <span>{item}</span>
              <IconChevronRight size={18} color="var(--text-muted)" />
            </button>
          ))}
        </div>

        {/* Danger zone */}
        <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
          <button
            onClick={() => setShowDelete(true)}
            style={{
              background: 'none', border: 'none', fontSize: '14px',
              color: 'var(--danger)', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      {showDelete && (
        <div className="bottom-sheet-overlay" onClick={() => setShowDelete(false)}>
          <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '12px',
              textAlign: 'center',
            }}>Are you sure?</h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: '1.5',
            }}>
              This will permanently delete all your treatment data.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn btn-ghost"
                onClick={() => setShowDelete(false)}
                style={{ flex: 1 }}
              >Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowDelete(false)
                  navigate('/login')
                }}
                style={{ flex: 1 }}
              >Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
