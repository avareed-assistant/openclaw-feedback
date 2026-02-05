'use client'
import { useState } from 'react'

// === PAIN POINTS DATA ===
const painThemes = [
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
      { user: 'costas_design', text: "A better interface/desktop app. Better naming of sections/actions.", likes: 0 },
    ],
  },
  {
    id: 'trust',
    name: '👁️ Trust & Visibility',
    severity: 'high',
    mentions: 8,
    description: 'Users want to see what the agent did, audit logs, undo capability',
    quotes: [
      { user: 'willpowerbuilds', text: "Biggest friction for me is trust and visibility. I want to know what the agent did, why it did it, and how to undo it.", likes: 0 },
      { user: 'eliaseffects', text: "big friction is skill trust. best fix: signed skills + scoped permissions + visible audit log.", likes: 1 },
      { user: 'BigAir_Lab', text: "I never fully know what it is touching. Hidden file edits cost me real cleanup time.", likes: 0 },
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
    ],
  },
  {
    id: 'browser',
    name: '🌐 Browser Relay',
    severity: 'medium',
    mentions: 4,
    description: 'Browser automation is flaky, gets dropped often',
    quotes: [
      { user: 'geoffmcfarlan', text: "Definitely the browser relay. It works okay when it works but gets dropped often.", likes: 0 },
      { user: 'itsryandrake', text: "Browser relay sucks", likes: 0 },
    ],
  },
  {
    id: 'memory',
    name: '🧠 Memory & Context',
    severity: 'medium',
    mentions: 5,
    description: 'Memory is misleading, context overflow, forgets things',
    quotes: [
      { user: 'JonnyD', text: "the memory feature is misleading -- especially after reinstalls.", likes: 1 },
      { user: 'pben4ai', text: "BIG PROBLEM: Context Overflow.", likes: 0 },
      { user: 'jaysen_158', text: "would love if it could remember context from earlier in the conversation", likes: 2 },
    ],
  },
  {
    id: 'cost',
    name: '💸 Cost',
    severity: 'medium',
    mentions: 4,
    description: 'Can get very expensive with premium models',
    quotes: [
      { user: 'CharlieDePew', text: "I was spending $200 a day using opus on claw.", likes: 2 },
      { user: 'yayasview', text: "Everything works better once you hook it up to better models, but that also gets pricey fast", likes: 5 },
    ],
  },
]

