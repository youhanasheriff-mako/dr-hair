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
    <div className="screen-content screen-enter" style={{ padding: '0 0 40px', background: 'var(--off-white)' }}>
      {/* Header */}
      <div style={{
        padding: '56px 20px 24px',
        background: 'linear-gradient(160deg, #003170 0%, #114D8E 100%)',
        borderRadius: '0 0 28px 28px',
        marginBottom: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206,233,246,0.15), transparent 70%)',
        }} />
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>
          Account
        </p>
        <h1 className="heading-display" style={{
          fontSize: '22px',
          color: 'var(--surface-white)',
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
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-bright))',
            display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '20px',
            fontFamily: 'var(--font-heading)',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(17,77,142,0.25)',
          }}>
            {mockUser.initials}
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px', color: 'var(--brand-navy)' }}>{mockUser.name}</h2>
            <p style={{ fontSize: '12px', color: 'var(--ui-gray-dark)' }}>{mockUser.email}</p>
            <p style={{ fontSize: '10px', color: 'var(--ui-gray-soft)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>Member since {mockUser.memberSince}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="card" style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '20px 12px',
          marginBottom: '14px',
        }}>
          {[
            { value: '3', label: 'Plans' },
            { value: '13', label: 'Uploads' },
            { value: '65%', label: 'Avg Progress' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--brand-blue)', fontFamily: 'var(--font-heading)' }}>{s.value}</p>
              <p style={{ fontSize: '10px', color: 'var(--ui-gray-dark)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="card" style={{ marginBottom: '14px', padding: 0, overflow: 'hidden' }}>
          {['Edit Profile', 'Change Password'].map((item, i) => (
            <button key={item} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '16px 18px',
              background: 'none', border: 'none',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              fontSize: '13px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
              fontWeight: 500,
            }}>
              <span>{item}</span>
              <IconChevronRight size={16} color="var(--ui-gray-soft)" />
            </button>
          ))}
        </div>

        {/* Notification Preferences */}
        <div className="card" style={{ marginBottom: '14px', padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '14px 18px',
            fontSize: '10px',
            fontWeight: 500,
            color: 'var(--ui-gray-soft)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
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
              padding: '14px 18px',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>{pref.label}</span>
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
              width: '100%', padding: '16px 18px',
              background: 'none', border: 'none',
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              fontSize: '13px', cursor: 'pointer',
              fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
              fontWeight: 500,
            }}>
              <span>{item}</span>
              <IconChevronRight size={16} color="var(--ui-gray-soft)" />
            </button>
          ))}
        </div>

        {/* Danger zone */}
        <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
          <button
            onClick={() => setShowDelete(true)}
            style={{
              background: 'none', border: 'none', fontSize: '12px',
              color: 'var(--accent-pink)', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-body)', textTransform: 'uppercase',
              letterSpacing: '1.5px',
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
            <h3 className="heading-display" style={{
              fontSize: '18px',
              color: 'var(--brand-navy)',
              marginBottom: '12px',
              textAlign: 'center',
            }}>Are you sure?</h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--ui-gray-dark)',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: '1.6',
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
