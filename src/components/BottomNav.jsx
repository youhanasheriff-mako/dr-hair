import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IconHome, IconPlus, IconBell, IconUser } from './Icons'

const tabs = [
  { path: '/home', label: 'Home', icon: IconHome },
  { path: null, label: 'New Plan', icon: IconPlus, isAction: true },
  { path: '/notifications', label: 'Notifications', icon: IconBell },
  { path: '/profile', label: 'Profile', icon: IconUser },
]

export default function BottomNav({ onNewPlan }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '8px 0 calc(8px + env(safe-area-inset-bottom, 0px))',
      background: 'var(--surface-white)',
      borderTop: '1px solid var(--border)',
      flexShrink: 0,
    }}>
      {tabs.map((tab) => {
        const isActive = tab.path && location.pathname === tab.path
        const Icon = tab.icon

        return (
          <button
            key={tab.label}
            onClick={() => {
              if (tab.isAction) {
                onNewPlan()
              } else {
                navigate(tab.path)
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 12px',
              minWidth: '60px',
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '24px',
              color: isActive || tab.isAction ? 'var(--primary-gold)' : 'var(--text-muted)',
              opacity: !isActive && !tab.isAction ? 0.6 : 1,
            }}>
              <Icon size={tab.isAction ? 26 : 22} />
            </div>
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? 'var(--primary-gold)' : 'var(--text-muted)',
              letterSpacing: '0.3px',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
