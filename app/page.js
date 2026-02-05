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
    mentions: 18,
    description: 'Running companies, ERP systems, company-wide automation',
    quotes: [
      { user: 'egenaess', text: "Running it on a dedicated Mac 24/7 for my investment company (~$10M AUM). It has its own Gmail account and acts as a junior analyst.", likes: 97 },
      { user: 'BrianRoyBarber', text: "Running my entire auto parts distribution company through it. Daily morning briefs with sales data, weather for our warehouses, calendar. Building a full ERP with it.", likes: 4 },
      { user: '_mrbaywatch', text: "About 70% of my work is done by Clawdbot now. It does all my accounting, analyzes company data, creates employee salaries, daily reports.", likes: 12 },
      { user: 'eliaseffects', text: "it runs my entire agency. morning briefs, writes & schedules content based on my code commits, monitors server health.", likes: 6 },
    ],
  },
  {
    id: 'content-marketing',
    name: '📣 Content & Marketing',
    mentions: 22,
    description: 'Social media, content creation, newsletters, SEO',
    quotes: [
      { user: 'BradAI', text: "x engagement (monitoring mentions, replying to relevant convos), content research (searches web, summarizes articles)", likes: 8 },
      { user: 'westoque', text: "running a marketing employee. it takes google analytics data from yesterday, creates a plan to increase traffic and execute.", likes: 0 },
      { user: 'eliadeleo', text: "Every morning: feed it competitor content + our positioning → outputs 10 angles I'd never think of. Cuts content ideation from 2 hours to 15 mins.", likes: 1 },
      { user: 'pors', text: "It searches daily multiple social media platforms for potential users. It manages my cold outreach list and drafts the text.", likes: 0 },
    ],
  },
  {
    id: 'email-comms',
    name: '📧 Email & Communication',
    mentions: 15,
    description: 'Inbox management, drafting responses, email triage',
    quotes: [
      { user: 'BobWassermann', text: "Couple times a day email + WhatsApp cleanup and setting up draft responses.", likes: 5 },
      { user: 'BradAI', text: "email triage (reads inbox, flags urgent stuff, drafts responses)", likes: 8 },
      { user: 'UK_PROPDEV', text: "had it get my personal iCloud to inbox zero by filing or deleting everything. 2.6k emails to 0.", likes: 0 },
    ],
  },
  {
    id: 'dev-coding',
    name: '💻 Development & Coding',
    mentions: 16,
    description: 'Code review, debugging, PR creation, vibecoding',
    quotes: [
      { user: 'mc_elreath', text: "I assign tickets in Linear to it. It fires up a subagent to create a work tree and carries the ticket through to a clean PR.", likes: 0 },
      { user: 'De_0O7', text: "Creating an army of web automation playwright agents that improves themselves autonomously", likes: 3 },
      { user: 'AshExplained', text: "Creates PR on my github projects finding bugs or enhancements or new features as QOL", likes: 0 },
      { user: 'fittdrday', text: "Handling simple code fixes overnight", likes: 0 },
    ],
  },
  {
    id: 'sales-leads',
    name: '🎯 Sales & Lead Gen',
    mentions: 12,
    description: 'Outreach, CRM, lead generation, prospecting',
    quotes: [
      { user: 'Clawburt', text: "Autonomous leadgen via Google Maps + X API. Personalized outreach (X + email), GPT-wrapped.", likes: 0 },
      { user: 'tinkerersanky', text: "Finding leads on reddit and adding in Notion", likes: 3 },
      { user: 'brandontan', text: "Lead gen for my ICP ... no more n8n", likes: 0 },
      { user: 'radwanrahmann', text: "Highly targeted Lead Gen", likes: 0 },
    ],
  },
  {
    id: 'productivity',
    name: '📋 Productivity & Planning',
    mentions: 14,
    description: 'Daily briefs, task management, calendar, accountability',
    quotes: [
      { user: 'AdmiralMMI', text: "Daily planning, task decomposition, research briefings, keeping long-running projects logical without re-explaining context.", likes: 5 },
      { user: 'ShipnDev', text: "Out of the box, it's a phenomenal accountability partner. It will follow up with you multiple times per day.", likes: 0 },
      { user: 'Daniil_239', text: "basically it became like an OS for me, helping me plan the day, prioritize tasks, actually doing tasks for me sometimes.", likes: 0 },
    ],
  },
  {
    id: 'finance',
    name: '💰 Finance & Trading',
    mentions: 10,
    description: 'Trading, accounting, invoices, investment analysis',
    quotes: [
      { user: 'gripe1918', text: "I just connected it to futures trading", likes: 1 },
      { user: 'darrylsj', text: "Sending me weekly recommendations for selling covered calls on stock at best price points and an update on Theta decay.", likes: 0 },
      { user: 'BobWassermann', text: "Once a month it does my accounting (using fetched receipts), calculating kms driven for tax purposes.", likes: 5 },
      { user: 'LarsPeh', text: "surveillance part for our fund. Used for various surveillance and suggestions for rebalancing.", likes: 0 },
    ],
  },
  {
    id: 'research',
    name: '🔬 Research & Analysis',
    mentions: 11,
    description: 'Market research, competitor analysis, data crunching',
    quotes: [
      { user: 'theRohitDas', text: "searches youtube, gets transcript, tracks latest videos. 'Every day at 8, send me interesting bits from my favourite channels'", likes: 56 },
      { user: 'AdilMouja', text: "Curating news from HN, GitHub, and AI blogs, and posting the best resources to my website.", likes: 3 },
      { user: 'J_dev363', text: "Current use cases for me is doing Market Research and validating ideas.", likes: 1 },
    ],
  },
  {
    id: 'multi-agent',
    name: '🤖 Multi-Agent Teams',
    mentions: 8,
    description: 'Running agent teams, delegation, orchestration',
    quotes: [
      { user: 'UncleJAI', text: "Running a 5-agent team: main agent handles daily tasks, lead does project management, data agent crunches numbers, writer drafts content, coder ships features.", likes: 0 },
      { user: 'ykgup', text: "3 sub-agents running demand mapping, pipeline audit, and research simultaneously while you sleep is the unlock", likes: 0 },
      { user: 'xSoloTrades', text: "Set up 10 servers, each with its own instance. Going to make my own swarm where each agent passes tasks to each other.", likes: 0 },
    ],
  },
  {
    id: 'ecommerce',
    name: '🛒 E-commerce & CRO',
    mentions: 5,
    description: 'Conversion optimization, ads, e-commerce operations',
    quotes: [
      { user: 'josephepstein', text: "CRO on my e-commerce website. I've gotten my CPA down from $26 to $11 on Meta this past month. Will add over $1M in sales this year.", likes: 15 },
      { user: 'DMOGeek', text: "Reviewing ad creative", likes: 0 },
    ],
  },
]

