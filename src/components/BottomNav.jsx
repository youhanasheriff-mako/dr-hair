import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IconHome, IconPlus, IconBell, IconUser } from './Icons'

const tabs = [
  { path: '/home', label: 'Home', icon: IconHome },
  { path: null, label: 'New Plan', icon: IconPlus, isAction: true },
  { path: '/notifications', label: 'Alerts', icon: IconBell },
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
      padding: '10px 0 calc(10px + env(safe-area-inset-bottom, 0px))',
      background: 'var(--surface-white)',
      borderTop: '1px solid var(--border)',
      flexShrink: 0,
      boxShadow: '0 -4px 16px rgba(0,49,112,0.06)',
    }}>
      {tabs.map((tab) => {
        const isActive = tab.path && location.pathname === tab.path
        const Icon = tab.icon
        const accent = tab.isAction

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
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 12px',
              minWidth: '60px',
              transition: 'all 0.2s',
            }}
          >
            {accent ? (
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-blue-bright))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 6px 16px rgba(17,77,142,0.35)',
                marginTop: '-12px',
                marginBottom: '-4px',
              }}>
                <Icon size={24} />
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '24px',
                color: isActive ? 'var(--brand-blue)' : 'var(--ui-gray-soft)',
              }}>
                <Icon size={22} />
              </div>
            )}
            <span style={{
              fontSize: '9px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--brand-blue)' : 'var(--ui-gray-soft)',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