// === USE CASES DATA ===
const useCaseCategories = [
  {
    id: 'business-ops',
    name: '🏢 Business Operations',
    icon: '🏢',
    useCases: [
      { text: 'Running $10M AUM investment company — agent acts as junior analyst with own Gmail', user: 'egenaess', likes: 97 },
      { text: 'Auto parts distribution: daily briefs, sales data, weather, building full ERP', user: 'BrianRoyBarber', likes: 4 },
      { text: '70% of work automated: accounting, employee salaries, daily reports', user: '_mrbaywatch', likes: 12 },
      { text: 'Runs entire agency: morning briefs, content scheduling, server monitoring', user: 'eliaseffects', likes: 6 },
      { text: 'VC fund CRM: manages startup pitches, portfolio companies, LP relations via Slack', user: 'bonam', likes: 1 },
      { text: 'Butcher shop: content calendar, uploads to Airtable planner, post-analysis', user: 'ClintJolly', likes: 0 },
      { text: 'Coffee shop: growth analysis, supplier orders, Sam\'s Club pickup cart prep', user: 'PedroAnibarro', likes: 0 },
    ],
  },
  {
    id: 'content-marketing',
    name: '📣 Content & Marketing',
    icon: '📣',
    useCases: [
      { text: 'X engagement: monitoring mentions, replying to relevant conversations', user: 'BradAI', likes: 8 },
      { text: 'Marketing employee: analyzes Google Analytics daily, creates traffic plan, executes', user: 'westoque', likes: 0 },
      { text: 'Content ideation: competitor content → 10 angles in 15 mins (was 2 hours)', user: 'eliadeleo', likes: 1 },
      { text: 'Searches social media for potential users, manages cold outreach list', user: 'pors', likes: 0 },
      { text: 'Personalized newsletter via AgentMail, daily video ideas, viral tweet research', user: 'tinkerersanky', likes: 3 },
      { text: 'GenAI ads: script to video download, just edit the files', user: 'psekyaya', likes: 0 },
      { text: 'Built a mini marketing team for personal brand', user: 'KeithKakadia', likes: 0 },
      { text: 'Automated postings for marketing', user: 'songjiun980001', likes: 1 },
    ],
  },
  {
    id: 'email-comms',
    name: '📧 Email & Inbox',
    icon: '📧',
    useCases: [
      { text: 'Email + WhatsApp cleanup twice daily, setting up draft responses', user: 'BobWassermann', likes: 5 },
      { text: 'Email triage: reads inbox, flags urgent, drafts responses', user: 'BradAI', likes: 8 },
      { text: 'iCloud inbox zero: filed or deleted 2,600 emails to 0', user: 'UK_PROPDEV', likes: 0 },
      { text: 'Handling @agentmail is a banger!', user: 'PeterRosdahl', likes: 3 },
      { text: 'Emails for RFQ requests and providing estimates to customers', user: 'CybrLou', likes: 0 },
    ],
  },
  {
    id: 'dev-coding',
    name: '💻 Development',
    icon: '💻',
    useCases: [
      { text: 'Assigns Linear tickets → subagent creates work tree → clean PR', user: 'mc_elreath', likes: 0 },
      { text: 'Army of Playwright agents that improve themselves autonomously', user: 'De_0O7', likes: 3 },
      { text: 'Creates PRs finding bugs, enhancements, QOL features', user: 'AshExplained', likes: 0 },
      { text: 'Simple code fixes overnight', user: 'fittdrday', likes: 0 },
      { text: 'Code review and debugging on large codebases', user: 'Hassankhaliif9', likes: 0 },
      { text: 'Mock interview platform: automated code review, personalized feedback', user: 'praveenyen', likes: 2 },
      { text: 'Mermaid + PlantUML diagrams in 2 minutes vs 3 hours of Visio', user: 'TechFocusedGeek', likes: 0 },
    ],
  },
  {
    id: 'sales-leads',
    name: '🎯 Sales & Leads',
    icon: '🎯',
    useCases: [
      { text: 'Autonomous leadgen via Google Maps + X API, personalized outreach', user: 'Clawburt', likes: 0 },
      { text: 'Finding leads on Reddit, adding to Notion', user: 'tinkerersanky', likes: 3 },
      { text: 'Lead gen for ICP — no more n8n', user: 'brandontan', likes: 0 },
      { text: 'Highly targeted lead gen', user: 'radwanrahmann', likes: 0 },
      { text: 'Daily client outreach automation', user: 'vatsalcodesit', likes: 0 },
      { text: 'Marketing: Apollo campaigns in Obsidian, human-in-loop', user: 'VenkatBalakumar', likes: 0 },
    ],
  },
  {
    id: 'productivity',
    name: '📋 Productivity',
    icon: '📋',
    useCases: [
      { text: 'Daily planning, task decomposition, keeping projects logical without re-explaining', user: 'AdmiralMMI', likes: 5 },
      { text: 'Accountability partner: follows up on goals multiple times per day', user: 'ShipnDev', likes: 0 },
      { text: 'Like an OS: plan the day, prioritize tasks, do tasks, brainstorm', user: 'Daniil_239', likes: 0 },
      { text: 'Meeting notes → Asana to-do → tag delegations', user: 'spark3hl', likes: 0 },
      { text: 'Remind of important deliverables', user: 'AshExplained', likes: 0 },
      { text: 'Chief of staff: morning briefs, newsletter digest, 15 yrs of notes searchable', user: 'BrianRWagner', likes: 0 },
    ],
  },
  {
    id: 'finance',
    name: '💰 Finance & Trading',
    icon: '💰',
    useCases: [
      { text: 'Connected to futures trading', user: 'gripe1918', likes: 1 },
      { text: 'Weekly covered call recommendations, daily Theta decay updates', user: 'darrylsj', likes: 0 },
      { text: 'Monthly accounting with auto-fetched receipts, km tracking for taxes', user: 'BobWassermann', likes: 5 },
      { text: 'Investment fund surveillance, rebalancing suggestions', user: 'LarsPeh', likes: 0 },
      { text: 'Trading bot control', user: 'childishludino', likes: 0 },
      { text: 'Traded up a wallet 22% in 2 days', user: 'vicky_dyor', likes: 1 },
    ],
  },
  {
    id: 'research',
    name: '🔬 Research',
    icon: '🔬',
    useCases: [
      { text: 'YouTube: searches, transcripts, daily digest from favorite channels', user: 'theRohitDas', likes: 56 },
      { text: 'Curates news from HN, GitHub, AI blogs → posts to website', user: 'AdilMouja', likes: 3 },
      { text: 'Market research and idea validation for building a business', user: 'J_dev363', likes: 1 },
      { text: 'Knowledge work: context files auto-update nightly, voice notes transcribed', user: 'LeoSellem', likes: 0 },
      { text: 'Competitor/market research, morning AI/agents space news', user: 'agenticskills', likes: 0 },
      { text: 'Trends on X, LinkedIn for viral topics', user: 'NandaKishoreHT', likes: 0 },
    ],
  },
  {
    id: 'multi-agent',
    name: '🤖 Multi-Agent',
    icon: '🤖',
    useCases: [
      { text: '5-agent team: daily tasks, project management, data, writer, coder', user: 'UncleJAI', likes: 0 },
      { text: '3 sub-agents: demand mapping, pipeline audit, research — runs while you sleep', user: 'ykgup', likes: 0 },
      { text: '10 servers, each with own instance, building agent swarm', user: 'xSoloTrades', likes: 0 },
      { text: 'Fleet of OpenClaws running agentic coating flywheel', user: 'telecasterrok', likes: 1 },
      { text: 'Manage a fleet of agents that run @doodlestein', user: 'telecasterrok', likes: 1 },
    ],
  },
  {
    id: 'ecommerce',
    name: '🛒 E-commerce',
    icon: '🛒',
    useCases: [
      { text: 'CRO: CPA from $26 to $11 on Meta, will add $1M+ in sales this year', user: 'josephepstein', likes: 15 },
      { text: 'Reviewing ad creative', user: 'DMOGeek', likes: 0 },
      { text: 'Building funnels', user: 'edbutlerx', likes: 0 },
    ],
  },
  {
    id: 'personal',
    name: '🏠 Personal',
    icon: '🏠',
    useCases: [
      { text: 'Raspberry Pi home automation + personal cloud storage', user: 'soikat', likes: 1 },
      { text: 'Notion + Obsidian integration, updates docs/calendar/tasks on command', user: 'YishaiBack', likes: 0 },
      { text: 'Programmed to call back telemarketers at night 😈', user: 'HambrechtJason', likes: 0 },
      { text: 'Custom chess opening repertoire builder', user: 'Zenchess', likes: 0 },
      { text: 'Running a litigation practice: "you have a motion due tomorrow, should I draft it?"', user: 'sxcpconan', likes: 1 },
    ],
  },
]

