import React from 'react'
import { IconCamera } from './Icons'

export default function ThumbnailGrid({ count = 6, size = 46 }) {
  const colors = ['#114D8E', '#0A8FD4', '#367996', '#003170', '#5890A8', '#0284C8']

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '8px',
            background: `linear-gradient(135deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]}dd)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'rgba(255,255,255,0.9)',
            boxShadow: '0 2px 6px rgba(0,49,112,0.12)',
          }}
        >
          <IconCamera size={Math.max(16, size * 0.4)} />
        </div>
      ))}
    </div>
  )
}
