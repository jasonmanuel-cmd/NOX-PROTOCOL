import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NOX V1 Serenity Interface | The Side-Sleeper\'s Audio Sanctuary',
  description: '100% Blackout. Ultra-thin Audio. The world\'s first professional-grade acoustic sleep mask designed specifically for side-sleepers.',
  keywords: 'bluetooth sleep mask, sleep headphones, side sleeper headphones, blackout eye mask, deep sleep tech, NOX PROTOCOL',
  authors: [{ name: 'NOX PROTOCOL LABS' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'NOX V1 Serenity Interface | Deep Calm & Neural Recovery',
    description: 'Elite human optimization via advanced sleep technology. Designed for the relentless side-sleeper.',
    url: 'https://nox-protocol.vercel.app/',
    siteName: 'NOX PROTOCOL',
    images: [
      {
        url: 'https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png',
        width: 1200,
        height: 630,
        alt: 'NOX V1 Serenity Interface Product Shot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOX V1 Serenity Interface',
    description: 'The world\'s first professional-grade acoustic sleep mask for side-sleepers.',
    images: ['https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://sandbox.web.squarecdn.com/v1/square.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
