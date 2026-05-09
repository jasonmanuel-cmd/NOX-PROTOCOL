'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Zap, Moon, BatteryCharging, Headphones } from 'lucide-react'
import Footer from './components/Footer'

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

      const cardButton = document.getElementById('card-button')
      cardButton?.addEventListener('click', async () => {
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
    } catch (e) {
      setPaymentStatus('CONNECTION INTERRUPTED.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-black text-white selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4">NOX PROTOCOL</h1>
          <p className="text-indigo-400 uppercase tracking-[0.3em] text-xs font-bold mb-12">Human Optimization Lab // v1.0.4</p>
          <a href="#store" className="bg-white text-black px-8 py-4 font-black rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 uppercase text-sm tracking-widest">
            Access Store
          </a>
        </motion.div>

        <div className="absolute bottom-10 left-10 text-[10px] font-mono text-gray-700 hidden md:block">
          LATENCY: 14MS // STATUS: ENCRYPTED // REGION: US-EAST
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-indigo-900/20 py-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Truck size={14} className="text-indigo-500" /> Free US Shipping
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-indigo-500" /> Encrypted Checkout
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Zap size={14} className="text-indigo-500" /> 2026 Tech
          </div>
        </div>
      </div>

      {/* Store Section */}
      <section id="store" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Image Gallery Mockup */}
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-square bg-zinc-900 border border-indigo-900/30 rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <img src="https://via.placeholder.com/600?text=V1+NEURAL+INTERFACE" alt="V1 Mask" className="grayscale opacity-80" />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-zinc-950 border border-indigo-900/10 rounded-xl" />
              <div className="aspect-square bg-zinc-950 border border-indigo-900/10 rounded-xl" />
              <div className="aspect-square bg-zinc-950 border border-indigo-900/10 rounded-xl" />
            </div>
          </div>

          {/* Checkout Column */}
          <div className="flex flex-col">
            <h2 className="text-4xl font-black italic mb-2 tracking-tighter">V1: NEURAL INTERFACE</h2>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-mono font-bold text-indigo-500">$24.99</span>
              <span className="text-sm text-gray-500 line-through">$49.99</span>
              <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase italic">Early Access</span>
            </div>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Total light occlusion meets high-fidelity binaural audio. The V1 is engineered to isolate your brain from external stimuli, inducing a deep Delta-wave state for maximum neural recovery.
            </p>

            <ul className="space-y-4 mb-10 text-sm font-medium">
              <li className="flex items-center gap-3"><Moon size={16} className="text-indigo-500" /> 100% Blackout Design</li>
              <li className="flex items-center gap-3"><Headphones size={16} className="text-indigo-500" /> Ultra-thin Bluetooth Audio</li>
              <li className="flex items-center gap-3"><BatteryCharging size={16} className="text-indigo-500" /> 12H Continuous Operation</li>
            </ul>

            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-indigo-900/20">
              <div id="card-container" className="mb-4 bg-white p-3 rounded-lg overflow-hidden" />
              <button 
                id="card-button"
                disabled={isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:cursor-not-allowed py-4 rounded-2xl font-black transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                {isProcessing ? 'Verifying...' : 'Initiate Order'}
              </button>
              {paymentStatus && (
                <p className="mt-4 text-center text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
                  {paymentStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="bg-zinc-950 py-24 px-6 border-t border-indigo-900/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4">Neural Architecture</h3>
            <p className="text-sm text-gray-500 leading-loose">
              The V1 utilizes 3D contoured padding to apply zero pressure to the ocular nerves, preventing REM interruption. Integrated ultra-slim speakers provide passive noise isolation, ideal for non-invasive audio therapy.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4">Material Science</h3>
            <p className="text-sm text-gray-500 leading-loose">
              Constructed from breathable thermo-regulating memory foam. Designed for side-sleepers and athletes requiring hyper-efficient recovery cycles.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