const severityColors = {
  critical: { bg: '#ff4d4d20', border: '#ff4d4d', text: '#ff6b6b' },
  high: { bg: '#ffa50020', border: '#ffa500', text: '#ffb347' },
  medium: { bg: '#ffd70020', border: '#ffd700', text: '#ffe066' },
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('usecases')
  const [selectedItem, setSelectedItem] = useState(null)
  const [sortBy, setSortBy] = useState('mentions')
  const [hoveredUseCase, setHoveredUseCase] = useState(null)

  const sortedPainThemes = [...painThemes].sort((a, b) => {
    if (sortBy === 'mentions') return b.mentions - a.mentions
    if (sortBy === 'severity') {
      const order = { critical: 0, high: 1, medium: 2 }
      return order[a.severity] - order[b.severity]
    }
    return 0
  })

  const totalPainMentions = painThemes.reduce((acc, t) => acc + t.mentions, 0)

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
          🦞 OpenClaw Feedback
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Community insights from{' '}
          <a href="https://x.com/rileybrown" target="_blank" style={{ color: '#1d9bf0' }}>@rileybrown</a>'s threads
        </p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[
          { id: 'usecases', label: '🚀 Use Cases', subtitle: 'What people build' },
          { id: 'pain', label: '😤 Pain Points', subtitle: 'What needs fixing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
            style={{
              padding: '14px 24px',
              borderRadius: '12px',
              border: activeTab === tab.id ? '2px solid #ff6b6b' : '2px solid #333',
              background: activeTab === tab.id ? '#ff6b6b20' : '#12121a',
              color: activeTab === tab.id ? '#ff6b6b' : '#888',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              textAlign: 'left',
            }}
          >
            {tab.label}
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, marginTop: '2px', opacity: 0.7 }}>
              {tab.subtitle}
            </span>
          </button>
        ))}
      </div>

      {/* Use Cases Tab */}
      {activeTab === 'usecases' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {useCaseCategories.map((category) => (
            <div key={category.id}>
              <h2 style={{ 
                fontSize: '1.4rem', 
                fontWeight: 700, 
                marginBottom: '16px',
                color: '#fff',
              }}>
                {category.name}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px',
              }}>
                {category.useCases.map((uc, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredUseCase(`${category.id}-${idx}`)}
                    onMouseLeave={() => setHoveredUseCase(null)}
                    style={{
                      background: '#12121a',
                      borderRadius: '12px',
                      padding: '16px',
                      border: '1px solid #2a2a3a',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      transform: hoveredUseCase === `${category.id}-${idx}` ? 'translateY(-2px)' : 'none',
                      boxShadow: hoveredUseCase === `${category.id}-${idx}` ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
                    }}
                  >
                    <p style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: 1.5, 
                      color: '#ddd',
                      marginBottom: '12px',
                    }}>
                      {uc.text}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      opacity: hoveredUseCase === `${category.id}-${idx}` ? 1 : 0.5,
                      transition: 'opacity 0.2s ease',
                    }}>
                      <a 
                        href={`https://x.com/${uc.user}`} 
                        target="_blank" 
                        style={{ color: '#1d9bf0', fontSize: '0.85rem', textDecoration: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        @{uc.user}
                      </a>
                      {uc.likes > 0 && (
                        <span style={{ color: '#666', fontSize: '0.85rem' }}>❤️ {uc.likes}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pain Points Tab */}
      {activeTab === 'pain' && (
        <>
          {/* Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}>
            {[
              { label: 'Total Mentions', value: totalPainMentions, color: '#fff' },
              { label: 'Critical', value: painThemes.filter(t => t.severity === 'critical').length, color: '#ff6b6b' },
              { label: 'High', value: painThemes.filter(t => t.severity === 'high').length, color: '#ffb347' },
              { label: 'Medium', value: painThemes.filter(t => t.severity === 'medium').length, color: '#ffe066' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#12121a', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ color: '#666', fontSize: '0.85rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Sort Controls */}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>Sort:</span>
            {['mentions', 'severity'].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: sortBy === s ? '1px solid #ff6b6b' : '1px solid #333',
                  background: sortBy === s ? '#ff6b6b20' : 'transparent',
                  color: sortBy === s ? '#ff6b6b' : '#666',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textTransform: 'capitalize',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Pain Points Table */}
          <div style={{ background: '#12121a', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a3a' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#666', fontWeight: 500, fontSize: '0.9rem' }}>Theme</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#666', fontWeight: 500, fontSize: '0.9rem', width: '80px' }}>Mentions</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#666', fontWeight: 500, fontSize: '0.9rem', width: '100px' }}>Severity</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#666', fontWeight: 500, fontSize: '0.9rem' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {sortedPainThemes.map((theme, idx) => {
                  const colors = severityColors[theme.severity]
                  const isSelected = selectedItem === theme.id
                  return (
                    <tr
                      key={theme.id}
                      onClick={() => setSelectedItem(isSelected ? null : theme.id)}
                      style={{
                        borderBottom: idx < sortedPainThemes.length - 1 ? '1px solid #1a1a2a' : 'none',
                        background: isSelected ? '#1a1a2a' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '0.95rem' }}>{theme.name}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{ background: '#ff6b6b30', color: '#ff6b6b', padding: '4px 10px', borderRadius: '16px', fontWeight: 600, fontSize: '0.85rem' }}>
                          {theme.mentions}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          padding: '4px 10px',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}>
                          {theme.severity}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#aaa', fontSize: '0.9rem' }}>{theme.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Pain Point Quotes */}
          {selectedItem && painThemes.find(t => t.id === selectedItem) && (
            <div style={{ marginTop: '20px', background: '#12121a', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ marginBottom: '16px', color: '#fff', fontSize: '1.1rem' }}>
                💬 {painThemes.find(t => t.id === selectedItem)?.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {painThemes.find(t => t.id === selectedItem)?.quotes.map((q, i) => (
                  <div key={i} style={{ background: '#1a1a2a', borderRadius: '10px', padding: '14px', borderLeft: '3px solid #ff6b6b' }}>
                    <p style={{ marginBottom: '8px', lineHeight: 1.5, fontSize: '0.95rem' }}>"{q.text}"</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.85rem' }}>
                      <a href={`https://x.com/${q.user}`} target="_blank" style={{ color: '#1d9bf0' }}>@{q.user}</a>
                      <span>❤️ {q.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
        <p>
          Analysis by{' '}
          <a href="https://x.com/avareed_1994" target="_blank" style={{ color: '#ff6b6b' }}>Ava Reed</a>
          {' '}• Feb 5, 2026
        </p>
      </footer>
    </main>
  )
}
