import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UploadFlow from '../components/UploadFlow'
import { IconArrowLeft, IconMore, IconCheck, IconLock, IconAlert, IconCamera } from '../components/Icons'

export default function PlanDetailScreen({ plans, onUpload }) {
  const { planId } = useParams()
  const navigate = useNavigate()
  const plan = plans.find(p => p.id === planId)
  const [showMenu, setShowMenu] = useState(false)
  const [uploadInterval, setUploadInterval] = useState(null)

  if (!plan) return <div style={{ padding: 40, textAlign: 'center' }}>Plan not found</div>

  const circumference = 2 * Math.PI * 44
  const offset = circumference - (plan.progress / 100) * circumference

  return (
    <div className="screen-content screen-enter" style={{ paddingBottom: '20px', background: 'var(--off-white)' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '52px 16px 16px',
        background: 'var(--surface-white)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/home')} style={{
            background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px',
            color: 'var(--brand-blue)',
          }}>
            <IconArrowLeft size={22} />
          </button>
          <h1 className="heading-display" style={{
            fontSize: '14px',
            color: 'var(--brand-navy)',
          }}>{plan.name}</h1>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowMenu(!showMenu)} style={{
            background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px 8px',
            color: 'var(--brand-blue)',
          }}>
            <IconMore size={22} />
          </button>
          {showMenu && (
            <div style={{
              position: 'absolute', right: 0, top: '36px',
              background: 'var(--surface-white)', border: '1px solid var(--border)',
              borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,49,112,0.15)',
              minWidth: '180px', zIndex: 20, overflow: 'hidden',
            }}>
              {['Edit Plan', 'Export Report', 'Delete Plan'].map((item, i) => (
                <button key={item} onClick={() => {
                  setShowMenu(false)
                  if (item === 'Export Report') navigate(`/export/${plan.id}`)
                }} style={{
                  display: 'block', width: '100%', padding: '13px 16px',
                  background: 'none', border: 'none', textAlign: 'left',
                  fontSize: '13px', cursor: 'pointer',
                  color: item === 'Delete Plan' ? 'var(--accent-pink)' : 'var(--text-primary)',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}>{item}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card" style={{
        margin: '16px',
        padding: '28px 20px',
        textAlign: 'center',
        background: 'linear-gradient(160deg, #FFFFFF 0%, #F6FCFE 100%)',
      }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)', marginBottom: '12px' }}>
          <circle cx="60" cy="60" r="52" fill="none" stroke="#CEE9F6" strokeWidth="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#progressGradient)" strokeWidth="8"
            strokeDasharray={2 * Math.PI * 52}
            strokeDashoffset={2 * Math.PI * 52 - (plan.progress / 100) * (2 * Math.PI * 52)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#114D8E" />
              <stop offset="100%" stopColor="#0A8FD4" />
            </linearGradient>
          </defs>
          <text x="60" y="60" fill="var(--brand-navy)" fontSize="22" fontWeight="700"
            textAnchor="middle" dominantBaseline="central"
            style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fontFamily: 'var(--font-body)' }}
          >
            {plan.progress}%
          </text>
        </svg>
        <p className="heading-display" style={{ fontSize: '14px', color: 'var(--brand-navy)', marginBottom: '6px' }}>
          Day {plan.intervals.filter(i => i.status === 'uploaded').length * plan.intervalDays} of {plan.durationDays}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--ui-gray-dark)' }}>
          {plan.completedIntervals} of {plan.totalIntervals} intervals completed
        </p>
        <p style={{ fontSize: '11px', color: 'var(--ui-gray-soft)', marginTop: '8px', letterSpacing: '0.5px' }}>
          {formatDate(plan.startDate)} → {formatDate(getEndDate(plan.startDate, plan.durationDays))}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 16px' }}>
        <h2 className="heading-display" style={{
          fontSize: '12px',
          color: 'var(--brand-navy)',
          marginBottom: '14px',
          letterSpacing: '2px',
        }}>Progress Timeline</h2>

        {plan.intervals.map((interval, idx) => (
          <TimelineItem
            key={interval.id}
            interval={interval}
            isLast={idx === plan.intervals.length - 1}
            onUpload={() => setUploadInterval(interval)}
          />
        ))}
      </div>

      {uploadInterval && (
        <UploadFlow
          interval={uploadInterval}
          planName={plan.name}
          onClose={() => setUploadInterval(null)}
          onSave={() => {
            onUpload(plan.id, uploadInterval.day)
            setUploadInterval(null)
          }}
        />
      )}
    </div>
  )
}

function TimelineItem({ interval, isLast, onUpload }) {
  const config = {
    uploaded: { bg: 'rgba(42,157,143,0.08)', border: 'var(--success)', icon: IconCheck, label: 'Uploaded' },
    due: { bg: 'var(--accent-pink-soft)', border: 'var(--accent-pink)', icon: IconAlert, label: 'Due Today' },
    missed: { bg: 'var(--accent-pink-soft)', border: 'var(--accent-pink)', icon: IconAlert, label: 'Missed' },
    locked: { bg: 'var(--off-white-blue)', border: 'var(--ui-gray-soft)', icon: IconLock, label: 'Not yet due' },
  }
  const c = config[interval.status] || config.locked
  const StatusIcon = c.icon

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {/* Timeline line */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px',
      }}>
        <div style={{
          width: '12px', height: '12px', borderRadius: '50%',
          background: c.border, flexShrink: 0, marginTop: '8px',
          boxShadow: interval.status === 'due' ? '0 0 0 4px rgba(223,59,133,0.18)' : 'none',
        }} />
        {!isLast && <div style={{
          width: '2px', flex: 1, background: 'var(--border)', marginTop: '4px',
        }} />}
      </div>

      {/* Content */}
      <div style={{
        flex: 1, marginBottom: '12px', padding: '14px 16px',
        background: c.bg, borderLeft: `3px solid ${c.border}`,
        borderRadius: '0 12px 12px 0',
        opacity: interval.status === 'locked' ? 0.65 : 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: c.border, textTransform: 'uppercase', letterSpacing: '1px' }}>
            <StatusIcon size={14} />
            <span>Day {interval.day}</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ui-gray-dark)' }}>{interval.date}</span>
        </div>

        {interval.status === 'uploaded' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #114D8E, #0A8FD4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
            }}>
              <IconCamera size={18} />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--ui-gray-dark)' }}>Tap to view</span>
          </div>
        )}

        {interval.status === 'due' && (
          <button
            className="btn btn-accent"
            onClick={onUpload}
            style={{ marginTop: '10px', padding: '8px 18px', fontSize: '10px' }}
          >
            Upload Now
          </button>
        )}

        {interval.status === 'missed' && (
          <button
            className="btn btn-accent"
            onClick={onUpload}
            style={{ marginTop: '10px', padding: '8px 18px', fontSize: '10px' }}
          >
            Upload Late
          </button>
        )}

        {interval.status === 'locked' && (
          <p style={{ fontSize: '11px', color: 'var(--ui-gray-dark)', marginTop: '2px' }}>Not yet due</p>
        )}
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getEndDate(startStr, days) {
  const d = new Date(startStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}
