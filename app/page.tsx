'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Zap, Moon, BatteryCharging, Headphones } from 'lucide-react'
import Footer from './components/Footer'

declare global {
  interface Window {
    Square: any;
  }
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
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pointer-events-auto"
        >
          <a href="#store" className="block w-full bg-white text-black text-center py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-indigo-900/20">
            Initiate Protocol — $24.99
          </a>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          <img 
            src="https://sc02.alicdn.com/kf/Ad874c5fd810545ac954696e21bea72dah.png" 
            alt="NOX PROTOCOL Logo" 
            className="w-32 md:w-48 mb-8 drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]"
          />
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 uppercase leading-none">Deep Calm. <br/>Neural Recovery.</h1>
          <p className="text-indigo-400 uppercase tracking-[0.4em] text-xs font-bold mb-12 opacity-80">The Science of Restorative Sleep // v1.0.4</p>
          <a href="#store" className="bg-indigo-600 text-white px-10 py-5 font-black rounded-full hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 uppercase text-sm tracking-widest">
            Begin the Protocol
          </a>
        </motion.div>

        <div className="absolute bottom-10 left-10 text-[10px] font-mono text-indigo-900/50 hidden md:block">
          LATENCY: 14MS // STATUS: ENCRYPTED // REGION: US-EAST
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-indigo-900/20 py-8 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 px-6">
          <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase tracking-widest">
            <Truck size={16} className="text-indigo-500" /> Free US Shipping
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase tracking-widest">
            <ShieldCheck size={16} className="text-indigo-500" /> Encrypted Checkout
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase tracking-widest">
            <Zap size={16} className="text-indigo-500" /> 2026 Tech
          </div>
        </div>
      </div>

      {/* Store Section */}
      <section id="store" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="aspect-square bg-zinc-900 border border-indigo-900/30 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-8 relative group"
            >
              <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-transparent transition duration-500" />
              <img 
                src="https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png" 
                alt="V1 Neural Interface" 
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition duration-700 scale-110" 
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-6">
              <div className="aspect-square bg-zinc-900/50 border border-indigo-900/20 rounded-2xl flex items-center justify-center p-4">
                 <img src="https://sc02.alicdn.com/kf/A393845927c604bb586625ecb828d7d12j.png" className="w-full h-full object-contain opacity-50 hover:opacity-100 transition" />
              </div>
              <div className="aspect-square bg-zinc-900/50 border border-indigo-900/20 rounded-2xl flex items-center justify-center p-4">
                 <img src="https://sc02.alicdn.com/kf/A1b082dda62314190abdce69e50ebf290n.png" className="w-full h-full object-contain opacity-50 hover:opacity-100 transition" />
              </div>
              <div className="aspect-square bg-zinc-900/50 border border-indigo-900/20 rounded-2xl flex items-center justify-center p-4">
                 <div className="w-8 h-8 rounded-full border-2 border-indigo-900/30 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Checkout Column */}
          <div className="flex flex-col">
            <div className="mb-4">
               <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.4em]">Hardware Module // v1.0</span>
            </div>
            <h2 className="text-5xl font-black italic mb-4 tracking-tighter">V1: SERENITY INTERFACE</h2>
            <div className="flex items-center gap-6 mb-8">
              <span className="text-4xl font-mono font-bold text-white">$24.99</span>
              <span className="text-lg text-gray-600 line-through">$49.99</span>
              <span className="bg-indigo-500 text-white px-3 py-1 rounded-sm text-[10px] font-black tracking-widest uppercase italic shadow-[0_0_15px_rgba(79,70,229,0.4)]">Save 50%</span>
            </div>

            <p className="text-gray-400 mb-10 leading-relaxed text-lg italic border-l-2 border-indigo-900/50 pl-6">
              "Weightless comfort meets total sensory silence. The V1 is engineered to melt away the day and induce immediate restorative calm."
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-12 text-sm font-semibold text-gray-300">
              <li className="flex items-center gap-3"><Moon size={18} className="text-indigo-500" /> Cloud-Soft Comfort</li>
              <li className="flex items-center gap-3"><Headphones size={18} className="text-indigo-500" /> Dream-Thin Audio</li>
              <li className="flex items-center gap-3"><BatteryCharging size={18} className="text-indigo-500" /> 12H Tranquility</li>
              <li className="flex items-center gap-3"><ShieldCheck size={18} className="text-indigo-500" /> Pure Skin-Safe Fabric</li>
            </ul>

            <div className="bg-zinc-900/80 p-8 rounded-[2rem] border border-indigo-900/30 shadow-2xl">
              <div className="mb-6 flex justify-between items-center px-1">
                 <span className="text-[10px] font-mono text-indigo-400 uppercase">Secure Payment Link</span>
                 <div className="flex gap-1">
                    <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                    <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                 </div>
              </div>
              <div id="card-container" className="mb-6 bg-white p-4 rounded-xl shadow-inner" />
              <button 
                id="card-button"
                disabled={isProcessing}
                className="w-full bg-white text-black hover:bg-indigo-500 hover:text-white disabled:bg-gray-800 disabled:cursor-not-allowed py-5 rounded-2xl font-black transition-all duration-500 uppercase tracking-[0.2em] text-sm shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                {isProcessing ? 'Verifying...' : 'Initiate Protocol'}
              </button>
              {paymentStatus && (
                <div className="mt-6 p-4 border border-indigo-500/20 bg-indigo-500/5 rounded-xl">
                  <p className="text-center text-xs font-mono text-indigo-400 uppercase tracking-widest animate-pulse">
                    {paymentStatus}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comfort & Calm Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-indigo-900/10">
        <div className="text-center mb-16">
          <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mb-4">The Comfort Protocol</h3>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Engineered for Serenity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="mb-6 flex justify-center text-indigo-500"><Zap size={32} /></div>
            <h4 className="text-xl font-bold italic mb-4">Zero-Gravity Fit</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Proprietary silk-blend memory foam adapts to your face contours, providing a weightless sensation that vanishes the moment you close your eyes.
            </p>
          </div>
          <div>
            <div className="mb-6 flex justify-center text-indigo-500"><Moon size={32} /></div>
            <h4 className="text-xl font-bold italic mb-4">Total Sensory Silence</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              We don't just block light; we create a vacuum. The V1 creates a sterile-calm environment, perfect for deep, uninterrupted REM cycles.
            </p>
          </div>
          <div>
            <div className="mb-6 flex justify-center text-indigo-500"><BatteryCharging size={32} /></div>
            <h4 className="text-xl font-bold italic mb-4">Restorative Audio</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ultra-flat transducers deliver crystal-clear binaural beats or white noise without the discomfort of traditional earbuds. Pure sonic calm.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-indigo-900/10">
        <h3 className="text-center text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mb-12">Protocol Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-indigo-900/20">
                <th className="py-4 text-[10px] uppercase tracking-widest text-gray-500">Feature</th>
                <th className="py-4 text-[10px] uppercase tracking-widest text-white italic font-black">NOX V1</th>
                <th className="py-4 text-[10px] uppercase tracking-widest text-gray-500">Retail Generic</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono">
              <tr className="border-b border-indigo-900/10">
                <td className="py-4 text-gray-400">Speaker Depth</td>
                <td className="py-4 text-indigo-400">3mm (Ultra-Slim)</td>
                <td className="py-4 text-gray-700">10-15mm (Bulky)</td>
              </tr>
              <tr className="border-b border-indigo-900/10">
                <td className="py-4 text-gray-400">Eye Pressure</td>
                <td className="py-4 text-indigo-400">Zero (3D Contoured)</td>
                <td className="py-4 text-gray-700">High (Flat Design)</td>
              </tr>
              <tr className="border-b border-indigo-900/10">
                <td className="py-4 text-gray-400">Light Occlusion</td>
                <td className="py-4 text-indigo-400">100% (Total)</td>
                <td className="py-4 text-gray-700">85-90% (Leaking)</td>
              </tr>
              <tr className="border-b border-indigo-900/10">
                <td className="py-4 text-gray-400">Material</td>
                <td className="py-4 text-indigo-400">Thermo-Memory Foam</td>
                <td className="py-4 text-gray-700">Polyester / Cotton</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Product 2: Coming Soon */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-indigo-900/10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 opacity-40">
               <div className="aspect-square bg-zinc-900 rounded-3xl border border-indigo-900/20 flex items-center justify-center p-12 mb-6">
                  <img src="https://sc02.alicdn.com/kf/Aec1ee7acd4ab4175b0ff5a522308e4ddP.png" className="w-full h-full object-contain grayscale" />
               </div>
               <h3 className="text-xl font-black italic tracking-tighter mb-2 italic">CORE: PULSE INTERFACE</h3>
               <h2 className="text-3xl font-black italic mb-6 tracking-tighter uppercase text-indigo-900/50">Next Gen Hardware Incoming</h2>
               <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                  The CORE Cranial Pulse Interface is currently in final testing. Utilizing localized microcurrent technology to stabilize neurotransmitters pre-sleep. Early access deployment scheduled for Q3 2026.
               </p>
            </div>
         </div>
      </section>

      {/* Tech Specs */}
      <section className="bg-zinc-950 py-24 px-6 border-t border-indigo-900/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4">Neural Architecture</h3>
            <p className="text-sm text-gray-500 leading-loose">
              Unlike generic retail masks that utilize thick, uncomfortable speakers, the V1 features ultra-slim 3mm transducers optimized for side-sleepers. The zero-pressure ocular design ensures no REM interruption while blocking 100% of external light pollution.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em] mb-4">Lab-Grade Construction</h3>
            <p className="text-sm text-gray-500 leading-loose">
              Built with precision-engineered thermo-regulating memory foam. Each unit is delivered in protective sterile-seal packaging to ensure the protocol arrives uncompromised. This is human optimization, not a toy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
