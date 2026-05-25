import React from 'react'
import { mockNotifications } from '../data/mockData'
import { IconBell, IconCheck, IconAlert } from '../components/Icons'

export default function NotificationsScreen() {
  const borderColors = {
    amber: '#F59E0B',
    green: '#27AE60',
    blue: '#2196F3',
    teal: '#2D6A4F',
  }

  const iconComponents = {
    amber: IconAlert,
    green: IconCheck,
    blue: IconBell,
    teal: IconCheck,
  }

  return (
    <div className="screen-content screen-enter" style={{ padding: '0 0 20px' }}>
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
        }}>Notifications</h1>
      </div>

      <div style={{ padding: '0 16px' }}>
        {mockNotifications.map((n) => {
          const Icon = iconComponents[n.type] || IconBell
          return (
            <div key={n.id} className="card" style={{
              marginBottom: '10px',
              padding: '14px 16px',
              borderLeft: `4px solid ${borderColors[n.type] || '#ccc'}`,
              display: 'flex',
              gap: '12px',
            }}>
              <div style={{ color: borderColors[n.type], flexShrink: 0, marginTop: '2px' }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{n.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '6px' }}>{n.body}</p>
                <span style={{ fontSize: '11px', color: '#999' }}>{n.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
