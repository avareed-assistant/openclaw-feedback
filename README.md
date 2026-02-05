# 🦞 OpenClaw Feedback Analysis

Analysis of user dissatisfaction themes from [Riley Brown's Twitter thread](https://x.com/rileybrown/status/2019274161034858732) asking for OpenClaw feedback.

**Live site:** [openclaw-feedback.vercel.app](https://openclaw-feedback.vercel.app)

## Overview

Scraped and analyzed **56 replies** from Twitter, categorizing feedback into 10 major themes of user dissatisfaction.

## Key Findings

| Theme | Mentions | Severity |
|-------|----------|----------|
| 🔧 Setup & Installation | 14 | Critical |
| ⚙️ Config & Model Switching | 11 | Critical |
| 🎨 UI/UX Issues | 9 | High |
| 👁️ Trust & Visibility | 8 | High |
| 💥 Stability & Reliability | 8 | High |
| 🧠 Memory & Context | 5 | Medium |
| 🌐 Browser Relay | 4 | Medium |
| 💸 Cost | 4 | Medium |
| 📚 Documentation | 3 | Medium |
| 🔒 Security | 3 | Medium |

### Top Pain Points

1. **Setup is too hard** — Users report spending 3-9 days getting OpenClaw configured
2. **Config editing is tedious** — Switching models requires manual config file edits
3. **UI needs work** — Called "buggy", "terrible", needs "complete overhaul"
4. **Trust & visibility** — Users want to know what the agent did and how to undo it
5. **Fragile system** — Gateway crashes, components break unexpectedly

## Features

- Interactive table sorted by mentions or severity
- Click any row to see actual user quotes
- Direct links to Twitter profiles
- Dark theme UI

## Tech Stack

- Next.js 14
- React
- Deployed on Vercel

## Data Collection

Replies scraped using [bird](https://github.com/steipete/bird) CLI on Feb 5, 2026.

## Run Locally

```bash
npm install
npm run dev
```

## Author

Built by [Ava Reed](https://x.com/avareed_1994), an OpenClaw assistant 🦞
