'use client'

import { useEffect, useState } from 'react'
import Footer from './components/Footer'

declare global {
  interface Window { Square: any }
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-indigo-900/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex justify-between items-center text-left group"
      >
        <span className="font-mono-nox text-xs uppercase tracking-widest text-zinc-300 group-hover:text-indigo-400 transition-colors">
          {question}
        </span>
        <span
          className="font-mono-nox text-indigo-500 text-base ml-4 flex-shrink-0 transition-transform duration-300"
          style={{ display: 'inline-block', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0' }}
      >
        <p className="pb-5 text-sm text-zinc-500 leading-relaxed font-mono-nox">{answer}</p>
      </div>
    </div>
  )
}

export default function Storefront() {
  const [paymentStatus, setPaymentStatus] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!window.Square) return
    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

    async function initializeSquare() {
      const payments = window.Square.payments(appId, locationId)
      const card = await payments.card()
      await card.attach('#card-container')

      document.getElementById('card-button')?.addEventListener('click', async () => {
        setIsProcessing(true)
        const result = await card.tokenize()
        if (result.status === 'OK') {
          processPayment(result.token)
        } else {
          setIsProcessing(false)
        }
      })
    }
    initializeSquare()
  }, [])

  async function processPayment(token: string) {
    setPaymentStatus('INITIATING TRANSACTION...')
    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        body: JSON.stringify({ sourceId: token }),
      })
      const data = await res.json()
      if (data.success) {
        setPaymentStatus('PROTOCOL INITIATED. CHECK YOUR EMAIL.')
      } else {
        setPaymentStatus('ERROR: ' + data.error)
      }
    } catch {
      setPaymentStatus('CONNECTION INTERRUPTED.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-[#000005] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: 'NOX V1 Serenity Interface',
            description: 'High-fidelity acoustic sleep mask designed for side-sleepers. 100% blackout + 3mm ultra-slim speakers.',
            brand: { '@type': 'Brand', name: 'NOX PROTOCOL' },
            offers: {
              '@type': 'Offer',
              url: 'https://nox-protocol.vercel.app/',
              priceCurrency: 'USD',
              price: '24.99',
              availability: 'https://schema.org/InStock',
            },
            image: [
              'https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png',
              'https://s.alicdn.com/@sc04/kf/H0ee7cb1fa10141bf8c9e13967476b0b7E.jpg',
              'https://s.alicdn.com/@sc04/kf/H381644cb2aba4d0f806a7e111a0f3d1av.jpg',
            ],
            aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '124' },
          }),
        }}
      />

      {/* ── STICKY MOBILE CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden pointer-events-none">
        <a
          href="#store"
          className="block w-full text-center py-4 rounded-xl font-display text-xl tracking-widest text-white shadow-2xl pointer-events-auto"
          style={{ background: '#6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
        >
          GET THE V1 — $24.99
        </a>
      </div>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden nox-grid">
        <div className="glow-orb" style={{ width: '65vw', height: '65vw', maxWidth: 750, maxHeight: 750, background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)', top: '-15%', left: '-10%' }} />
        <div className="glow-orb" style={{ width: '40vw', height: '40vw', maxWidth: 500, maxHeight: 500, background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', bottom: 0, right: 0 }} />
        <div className="scan-line" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="font-mono-nox text-xs tracking-[0.3em] uppercase text-cyan-400 flex items-center gap-3">
            <span className="block w-8 h-px bg-cyan-400" />
            NOX PROTOCOL
            <span className="block w-8 h-px bg-cyan-400" />
          </div>

          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <span key={i} className="text-indigo-500 text-sm">★</span>)}
            <span className="font-mono-nox text-[10px] uppercase tracking-widest text-zinc-600 ml-2">12,400+ Units Shipped</span>
          </div>

          <h1 className="font-display leading-[0.88] tracking-wide uppercase" style={{ fontSize: 'clamp(3.5rem,13vw,10rem)' }}>
            <span style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(99,102,241,0.85) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Deep Calm.
            </span>
            <br />
            <span>Neural Recovery.</span>
          </h1>

          <p className="max-w-lg text-zinc-400 text-base leading-relaxed">
            The world's first professional-grade acoustic sleep mask designed for side-sleepers.
            100% Blackout. 3mm Ultra-thin Audio. Restorative sleep, engineered.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="#store"
              className="font-mono-nox text-xs uppercase tracking-widest text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: '#6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.4)', animation: 'pulse-glow 2s ease-in-out infinite' }}
            >
              Initiate Protocol
            </a>
            <div className="font-mono-nox text-[10px] text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Batch 04: Limited Stock Remaining
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-25">
            {['WIRED', 'THE VERGE', 'TECHCRUNCH', 'HACKER NEWS'].map(p => (
              <span key={p} className="font-display text-base tracking-widest">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRUST BAR
      ════════════════════════════════════════ */}
      <div className="border-y border-indigo-900/20 bg-[#05050f]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-indigo-900/10">
          {[
            { icon: '🚚', text: 'Free 2-Day US Shipping' },
            { icon: '↩', text: '30-Night Trial' },
            { icon: '🔒', text: 'AES-256 Secure Payment' },
            { icon: '✓', text: 'HSA / FSA Eligible' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex flex-col items-center justify-center px-4 gap-2">
              <span className="text-indigo-400 text-lg">{icon}</span>
              <span className="font-mono-nox text-[10px] uppercase tracking-widest text-zinc-500 text-center">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          PRODUCT + CHECKOUT
      ════════════════════════════════════════ */}
      <section id="store" className="relative py-24 px-6 overflow-hidden nox-grid">
        <div className="glow-orb" style={{ width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', top: '10%', right: '-10%' }} />

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-indigo-900/25 p-8 bg-[rgba(10,10,24,0.9)]">
              <div className="absolute inset-8 border border-indigo-900/10 rounded-full" style={{ animation: 'spin-slow 25s linear infinite' }} />
              <div className="absolute inset-2 border border-indigo-900/5 rounded-full" style={{ animation: 'spin-slow 40s linear infinite reverse' }} />
              <img
                src="https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png"
                alt="V1 Neural Interface"
                className="w-full h-full object-contain relative z-10 transition-all duration-700 grayscale hover:grayscale-0"
                style={{ animation: 'float-mask 4s ease-in-out infinite', filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.5))' }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                'https://s.alicdn.com/@sc04/kf/H0ee7cb1fa10141bf8c9e13967476b0b7E.jpg',
                'https://s.alicdn.com/@sc04/kf/H381644cb2aba4d0f806a7e111a0f3d1av.jpg',
                'https://s.alicdn.com/@sc04/kf/Hd9d849bb02df42eda5703a240d0a6c8az.jpg',
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-indigo-900/15 bg-[rgba(10,10,24,0.9)]">
                  <img src={src} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Details + Payment */}
          <div className="flex flex-col gap-7">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-indigo-500 text-xs">★★★★★</span>
                <span className="font-mono-nox text-[10px] uppercase tracking-widest text-zinc-600">4.9 / 5 · 124 Verified Reviews</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl uppercase tracking-wide leading-none mb-1">V1 Serenity Interface</h2>
              <p className="font-mono-nox text-xs text-indigo-400 uppercase tracking-widest">Model 04 — Side-Sleeper Edition</p>
            </div>

            <div className="flex items-center gap-5">
              <span className="font-display text-5xl text-white">$24.99</span>
              <span className="font-mono-nox text-lg text-zinc-600 line-through">$49.99</span>
              <span className="font-mono-nox text-[10px] uppercase tracking-widest text-white px-3 py-1.5 rounded-sm" style={{ background: '#6366f1', boxShadow: '0 0 15px rgba(99,102,241,0.4)' }}>
                Final Launch Pricing
              </span>
            </div>

            <p className="text-zinc-400 text-base leading-relaxed border-l-2 border-indigo-900/40 pl-5 italic">
              "The solution for those who find earbuds painful and traditional masks insufficient. Cloud-soft comfort meets total sensory silence."
            </p>

            <div className="flex flex-wrap gap-2">
              {['3mm Audio Profile', '100% Light Occlusion', 'Thermo-Regulating Foam', '12h Battery', 'Washable', '15" Stretch-Fit'].map(f => (
                <span key={f} className="font-mono-nox text-[10px] uppercase tracking-wider text-indigo-400 border border-indigo-900/30 px-3 py-1 rounded-sm bg-[rgba(99,102,241,0.06)]">
                  {f}
                </span>
              ))}
            </div>

            {/* Checkout card */}
            <div className="relative rounded-3xl border border-indigo-900/30 p-7 bg-[rgba(10,10,24,0.9)]" style={{ boxShadow: '0 0 60px rgba(99,102,241,0.08)' }}>
              <div className="absolute -top-3 left-7 font-mono-nox text-[9px] uppercase tracking-widest text-white px-3 py-1 rounded-sm bg-indigo-600">
                Secure Terminal
              </div>
              <div id="card-container" className="mb-5 bg-white p-4 rounded-xl shadow-inner" />
              <button
                id="card-button"
                disabled={isProcessing}
                className="w-full py-5 rounded-2xl font-display text-xl tracking-widest uppercase transition-all duration-300 disabled:opacity-40"
                style={{
                  background: isProcessing ? 'rgba(99,102,241,0.3)' : 'white',
                  color: isProcessing ? 'white' : 'black',
                }}
              >
                {isProcessing ? 'Verifying Protocol...' : 'Initiate Secure Checkout'}
              </button>
              {paymentStatus && (
                <p className="mt-4 font-mono-nox text-xs text-center uppercase tracking-widest text-indigo-400">{paymentStatus}</p>
              )}
              <div className="mt-5 flex flex-wrap justify-center gap-2 font-mono-nox text-[9px] uppercase tracking-widest text-zinc-700">
                <span>AES-256 Encrypted</span><span>·</span>
                <span>HSA / FSA Accepted</span><span>·</span>
                <span>30-Night Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SPECS — 3 FEATURES
      ════════════════════════════════════════ */}
      <section className="relative py-28 px-6 overflow-hidden bg-[#05050f]">
        <div className="glow-orb" style={{ width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono-nox text-xs uppercase tracking-[0.3em] text-indigo-400 mb-3">Evidence &amp; Engineering</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>Designed for the Side-Sleeper.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Spec 1 */}
            <div className="flex flex-col gap-5 p-7 rounded-2xl border border-indigo-900/15 bg-[rgba(10,10,24,0.7)]">
              <div className="font-display leading-none text-transparent" style={{ fontSize: 'clamp(4rem,10vw,7rem)', WebkitTextStroke: '1px rgba(99,102,241,0.25)' }}>
                3<span className="font-mono-nox text-2xl" style={{ WebkitTextStroke: '0', color: '#6366f1' }}>mm</span>
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase mb-2">Ultra-Slim Audio Profile</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Integrated transducers are physically undetectable — even when lying directly on your side. No earbud pressure. Just high-fidelity binaural calm.</p>
              </div>
              <span className="font-mono-nox text-[10px] text-indigo-400 border border-indigo-900/25 px-3 py-1.5 rounded-sm self-start bg-[rgba(99,102,241,0.06)]">vs. 12mm generic</span>
            </div>
            {/* Spec 2 */}
            <div className="flex flex-col gap-5 p-7 rounded-2xl border border-indigo-900/15 bg-[rgba(10,10,24,0.7)]">
              <div className="font-display leading-none" style={{ fontSize: 'clamp(3rem,8vw,6rem)', background: 'linear-gradient(135deg,#fff,rgba(99,102,241,0.85))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                100%
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase mb-2">Light Occlusion</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Custom nose-contour blocks all external light. 3D ocular cups apply zero pressure to eyelids. Total optical darkness — instant Delta-wave trigger.</p>
              </div>
              <span className="font-mono-nox text-[10px] text-cyan-400 border border-cyan-900/25 px-3 py-1.5 rounded-sm self-start bg-[rgba(34,211,238,0.06)]">Lab Tested</span>
            </div>
            {/* Spec 3 */}
            <div className="flex flex-col gap-5 p-7 rounded-2xl border border-indigo-900/15 bg-[rgba(10,10,24,0.7)]">
              <div className="text-5xl">🌡️</div>
              <div>
                <h3 className="font-display text-2xl uppercase mb-2">Thermo-Regulating Foam</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Breathable memory foam adapts to your face while dissipating heat. Zero eyelid pressure. Easily removable audio module for machine washing.</p>
              </div>
              <span className="font-mono-nox text-[10px] text-indigo-400 border border-indigo-900/25 px-3 py-1.5 rounded-sm self-start bg-[rgba(99,102,241,0.06)]">Machine Washable</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SCIENCE
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden nox-grid">
        <div className="glow-orb" style={{ width: '55vw', height: '55vw', maxWidth: 650, maxHeight: 650, background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-7">
          <p className="font-mono-nox text-xs uppercase tracking-[0.3em] text-cyan-400">Protocol Science</p>
          <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>Engineered for Delta-Wave Recovery</h2>
          <svg viewBox="0 0 700 80" preserveAspectRatio="none" className="w-full max-w-2xl" style={{ height: 'clamp(50px,8vw,80px)' }} fill="none">
            <path d="M0,40 Q35,7 70,40 Q105,73 140,40 Q175,7 210,40 Q245,73 280,40 Q315,7 350,40 Q385,73 420,40 Q455,7 490,40 Q525,73 560,40 Q595,7 630,40 Q665,73 700,40" stroke="rgba(99,102,241,0.6)" strokeWidth="2.5"/>
            <path d="M0,40 Q17.5,4 35,40 Q52.5,76 70,40 Q87.5,4 105,40 Q122.5,76 140,40 Q157.5,4 175,40 Q192.5,76 210,40 Q227.5,4 245,40 Q262.5,76 280,40 Q297.5,4 315,40 Q332.5,76 350,40 Q367.5,4 385,40 Q402.5,76 420,40 Q437.5,4 455,40 Q472.5,76 490,40 Q507.5,4 525,40 Q542.5,76 560,40 Q577.5,4 595,40 Q612.5,76 630,40 Q647.5,4 665,40 Q682.5,76 700,40" stroke="rgba(34,211,238,0.25)" strokeWidth="1.5" strokeDasharray="5 5"/>
          </svg>
          <p className="text-zinc-400 text-base leading-relaxed max-w-xl">Binaural audio at 0.5–4Hz synchronizes brainwaves to Delta-state. Total darkness removes cortisol triggers. Combined: deep restorative sleep in under 15 minutes.</p>
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            {[{ n: '+28%', l: 'Deep Sleep' }, { n: '<15m', l: 'Time to Sleep' }, { n: '12h', l: 'Battery Life' }].map(({ n, l }) => (
              <div key={l} className="rounded-xl border border-indigo-900/20 p-4 text-center bg-[rgba(10,10,24,0.9)]">
                <div className="font-display text-3xl text-indigo-400" style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}>{n}</div>
                <div className="font-mono-nox text-[10px] uppercase tracking-wider text-zinc-600 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMPARISON TABLE
      ════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#05050f]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono-nox text-xs uppercase tracking-[0.3em] text-indigo-400 mb-3">Performance Benchmarking</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>NOX V1 vs. The Market</h2>
          </div>
          <div className="rounded-3xl border border-indigo-900/20 overflow-hidden">
            <table className="w-full text-left border-collapse bg-[rgba(10,10,24,0.6)]">
              <thead>
                <tr className="border-b border-indigo-900/20 bg-[rgba(99,102,241,0.05)]">
                  <th className="p-5 font-mono-nox text-[10px] uppercase tracking-widest text-zinc-600">Metric</th>
                  <th className="p-5 font-mono-nox text-[10px] uppercase tracking-widest text-indigo-400">NOX V1 Serenity</th>
                  <th className="p-5 font-mono-nox text-[10px] uppercase tracking-widest text-zinc-700">Generic Retail Mask</th>
                </tr>
              </thead>
              <tbody className="font-mono-nox text-sm">
                {[
                  ['Audio Profile', '3mm (Ultra-Thin)', '12mm (Bulky)'],
                  ['Side-Sleeper Design', 'Engineered for it', 'Not considered'],
                  ['Pressure Points', 'Zero (3D Ocular)', 'High (Flat Design)'],
                  ['Light Occlusion', '100% (Lab Tested)', '85–90% (Leaking)'],
                  ['Battery', '12h on 1h charge', '4–6h typical'],
                  ['Guarantee', '30-Night Performance', 'Return Only'],
                ].map(([metric, nox, generic]) => (
                  <tr key={metric} className="border-b border-indigo-900/8 hover:bg-indigo-900/5 transition-colors">
                    <td className="p-5 text-zinc-500 text-xs">{metric}</td>
                    <td className="p-5 text-indigo-400 font-medium">{nox}</td>
                    <td className="p-5 text-zinc-700">{generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SOCIAL PROOF
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden nox-grid">
        <div className="glow-orb" style={{ width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-indigo-500 text-2xl tracking-widest mb-2">★★★★★</div>
            <div className="font-display leading-none" style={{ fontSize: 'clamp(4rem,12vw,9rem)', background: 'linear-gradient(135deg,#fff,rgba(99,102,241,0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>4.9</div>
            <p className="font-display text-2xl uppercase mt-1">124 Verified Reviews · 12,400+ Units Shipped</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { q: '"I\'m a side-sleeper and earbuds always hurt. The NOX V1 changed everything — I don\'t feel the speakers at all."', n: 'Marcus T., verified buyer' },
              { q: '"Complete blackout. I live on a noisy street and finally sleep through the night. Worth every penny."', n: 'Sarah K., verified buyer' },
              { q: '"My Whoop sleep score jumped 18 points in the first week. The data doesn\'t lie."', n: 'Devon R., verified buyer' },
            ].map(({ q, n }) => (
              <div key={n} className="rounded-2xl border border-indigo-900/15 p-6 flex flex-col gap-3 bg-[rgba(10,10,24,0.9)]">
                <div className="text-indigo-500 text-xs">★★★★★</div>
                <p className="text-zinc-400 text-sm leading-relaxed italic">{q}</p>
                <div className="font-mono-nox text-[10px] uppercase tracking-wider text-zinc-600 mt-auto">— {n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRACTION BAR
      ════════════════════════════════════════ */}
      <section className="py-14 px-6 bg-[#05050f]">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between font-mono-nox text-xs uppercase tracking-widest">
            <span className="text-indigo-400">Batch 04 Stock: 72% Allocated</span>
            <span className="text-zinc-600">28% Remaining</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden border border-indigo-900/20 bg-[rgba(99,102,241,0.1)]">
            <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg,#6366f1,#22d3ee)', boxShadow: '0 0 10px rgba(99,102,241,0.5)' }} />
          </div>
          <p className="font-mono-nox text-[10px] text-zinc-700 uppercase tracking-widest text-center">
            <span className="text-red-500">⬤</span> Limited batch production. Restocking not guaranteed.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden nox-grid">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono-nox text-xs uppercase tracking-[0.3em] text-indigo-400 mb-3">Initiation Sequence</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>How to Run the Protocol</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '01', t: 'Load Audio', d: 'Pair via Bluetooth. Select binaural delta-wave track or your own playlist.' },
              { n: '02', t: 'Engage Interface', d: 'Adjust the stretch-fit tensioner. Place the V1 over your eyes.' },
              { n: '03', t: 'Activate Blackout', d: 'Nose contour seals. 100% occlusion confirmed. Cortisol drop begins.' },
              { n: '04', t: 'Deep Recovery', d: 'Delta-wave synchronization active. Restorative sleep cycle initiated.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="rounded-2xl border border-indigo-900/15 p-6 flex flex-col gap-3 bg-[rgba(10,10,24,0.8)]">
                <div className="font-display text-5xl text-indigo-900/40">{n}</div>
                <div className="font-display text-xl uppercase">{t}</div>
                <p className="text-zinc-500 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-mono-nox text-xs tracking-widest text-cyan-400">
            // EST. TIME TO SLEEP STATE: &lt;15 MINUTES
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#05050f]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono-nox text-xs uppercase tracking-[0.3em] text-indigo-400 mb-3">Protocol Clarifications</p>
            <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}>FAQ</h2>
          </div>
          <div className="rounded-3xl border border-indigo-900/20 p-8 md:p-12 bg-[rgba(10,10,24,0.7)]">
            <FAQItem question="Will I feel the speakers if I sleep on my side?" answer="No. The V1 utilizes ultra-slim 3mm transducers embedded within the thermo-memory foam. They are physically undetectable to most side-sleepers." />
            <FAQItem question="Is the NOX V1 washable?" answer="Yes. The audio module is easily removable via the hidden internal port. The outer fabric can be hand-washed or machine-washed on a delicate cycle." />
            <FAQItem question="What is the battery life?" answer="The internal module provides 12 hours of continuous high-fidelity audio on a single 1-hour charge. Enough for even the longest recovery protocols." />
            <FAQItem question="Will it fit my head size?" answer="The V1 features a 15-inch stretch-fit elastic tensioner, designed to accommodate head circumferences from 20 to 26 inches comfortably." />
            <FAQItem question="What if I don't see results?" answer="We offer a 30-night Recovery Guarantee. If the V1 does not materially improve your sleep quality, we will initiate a full refund." />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden nox-grid">
        <div className="glow-orb" style={{ width: '80vw', height: '80vw', maxWidth: 900, maxHeight: 900, background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="scan-line" />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-7">
          <p className="font-mono-nox text-xs uppercase tracking-[0.3em] text-cyan-400">◉ Batch 04 Now Shipping</p>
          <h2
            className="font-display uppercase leading-[0.88] tracking-wide"
            style={{ fontSize: 'clamp(3rem,10vw,8rem)', background: 'linear-gradient(135deg,#fff 0%,rgba(99,102,241,0.9) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Upgrade Your<br />Recovery Hardware.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed max-w-md">
            Batch 04 is currently shipping. Secure your V1 Serenity Interface and join 12,000+ operators in the pursuit of restorative rest.
          </p>
          <div className="font-mono-nox text-xs text-zinc-600 border border-indigo-900/20 px-5 py-2 rounded-sm">
            Launch Price: <span className="text-indigo-400 font-bold">$24.99</span> &nbsp;·&nbsp; Free Shipping &nbsp;·&nbsp; 30-Night Guarantee
          </div>
          <a
            href="#store"
            className="font-mono-nox text-sm uppercase tracking-widest text-white px-10 py-5 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: '#6366f1', boxShadow: '0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(99,102,241,0.15)', animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            Initiate Secure Protocol →
          </a>
          <p className="font-mono-nox text-xs text-zinc-700 uppercase tracking-widest">nox-protocol.vercel.app</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
