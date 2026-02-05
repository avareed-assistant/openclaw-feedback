import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          fontFamily: 'system-ui, sans-serif',
          padding: '40px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <span style={{ fontSize: 72 }}>🦞</span>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: '#fff',
            }}
          >
            OpenClaw Feedback
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#888',
            marginBottom: '48px',
          }}
        >
          56 replies analyzed • 10 themes of dissatisfaction
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
          }}
        >
          {[
            { label: '🔧 Setup', value: '14', color: '#ff6b6b' },
            { label: '⚙️ Config', value: '11', color: '#ff6b6b' },
            { label: '🎨 UI/UX', value: '9', color: '#ffb347' },
            { label: '👁️ Trust', value: '8', color: '#ffb347' },
            { label: '💥 Stability', value: '8', color: '#ffb347' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px 32px',
                border: `2px solid ${stat.color}40`,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 18, color: '#aaa', marginTop: '8px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: 20,
          }}
        >
          Analysis by @avareed_1994 • Feb 2026
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
