import React from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUser, thumbnailColors } from '../data/mockData'
import ThumbnailGrid from '../components/ThumbnailGrid'

export default function HomeScreen({ plans, onNewPlan }) {
  const navigate = useNavigate()

  return (
    <div className="screen-content screen-enter" style={{ padding: '0 0 20px' }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 24px',
        background: 'var(--primary-dark)',
        borderRadius: '0 0 24px 24px',
        marginBottom: '20px',
      }}>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: '26px',
          fontWeight: 600,
          color: 'var(--surface-white)',
          marginBottom: '4px',
        }}>
          Good morning, {mockUser.firstName}
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.55)',
        }}>
          Track your hair restoration journey
        </p>

        {/* New Plan button */}
        <button
          onClick={onNewPlan}
          className="btn"
          style={{
            marginTop: '20px',
            background: 'rgba(14,165,233,0.15)',
            color: 'var(--primary-blue)',
            border: '1px solid rgba(14,165,233,0.3)',
            fontSize: '13px',
            padding: '10px 20px',
            borderRadius: '50px',
            fontWeight: 600,
          }}
        >
          + New Plan
        </button>
      </div>

      {/* Plans */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '14px',
          color: 'var(--text-primary)',
        }}>
          My Treatment Plans
        </h2>

        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} navigate={navigate} />
        ))}
      </div>
    </div>
  )
}

function PlanCard({ plan, navigate }) {
  const isCompleted = plan.status === 'completed'
  const thumbCount = isCompleted ? 12 : plan.status === 'active' && plan.progress > 50 ? 6 : 3

  return (
    <div className="card" style={{ marginBottom: '14px', padding: '16px' }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '17px',
            fontWeight: 600,
            marginBottom: '4px',
          }}>
            {plan.name}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Started {formatDate(plan.startDate)} · {plan.durationLabel}
          </p>
        </div>
        <span className={`badge ${isCompleted ? 'badge-teal' : 'badge-green'}`}>
          {isCompleted ? 'Completed' : 'Active'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>Every {plan.intervalDays} days</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{plan.progress}%</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${plan.progress}%` }} />
        </div>
      </div>

      {/* Next due */}
      {plan.nextDue && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          padding: '8px 12px',
          background: plan.nextDue.urgent ? '#FFF8E1' : '#F5F4F0',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
        }}>
          {plan.nextDue.urgent && <span className="pulse-dot" />}
          <span style={{ color: plan.nextDue.urgent ? '#D97706' : 'var(--text-muted)' }}>
            {plan.nextDue.label}
          </span>
        </div>
      )}

      {/* Thumbnails */}
      <ThumbnailGrid count={thumbCount} size={46} />

      {/* Action */}
      <button
        className="btn btn-outline btn-block"
        onClick={() => {
          if (isCompleted) {
            navigate(`/export/${plan.id}`)
          } else {
            navigate(`/plan/${plan.id}`)
          }
        }}
        style={{ marginTop: '14px', padding: '11px', fontSize: '14px' }}
      >
        {isCompleted ? 'View Report' : 'View Plan'}
      </button>
    </div>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
