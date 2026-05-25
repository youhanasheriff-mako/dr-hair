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
    <div className="screen-content screen-enter" style={{ paddingBottom: '20px' }}>
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
          }}>
            <IconArrowLeft size={24} />
          </button>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px',
            fontWeight: 600,
          }}>{plan.name}</h1>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowMenu(!showMenu)} style={{
            background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px 8px',
          }}>
            <IconMore size={24} />
          </button>
          {showMenu && (
            <div style={{
              position: 'absolute', right: 0, top: '36px',
              background: 'var(--surface-white)', border: '1px solid var(--border)',
              borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              minWidth: '180px', zIndex: 20, overflow: 'hidden',
            }}>
              {['Edit Plan', 'Export Report', 'Delete Plan'].map((item, i) => (
                <button key={item} onClick={() => {
                  setShowMenu(false)
                  if (item === 'Export Report') navigate(`/export/${plan.id}`)
                }} style={{
                  display: 'block', width: '100%', padding: '13px 16px',
                  background: 'none', border: 'none', textAlign: 'left',
                  fontSize: '14px', cursor: 'pointer',
                  color: item === 'Delete Plan' ? 'var(--danger)' : 'var(--text-primary)',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                  fontFamily: 'var(--font-body)',
                }}>{item}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card" style={{ margin: '16px', padding: '24px', textAlign: 'center' }}>
        <svg width="100" height="100" style={{ transform: 'rotate(-90deg)', marginBottom: '12px' }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#F1F5F9" strokeWidth="8" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary-blue)" strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <text x="50" y="50" fill="var(--text-primary)" fontSize="18" fontWeight="700"
            textAnchor="middle" dominantBaseline="central"
            style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fontFamily: 'var(--font-body)' }}
          >
            {plan.progress}%
          </text>
        </svg>
        <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
          Day {plan.intervals.filter(i => i.status === 'uploaded').length * plan.intervalDays} of {plan.durationDays}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {plan.completedIntervals} of {plan.totalIntervals} intervals completed
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          {formatDate(plan.startDate)} → {formatDate(getEndDate(plan.startDate, plan.durationDays))}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '14px',
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
    uploaded: { bg: '#F0FAF0', border: '#27AE60', icon: IconCheck, label: 'Uploaded' },
    due: { bg: '#FFF8E1', border: '#F59E0B', icon: IconAlert, label: 'Due Today' },
    missed: { bg: '#FEECEC', border: '#C0392B', icon: IconAlert, label: 'Missed' },
    locked: { bg: '#F5F4F0', border: '#D1D0CB', icon: IconLock, label: 'Not yet due' },
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
          width: '10px', height: '10px', borderRadius: '50%',
          background: c.border, flexShrink: 0, marginTop: '6px',
        }} />
        {!isLast && <div style={{
          width: '2px', flex: 1, background: 'var(--border)', marginTop: '4px',
        }} />}
      </div>

      {/* Content */}
      <div style={{
        flex: 1, marginBottom: '12px', padding: '12px 14px',
        background: c.bg, borderLeft: `3px solid ${c.border}`,
        borderRadius: '0 10px 10px 0',
        opacity: interval.status === 'locked' ? 0.6 : 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: c.border }}>
            <StatusIcon size={16} />
            <span>Day {interval.day}</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{interval.date}</span>
        </div>

        {interval.status === 'uploaded' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '6px',
              background: `linear-gradient(135deg, #0EA5E9, #38BDF8)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
            }}>
              <IconCamera size={20} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tap to view</span>
          </div>
        )}

        {interval.status === 'due' && (
          <button
            className="btn btn-primary"
            onClick={onUpload}
            style={{ marginTop: '8px', padding: '8px 18px', fontSize: '13px' }}
          >
            Upload Now
          </button>
        )}

        {interval.status === 'missed' && (
          <button
            className="btn"
            onClick={onUpload}
            style={{
              marginTop: '8px', padding: '8px 18px', fontSize: '13px',
              background: 'var(--danger)', color: 'white',
            }}
          >
            Upload Late
          </button>
        )}

        {interval.status === 'locked' && (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Not yet due</p>
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
