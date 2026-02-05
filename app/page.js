'use client'
import { useState } from 'react'

const themes = [
  {
    id: 'setup',
    name: '🔧 Setup & Installation',
    severity: 'critical',
    mentions: 14,
    description: 'Complex, time-consuming setup process that takes hours to days',
    quotes: [
      { user: 'eli_austintx', text: "Less technical. It's so buggy at first and hard to fix small mistakes.", likes: 6 },
      { user: 'yayasview', text: "Took me almost 3 days to get it truly set up. Mostly just spending time debugging new models.", likes: 5 },
      { user: 'techfounder3', text: "The installation took me 9 days! Haha But I learned so much", likes: 1 },
      { user: 'udaysy', text: "setup was rough tho, spent a full afternoon on gateway config", likes: 0 },
      { user: 'majidmanzarpour', text: "The set up process is very technical and janky", likes: 1 },
      { user: 'AshExplained', text: "installation debugging was a pain, felt like I was assembling a whole car with spare parts", likes: 0 },
    ],
  },
  {
    id: 'config',
    name: '⚙️ Config & Model Switching',
    severity: 'critical',
    mentions: 11,
    description: 'Editing config files manually is tedious; adding models is painful',
    quotes: [
      { user: 'dashwizzle', text: "Adding new models/providers is irritating. I always end up editing the config directly.", likes: 12 },
      { user: 'udaysy', text: "biggest wish: better model switching UX. editing config files every time i wanna swap providers feels like 2019", likes: 0 },
      { user: 'bawsebuilds', text: "updating config and getting it right is a maze, having presets would help a LOT", likes: 0 },
      { user: 'aimodelscompass', text: "Changing models is a nightmare. I had to re-install it several times and start afresh.", likes: 0 },
      { user: 'veekhuu', text: "every other day, it forgot and lost the configuration somehow. I have to run doctor to fix it.", likes: 0 },
    ],
  },
  {
    id: 'ui',
    name: '🎨 UI/UX Issues',
    severity: 'high',
    mentions: 9,
    description: 'Interface is buggy, confusing, needs major overhaul',
    quotes: [
      { user: 'aimodelscompass', text: "The UI is terrible. needs a complete overhaul.", likes: 0 },
      { user: 'bawsebuilds', text: "the default openclaw UI is buggy and not the smoothest", likes: 0 },
      { user: 'AhmadShiddiqN', text: "The gateway need better UI, or maybe TUI", likes: 4 },
      { user: 'costas_design', text: "A better interface/desktop app. Better naming of sections/actions with explanations of what does what. Cleaner UI/UX overall.", likes: 0 },
      { user: 'contextsio', text: "The management UI could absolutely be improved. Everyone is building their own!", likes: 0 },
    ],
  },
  {
    id: 'trust',
    name: '👁️ Trust & Visibility',
    severity: 'high',
    mentions: 8,
    description: 'Users want to see what the agent did, audit logs, undo capability',
    quotes: [
      { user: 'willpowerbuilds', text: "Biggest friction for me is trust and visibility. I want to know what the agent did, why it did it, and how to undo it when it goes sideways.", likes: 0 },
      { user: 'eliaseffects', text: "big friction is skill trust. best fix: signed skills + scoped permissions + visible audit log.", likes: 1 },
      { user: 'BigAir_Lab', text: "I never fully know what it is touching. Hidden file edits and silent assumptions cost me real cleanup time. I want explicit scope, always.", likes: 0 },
      { user: 'stevengonsalvez', text: "Lack of observability or determinism - it can do a lot of stuff, but has a higher fail/ignore/loss probability", likes: 0 },
    ],
  },
  {
    id: 'stability',
    name: '💥 Stability & Reliability',
    severity: 'high',
    mentions: 8,
    description: 'Gateway crashes, fragile system, breaks unexpectedly',
    quotes: [
      { user: 'AiToolsP', text: "it feels powerful, but fragile. i'd test it on real workflows, smooth the rough edges", likes: 5 },
      { user: 'SevereSig', text: "I wish it was more reliable. The gateway crashes are frustrating.", likes: 2 },
      { user: 'BenENewton', text: "Too brittle. Models change unannounced. Needs better feedback when working.", likes: 2 },
      { user: 'worldcr48747071', text: "The integration between the different components is a shitshow. You never know if it's properly set up, and it will break.", likes: 0 },
      { user: 'AhmadShiddiqN', text: "Sometimes it ghosts my chat, turns out the service is down.", likes: 4 },
    ],
  },
  {
    id: 'browser',
    name: '🌐 Browser Relay',
    severity: 'medium',
    mentions: 4,
    description: 'Browser automation is flaky, gets dropped often',
    quotes: [
      { user: 'geoffmcfarlan', text: "Definitely the browser relay. It works okay when it works but gets dropped often. This has huge upside potential.", likes: 0 },
      { user: 'itsryandrake', text: "Browser relay sucks", likes: 0 },
      { user: 'case_beep_boop', text: "The hardest part isn't the reasoning, it's the 'last mile' of execution. Browsers are flaky, auth is a nightmare", likes: 2 },
    ],
  },
  {
    id: 'memory',
    name: '🧠 Memory & Context',
    severity: 'medium',
    mentions: 5,
    description: 'Memory is misleading, context overflow, forgets things',
    quotes: [
      { user: 'JonnyD', text: "the memory feature is misleading -- especially after reinstalls. A lot of paying attention to your setup because sometimes you can't assume it remembers", likes: 1 },
      { user: 'pben4ai', text: "BIG PROBLEM: Context Overflow. They say there was a QMD plugin to handle it.. in 2026.2.2 version, but I still faced it..", likes: 0 },
      { user: 'jaysen_158', text: "would love if it could remember context from earlier in the conversation without me having to repeat myself.", likes: 2 },
      { user: 'telecasterrok', text: "When we solve memory and it can remember as well, and as quickly, as it can reason...", likes: 0 },
    ],
  },
  {
    id: 'cost',
    name: '💸 Cost',
    severity: 'medium',
    mentions: 4,
    description: 'Can get very expensive with premium models',
    quotes: [
      { user: 'CharlieDePew', text: "I was spending $200 a day using opus on claw. Switched it to kimi on openrouter and then setup different models for different use cases and now I can finally breathe.", likes: 2 },
      { user: 'yayasview', text: "Everything works better once you hook it up to better models, but that also gets pricey fast", likes: 5 },
      { user: 'eran_dom_1948', text: "to do it 'right' and actually accomplish things, it can be quite expensive", likes: 1 },
    ],
  },
  {
    id: 'docs',
    name: '📚 Documentation',
    severity: 'medium',
    mentions: 3,
    description: 'Docs are scattered, hard to find answers',
    quotes: [
      { user: 'bawsebuilds', text: "documentation on letting it run with full permissions is a bit scattered", likes: 0 },
      { user: 'dashwizzle', text: "Better self config docs the llm could access would help", likes: 12 },
    ],
  },
  {
    id: 'security',
    name: '🔒 Security',
    severity: 'medium',
    mentions: 3,
    description: 'Prompt injection concerns, security setup unclear',
    quotes: [
      { user: 'AshExplained', text: "Security was a problem, prompt injection specifically", likes: 0 },
      { user: 'fabianstelzer', text: "Even the best LLMs still make extremely stupid mistakes and can be hacked with prompt injections", likes: 2 },
      { user: 'JoshExile82', text: "Prompt Injection attacks with just simple research online", likes: 0 },
    ],
  },
]

