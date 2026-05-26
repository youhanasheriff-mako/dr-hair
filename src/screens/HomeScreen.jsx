import React from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '../data/mockData'
import ThumbnailGrid from '../components/ThumbnailGrid'

export default function HomeScreen({ plans, onNewPlan }) {
  const navigate = useNavigate()

  return (
    <div className="screen-content screen-enter" style={{ padding: '0 0 20px' }}>
      {/* Header */}
      <div style={{
        padding: '56px 20px 28px',
        background: 'linear-gradient(160deg, #003170 0%, #114D8E 60%, #0A8FD4 110%)',
        borderRadius: '0 0 28px 28px',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative gradient blob */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206,233,246,0.18), transparent 70%)',
        }} />

        <div className="brand-logo" style={{ fontSize: '18px', marginBottom: '20px', position: 'relative' }}>
          <span className="dr" style={{ color: '#FFFFFF' }}>Dr</span>
          <span className="hair" style={{ color: '#0A8FD4' }}>Hair</span>
        </div>

        <h1 className="heading-display" style={{
          fontSize: '22px',
          color: 'var(--surface-white)',
          marginBottom: '6px',
          position: 'relative',
        }}>
          Good Morning, {mockUser.firstName}
        </h1>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          position: 'relative',
        }}>
          Track your hair restoration journey
        </p>

        {/* New Plan button */}
        <button
          onClick={onNewPlan}
          className="btn"
          style={{
            marginTop: '20px',
            background: 'rgba(255,255,255,0.14)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '11px',
            padding: '10px 22px',
            backdropFilter: 'blur(8px)',
            position: 'relative',
          }}
        >
          + New Plan
        </button>
      </div>

      {/* Plans */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 className="heading-display" style={{
            fontSize: '12px',
            color: 'var(--brand-navy)',
            letterSpacing: '2px',
          }}>
            My Treatment Plans
          </h2>
          <span style={{
            fontSize: '11px',
            color: 'var(--ui-gray-soft)',
            fontWeight: 500,
          }}>
            {plans.length} active
          </span>
        </div>

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
    <div className="card" style={{ marginBottom: '14px', padding: '18px' }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <h3 style={{
            fontFamily: "var(--font-heading)",
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--brand-navy)',
            marginBottom: '4px',
          }}>
            {plan.name}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--ui-gray-dark)' }}>
            Started {formatDate(plan.startDate)} · {plan.durationLabel}
          </p>
        </div>
        <span className={`badge ${isCompleted ? 'badge-teal' : 'badge-green'}`}>
          {isCompleted ? 'Completed' : 'Active'}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ui-gray-dark)', marginBottom: '6px' }}>
          <span>Every {plan.intervalDays} days</span>
          <span style={{ fontWeight: 700, color: 'var(--brand-blue)' }}>{plan.progress}%</span>
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
          marginBottom: '14px',
          padding: '10px 14px',
          background: plan.nextDue.urgent ? 'var(--accent-pink-soft)' : 'var(--off-white-blue)',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: 500,
        }}>
          {plan.nextDue.urgent && <span className="pulse-dot" />}
          <span style={{ color: plan.nextDue.urgent ? 'var(--accent-pink)' : 'var(--brand-blue-teal)' }}>
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
        style={{ marginTop: '14px', padding: '11px', fontSize: '11px' }}
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
