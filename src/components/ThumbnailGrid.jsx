import React from 'react'
import { IconCamera } from './Icons'

export default function ThumbnailGrid({ count = 6, size = 46 }) {
  const colors = ['#0EA5E9', '#0369A1', '#7DD3FC', '#1E293B']

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
            borderRadius: '6px',
            background: `linear-gradient(135deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]}dd)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <IconCamera size={Math.max(16, size * 0.4)} />
        </div>
      ))}
    </div>
  )
}
