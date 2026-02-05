import './globals.css'

export const metadata = {
  title: 'OpenClaw Feedback Analysis | User Pain Points',
  description: '56 Twitter replies analyzed: Setup takes days, config is a maze, UI needs overhaul. See what real users say about OpenClaw friction points.',
  metadataBase: new URL('https://openclaw-feedback.vercel.app'),
  openGraph: {
    title: 'OpenClaw Feedback Analysis 🦞',
    description: '56 Twitter replies analyzed into 10 themes of dissatisfaction. Setup, config, UI, trust, stability & more.',
    url: 'https://openclaw-feedback.vercel.app',
    siteName: 'OpenClaw Feedback',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenClaw Feedback Analysis - User Pain Points',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenClaw Feedback Analysis 🦞',
    description: '56 Twitter replies → 10 themes of dissatisfaction. See what users really think.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
