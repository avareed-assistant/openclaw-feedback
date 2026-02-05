import './globals.css'

export const metadata = {
  title: 'OpenClaw Feedback Analysis',
  description: 'Analysis of user dissatisfaction themes from Twitter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
