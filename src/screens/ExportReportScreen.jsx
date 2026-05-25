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
        }}>
          <IconArrowLeft size={24} />
        </button>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '18px',
          fontWeight: 600,
        }}>Export Report</h1>
      </div>

      <div style={{ padding: '20px 16px 100px' }}>
        {/* Report header */}
        <div style={{
          textAlign: 'center',
          paddingBottom: '20px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border)',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            {plan.name} — Progress Report
          </h2>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <p><strong>Patient:</strong> {mockUser.name}</p>
            <p><strong>Date Range:</strong> {formatDate(plan.startDate)} – {formatDate(getEndDate(plan.startDate, plan.durationDays))}</p>
            <p><strong>Doctor/Clinic:</strong> DrHair Medical Team</p>
          </div>
        </div>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}>
          {uploadedIntervals.map((interval, idx) => {
            const colors = ['#0EA5E9', '#0369A1', '#7DD3FC']
            const bg = colors[idx % 3]
            return (
              <div key={interval.id} style={{
                border: '1px solid var(--border)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: `linear-gradient(145deg, ${bg}, ${bg}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}>
                  <IconCamera size={40} />
                </div>
                <div style={{
                  padding: '8px 10px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  background: 'var(--surface-white)',
                  borderTop: '1px solid var(--border)',
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
        <button className="btn btn-primary btn-block" onClick={handleExport} style={{ fontSize: '15px' }}>
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