const severityColors = {
  critical: { bg: '#ff4d4d20', border: '#ff4d4d', text: '#ff6b6b' },
  high: { bg: '#ffa50020', border: '#ffa500', text: '#ffb347' },
  medium: { bg: '#ffd70020', border: '#ffd700', text: '#ffe066' },
}

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [sortBy, setSortBy] = useState('mentions')

  const sortedThemes = [...themes].sort((a, b) => {
    if (sortBy === 'mentions') return b.mentions - a.mentions
    if (sortBy === 'severity') {
      const order = { critical: 0, high: 1, medium: 2 }
      return order[a.severity] - order[b.severity]
    }
    return 0
  })

  const totalMentions = themes.reduce((acc, t) => acc + t.mentions, 0)

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
          🦞 OpenClaw Feedback Analysis
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Themes of dissatisfaction from{' '}
          <a href="https://x.com/rileybrown/status/2019274161034858732" target="_blank" style={{ color: '#1d9bf0' }}>
            @rileybrown's thread
          </a>
          {' '}• 56 replies analyzed
        </p>
      </header>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {[
          { label: 'Total Mentions', value: totalMentions, color: '#fff' },
          { label: 'Critical Issues', value: themes.filter(t => t.severity === 'critical').length, color: '#ff6b6b' },
          { label: 'High Priority', value: themes.filter(t => t.severity === 'high').length, color: '#ffb347' },
          { label: 'Medium Priority', value: themes.filter(t => t.severity === 'medium').length, color: '#ffe066' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: '#12121a',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sort Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ color: '#666' }}>Sort by:</span>
        {['mentions', 'severity'].map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: sortBy === s ? '2px solid #ff6b6b' : '1px solid #333',
              background: sortBy === s ? '#ff6b6b20' : 'transparent',
              color: sortBy === s ? '#ff6b6b' : '#888',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Themes Table */}
      <div style={{ background: '#12121a', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2a2a3a' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#666', fontWeight: 500 }}>Theme</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', color: '#666', fontWeight: 500, width: '100px' }}>Mentions</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', color: '#666', fontWeight: 500, width: '120px' }}>Severity</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', color: '#666', fontWeight: 500 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {sortedThemes.map((theme, idx) => {
              const colors = severityColors[theme.severity]
              const isSelected = selectedTheme === theme.id
              return (
                <tr
                  key={theme.id}
                  onClick={() => setSelectedTheme(isSelected ? null : theme.id)}
                  style={{
                    borderBottom: idx < sortedThemes.length - 1 ? '1px solid #1a1a2a' : 'none',
                    background: isSelected ? '#1a1a2a' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>{theme.name}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <span style={{
                      background: '#ff6b6b30',
                      color: '#ff6b6b',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: 600,
                    }}>
                      {theme.mentions}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <span style={{
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}>
                      {theme.severity}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#aaa' }}>{theme.description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Theme Quotes */}
      {selectedTheme && (
        <div style={{
          marginTop: '24px',
          background: '#12121a',
          borderRadius: '16px',
          padding: '24px',
          animation: 'fadeIn 0.3s ease',
        }}>
          <h3 style={{ marginBottom: '16px', color: '#fff' }}>
            💬 Quotes: {themes.find(t => t.id === selectedTheme)?.name}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {themes.find(t => t.id === selectedTheme)?.quotes.map((q, i) => (
              <div key={i} style={{
                background: '#1a1a2a',
                borderRadius: '12px',
                padding: '16px',
                borderLeft: '3px solid #ff6b6b',
              }}>
                <p style={{ marginBottom: '8px', lineHeight: 1.5 }}>"{q.text}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem' }}>
                  <a href={`https://x.com/${q.user}`} target="_blank" style={{ color: '#1d9bf0' }}>@{q.user}</a>
                  <span>❤️ {q.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#666' }}>
        <p>
          Analysis by{' '}
          <a href="https://x.com/avareed_1994" target="_blank" style={{ color: '#ff6b6b' }}>Ava Reed</a>
          {' '}• Data from Feb 5, 2026
        </p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        tr:hover {
          background: #1a1a2a !important;
        }
      `}</style>
    </main>
  )
}