const severityColors = {
  critical: { bg: '#ff4d4d20', border: '#ff4d4d', text: '#ff6b6b' },
  high: { bg: '#ffa50020', border: '#ffa500', text: '#ffb347' },
  medium: { bg: '#ffd70020', border: '#ffd700', text: '#ffe066' },
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('pain')
  const [selectedItem, setSelectedItem] = useState(null)
  const [sortBy, setSortBy] = useState('mentions')

  const sortedPainThemes = [...painThemes].sort((a, b) => {
    if (sortBy === 'mentions') return b.mentions - a.mentions
    if (sortBy === 'severity') {
      const order = { critical: 0, high: 1, medium: 2 }
      return order[a.severity] - order[b.severity]
    }
    return 0
  })

  const sortedUseCases = [...useCaseCategories].sort((a, b) => b.mentions - a.mentions)

  const totalPainMentions = painThemes.reduce((acc, t) => acc + t.mentions, 0)
  const totalUseCaseMentions = useCaseCategories.reduce((acc, t) => acc + t.mentions, 0)

  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
          🦞 OpenClaw Feedback Analysis
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Community feedback from{' '}
          <a href="https://x.com/rileybrown" target="_blank" style={{ color: '#1d9bf0' }}>@rileybrown</a>'s threads
        </p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[
          { id: 'pain', label: '😤 Pain Points', count: '56 replies' },
          { id: 'usecases', label: '🚀 Use Cases', count: '142 replies' },
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
            }}
          >
            {tab.label}
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, marginTop: '4px', opacity: 0.7 }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

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

      {/* Use Cases Tab */}
      {activeTab === 'usecases' && (
        <>
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}>
            <div style={{ background: '#12121a', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#4ade80' }}>{totalUseCaseMentions}</div>
              <div style={{ color: '#666', fontSize: '0.85rem' }}>Total Mentions</div>
            </div>
            <div style={{ background: '#12121a', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#60a5fa' }}>{useCaseCategories.length}</div>
              <div style={{ color: '#666', fontSize: '0.85rem' }}>Categories</div>
            </div>
            <div style={{ background: '#12121a', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fbbf24' }}>142</div>
              <div style={{ color: '#666', fontSize: '0.85rem' }}>Replies</div>
            </div>
          </div>

          {/* Use Cases Table */}
          <div style={{ background: '#12121a', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a3a' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#666', fontWeight: 500, fontSize: '0.9rem' }}>Category</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#666', fontWeight: 500, fontSize: '0.9rem', width: '80px' }}>Mentions</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#666', fontWeight: 500, fontSize: '0.9rem' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {sortedUseCases.map((uc, idx) => {
                  const isSelected = selectedItem === uc.id
                  return (
                    <tr
                      key={uc.id}
                      onClick={() => setSelectedItem(isSelected ? null : uc.id)}
                      style={{
                        borderBottom: idx < sortedUseCases.length - 1 ? '1px solid #1a1a2a' : 'none',
                        background: isSelected ? '#1a1a2a' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '0.95rem' }}>{uc.name}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{ background: '#4ade8030', color: '#4ade80', padding: '4px 10px', borderRadius: '16px', fontWeight: 600, fontSize: '0.85rem' }}>
                          {uc.mentions}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#aaa', fontSize: '0.9rem' }}>{uc.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Use Case Quotes */}
          {selectedItem && useCaseCategories.find(t => t.id === selectedItem) && (
            <div style={{ marginTop: '20px', background: '#12121a', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ marginBottom: '16px', color: '#fff', fontSize: '1.1rem' }}>
                💬 {useCaseCategories.find(t => t.id === selectedItem)?.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {useCaseCategories.find(t => t.id === selectedItem)?.quotes.map((q, i) => (
                  <div key={i} style={{ background: '#1a1a2a', borderRadius: '10px', padding: '14px', borderLeft: '3px solid #4ade80' }}>
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
          {' '}• Data from Feb 5, 2026
        </p>
      </footer>
    </main>
  )
}
