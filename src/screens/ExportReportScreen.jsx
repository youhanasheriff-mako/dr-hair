import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockUser } from '../data/mockData'
import { IconArrowLeft, IconCamera } from '../components/Icons'

export default function ExportReportScreen({ plans }) {
  const { planId } = useParams()
  const navigate = useNavigate()
  const plan = plans.find(p => p.id === planId)
  const [toast, setToast] = useState(null)

  if (!plan) return <div style={{ padding: 40, textAlign: 'center' }}>Plan not found</div>

  const uploadedIntervals = plan.intervals.filter(i => i.status === 'uploaded')

  const handleExport = () => {
    setToast('Generating report...')
    setTimeout(() => {
      setToast('Report saved to gallery ✓')
      setTimeout(() => setToast(null), 2000)
    }, 1500)
  }

  return (
    <div className="screen-content screen-enter" style={{ background: 'var(--surface-white)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '52px 16px 16px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--surface-white)',
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px',
          color: 'var(--brand-blue)',
        }}>
          <IconArrowLeft size={22} />
        </button>
        <h1 className="heading-display" style={{
          fontSize: '14px',
          color: 'var(--brand-navy)',
        }}>Export Report</h1>
      </div>

      <div style={{ padding: '24px 16px 100px' }}>
        {/* Report header */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '24px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div className="brand-logo" style={{ fontSize: '24px', marginBottom: '12px', justifyContent: 'center', display: 'flex' }}>
            <span className="dr">Dr</span>
            <span className="hair">Hair</span>
          </div>
          <p style={{
            fontSize: '9px',
            color: 'var(--ui-gray-soft)',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '20px',
          }}>Medical Specialists in Hair</p>

          <h2 className="heading-display" style={{
            fontSize: '16px',
            color: 'var(--brand-navy)',
            marginBottom: '16px',
          }}>
            {plan.name} — Progress Report
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--ui-gray-dark)', lineHeight: '1.8' }}>
            <p><strong style={{ color: 'var(--brand-navy)' }}>Patient:</strong> {mockUser.name}</p>
            <p><strong style={{ color: 'var(--brand-navy)' }}>Date Range:</strong> {formatDate(plan.startDate)} – {formatDate(getEndDate(plan.startDate, plan.durationDays))}</p>
            <p><strong style={{ color: 'var(--brand-navy)' }}>Doctor/Clinic:</strong> DrHair Medical Team</p>
          </div>
        </div>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}>
          {uploadedIntervals.map((interval, idx) => {
            const colors = ['#114D8E', '#0A8FD4', '#0284C8', '#367996']
            const bg = colors[idx % colors.length]
            return (
              <div key={interval.id} style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,49,112,0.06)',
              }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: `linear-gradient(145deg, ${bg}, ${bg}cc)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}>
                  <IconCamera size={36} />
                </div>
                <div style={{
                  padding: '10px 12px',
                  fontSize: '11px',
                  color: 'var(--ui-gray-dark)',
                  fontWeight: 500,
                  background: 'var(--surface-white)',
                  borderTop: '1px solid var(--border)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Day {interval.day} — {interval.date}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Export button */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        padding: '16px',
        background: 'var(--surface-white)',
        borderTop: '1px solid var(--border)',
      }}>
        <button className="btn btn-primary btn-block" onClick={handleExport}>
          Export as PDF
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
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
