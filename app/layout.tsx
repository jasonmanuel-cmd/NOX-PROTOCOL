import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NOX PROTOCOL | Sleep & Recovery Lab',
  description: 'Elite human optimization via advanced sleep tech.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://sandbox.web.squarecdn.com/v1/square.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
