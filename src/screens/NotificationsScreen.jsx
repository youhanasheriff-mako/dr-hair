import React from 'react'
import { mockNotifications } from '../data/mockData'
import { IconBell, IconCheck, IconAlert } from '../components/Icons'

export default function NotificationsScreen() {
  const borderColors = {
    amber: 'var(--accent-pink)',
    green: 'var(--success)',
    blue: 'var(--brand-blue-bright)',
    teal: 'var(--brand-blue-teal)',
  }

  const bgColors = {
    amber: 'var(--accent-pink-soft)',
    green: 'rgba(42,157,143,0.10)',
    blue: 'var(--off-white-blue)',
    teal: 'var(--off-white-blue)',
  }

  const iconComponents = {
    amber: IconAlert,
    green: IconCheck,
    blue: IconBell,
    teal: IconCheck,
  }

  return (
    <div className="screen-content screen-enter" style={{ padding: '0 0 20px', background: 'var(--off-white)' }}>
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
          Updates
        </p>
        <h1 className="heading-display" style={{
          fontSize: '22px',
          color: 'var(--surface-white)',
        }}>Notifications</h1>
      </div>

      <div style={{ padding: '0 16px' }}>
        {mockNotifications.map((n) => {
          const Icon = iconComponents[n.type] || IconBell
          return (
            <div key={n.id} className="card" style={{
              marginBottom: '10px',
              padding: '14px 16px',
              borderLeft: `4px solid ${borderColors[n.type] || 'var(--brand-blue)'}`,
              display: 'flex',
              gap: '12px',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: bgColors[n.type] || 'var(--off-white-blue)',
                color: borderColors[n.type],
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: 'var(--brand-navy)' }}>{n.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--ui-gray-dark)', lineHeight: '1.5', marginBottom: '6px' }}>{n.body}</p>
                <span style={{ fontSize: '10px', color: 'var(--ui-gray-soft)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>{n.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
