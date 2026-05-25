import React, { useState } from 'react'

const durationOptions = [
  { label: '1 Month', days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '12 Months', days: 365 },
  { label: 'Custom', days: null },
]

export default function CreatePlanSheet({ onClose, onCreate }) {
  const [closing, setClosing] = useState(false)
  const [form, setForm] = useState({
    name: '',
    duration: '6 Months',
    durationDays: 180,
    customDays: '',
    intervalDays: '14',
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 250)
  }

  const handleCreate = () => {
    const days = form.duration === 'Custom' ? parseInt(form.customDays) || 90 : form.durationDays
    const intervalDays = parseInt(form.intervalDays) || 14

    const intervals = []
    let dayNum = 1
    let idx = 0
    const startDate = new Date(form.startDate)

    while (dayNum <= days) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + dayNum - 1)
      intervals.push({
        id: `int-new-${dayNum}`,
        day: dayNum,
        date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        isoDate: date.toISOString().split('T')[0],
        status: idx === 0 ? 'due' : 'locked',
      })
      dayNum += intervalDays
      idx++
    }

    const newPlan = {
      id: `plan-${Date.now()}`,
      name: form.name || 'New Treatment Plan',
      startDate: form.startDate,
      durationDays: days,
      durationLabel: form.duration === 'Custom' ? `${days} Days` : form.duration,
      intervalDays,
      progress: 0,
      status: 'active',
      totalIntervals: intervals.length,
      completedIntervals: 0,
      nextDue: { day: 1, label: 'Day 1 — Due Today', urgent: true },
      notes: form.notes,
      intervals,
    }

    onCreate(newPlan)
  }

  return (
    <div className="bottom-sheet-overlay" onClick={handleClose}>
      <div className={`bottom-sheet ${closing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
        {/* Handle bar */}
        <div style={{
          width: '40px', height: '4px', borderRadius: '2px',
          background: '#D1D0CB', margin: '0 auto 20px',
        }} />

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '20px',
          textAlign: 'center',
        }}>Create Treatment Plan</h2>

        {/* Form */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Treatment Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="e.g. Minoxidil Programme"
          />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Treatment Duration</label>
          <select
            value={form.duration}
            onChange={e => {
              const opt = durationOptions.find(o => o.label === e.target.value)
              update('duration', e.target.value)
              if (opt && opt.days) update('durationDays', opt.days)
            }}
          >
            {durationOptions.map(o => (
              <option key={o.label} value={o.label}>{o.label}</option>
            ))}
          </select>
        </div>

        {form.duration === 'Custom' && (
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Custom Duration (Days)</label>
            <input
              type="number"
              value={form.customDays}
              onChange={e => update('customDays', e.target.value)}
              placeholder="e.g. 120"
            />
          </div>
        )}

        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Progress Interval</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="number"
              value={form.intervalDays}
              onChange={e => update('intervalDays', e.target.value)}
              style={{ width: '100px', flex: 'none' }}
            />
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Days</span>
          </div>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={e => update('startDate', e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="Any additional notes..."
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-ghost" onClick={handleClose} style={{ flex: 1 }}>Cancel</button>
          <button className="btn btn-primary" onClick={handleCreate} style={{ flex: 1 }}>Create Plan</button>
        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}
