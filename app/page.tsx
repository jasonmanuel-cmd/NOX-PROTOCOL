'use client'

import { useEffect, useState } from 'react'

export default function Storefront() {
  const [paymentStatus, setPaymentStatus] = useState('')

  useEffect(() => {
    if (!window.Square) return

    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

    async function initializeSquare() {
      const payments = window.Square.payments(appId, locationId)
      const card = await payments.card()
      await card.attach('#card-container')

      const cardButton = document.getElementById('card-button')
      cardButton?.addEventListener('click', async () => {
        const result = await card.tokenize()
        if (result.status === 'OK') {
          processPayment(result.token)
        }
      })
    }

    initializeSquare()
  }, [])

  async function processPayment(token: string) {
    setPaymentStatus('Processing...')
    const res = await fetch('/api/pay', {
      method: 'POST',
      body: JSON.stringify({ sourceId: token }),
    })
    const data = await res.json()
    if (data.success) {
      setPaymentStatus('Payment Successful! Thank you for your order.')
    } else {
      setPaymentStatus('Payment Failed: ' + data.error)
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8 text-center">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter mb-2 italic">NOX PROTOCOL</h1>
        <p className="text-indigo-500 uppercase tracking-widest text-xs font-bold">Human Optimization Lab</p>
      </header>

      <div className="bg-gray-900/50 border border-indigo-900/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
        <img 
          src="https://via.placeholder.com/400x300?text=NOX+V1+SLEEP+MASK" 
          alt="NOX V1 Mask" 
          className="rounded-lg mb-4 w-full grayscale hover:grayscale-0 transition duration-500"
        />
        <h2 className="text-2xl font-semibold mb-2 tracking-tight">V1: Neural Sleep Interface</h2>
        <p className="text-gray-400 text-sm mb-4">Deep blackout + Integrated Binaural Audio. Optimized for Delta-wave induction.</p>
        <div className="text-3xl font-mono font-bold mb-6 text-indigo-400">$24.99</div>

        <div id="card-container" className="mb-4 bg-white p-4 rounded"></div>
        <button 
          id="card-button"
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition"
        >
          Buy Now
        </button>
        {paymentStatus && <p className="mt-4 text-sm italic">{paymentStatus}</p>}
      </div>

      <footer className="text-gray-600 text-xs">
        Secure checkout powered by Square.
      </footer>
    </main>
  )
}
