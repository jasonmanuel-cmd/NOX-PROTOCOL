'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Zap, Moon, BatteryCharging, Headphones, Star, Check, HelpCircle, ChevronDown, Package, CreditCard, RotateCcw } from 'lucide-react'
import Footer from './components/Footer'

declare global {
  interface Window {
    Square: any;
  }
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-indigo-900/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-indigo-400 transition-colors"
      >
        <span className="text-sm font-bold uppercase tracking-wider">{question}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 pb-6' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
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
    <div className="bg-black text-white selection:bg-indigo-500 selection:text-white font-sans">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "NOX V1 Serenity Interface",
            "image": [
              "https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png",
              "https://s.alicdn.com/@sc04/kf/H0ee7cb1fa10141bf8c9e13967476b0b7E.jpg",
              "https://s.alicdn.com/@sc04/kf/H381644cb2aba4d0f806a7e111a0f3d1av.jpg"
            ],
            "description": "High-fidelity acoustic sleep mask designed for side-sleepers. Features 3mm ultra-slim speakers and 100% light occlusion for deep recovery.",
            "brand": {
              "@type": "Brand",
              "name": "NOX PROTOCOL"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://nox-protocol.vercel.app/",
              "priceCurrency": "USD",
              "price": "24.99",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "USD"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 2,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 7,
                    "maxValue": 12,
                    "unitCode": "DAY"
                  }
                }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "124"
            }
          })
        }}
      />

      {/* Sticky CTA (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden pointer-events-none">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="pointer-events-auto">
          <a href="#store" className="block w-full bg-indigo-600 text-white text-center py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl">
            GET THE V1 — $24.99
          </a>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black to-black -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <img 
              src="https://sc02.alicdn.com/kf/Ad874c5fd810545ac954696e21bea72dah.png" 
              alt="NOX PROTOCOL Logo" 
              className="w-32 md:w-48 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]"
            />
            
            <div className="flex items-center justify-center gap-1 mb-6 text-indigo-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">12,400+ Units Shipped</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-6 leading-none uppercase">
              Deep Calm. <br/>Neural Recovery.
            </h1>
            
            <p className="max-w-xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              The world's first professional-grade acoustic sleep mask designed for side-sleepers. 100% Blackout. 3mm Ultra-thin Audio. Restorative sleep, engineered.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
              <a href="#store" className="w-full md:w-auto bg-white text-black px-10 py-5 font-black rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 uppercase text-sm tracking-widest">
                Initiate Protocol
              </a>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Batch 04: Limited Stock Remaining
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto w-full mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale filter invert brightness-200">
           <div className="flex items-center justify-center font-black italic text-xl">WIRED</div>
           <div className="flex items-center justify-center font-black italic text-xl">THE VERGE</div>
           <div className="flex items-center justify-center font-black italic text-xl">TECHCRUNCH</div>
           <div className="flex items-center justify-center font-black italic text-xl">HACKER NEWS</div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-zinc-950 border-y border-indigo-900/20 py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-indigo-900/10 lg:divide-x">
          <div className="flex flex-col items-center justify-center px-4">
            <Truck size={20} className="text-indigo-500 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Free 2-Day US Shipping</span>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <RotateCcw size={20} className="text-indigo-500 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">30-Night Trial</span>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <ShieldCheck size={20} className="text-indigo-500 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Secure AES-256 Payment</span>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <Check size={20} className="text-indigo-500 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">HSA/FSA Eligible</span>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="store" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <div className="aspect-square bg-zinc-900 rounded-[2.5rem] overflow-hidden relative group border border-indigo-900/30 p-8">
              <img src="https://sc02.alicdn.com/kf/Afc2d13729af24a0e8dc577e17cdf27bca.png" alt="V1 Neural Interface" className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-700" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="aspect-square bg-zinc-900 rounded-2xl border border-indigo-900/10 overflow-hidden">
                <img src="https://s.alicdn.com/@sc04/kf/H0ee7cb1fa10141bf8c9e13967476b0b7E.jpg" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition" />
              </div>
              <div className="aspect-square bg-zinc-900 rounded-2xl border border-indigo-900/10 overflow-hidden">
                <img src="https://s.alicdn.com/@sc04/kf/H381644cb2aba4d0f806a7e111a0f3d1av.jpg" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition" />
              </div>
              <div className="aspect-square bg-zinc-900 rounded-2xl border border-indigo-900/10 overflow-hidden">
                <img src="https://s.alicdn.com/@sc04/kf/Hd9d849bb02df42eda5703a240d0a6c8az.jpg" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex text-indigo-500"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">4.9/5 Based on 124 Verified Reviews</span>
            </div>
            <h2 className="text-5xl font-black italic tracking-tighter mb-6 uppercase">V1 Serenity Interface</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-4xl font-mono font-bold text-white">$24.99</span>
              <span className="text-lg text-gray-600 line-through">$49.99</span>
              <span className="bg-indigo-500 text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest italic shadow-[0_0_15px_rgba(79,70,229,0.4)]">Final Launch Pricing</span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-2 border-indigo-900/40 pl-6 italic font-medium">
              "The solution for those who find earbuds painful and traditional masks insufficient. Cloud-soft comfort meets total sensory silence."
            </p>

            <div className="bg-zinc-900/80 border border-indigo-900/30 p-8 rounded-[2rem] shadow-2xl relative">
              <div className="absolute -top-3 left-8 bg-indigo-600 px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest">Secure Terminal</div>
              <div id="card-container" className="mb-6 bg-white p-4 rounded-xl shadow-inner" />
              <button 
                id="card-button"
                disabled={isProcessing}
                className="w-full bg-white text-black hover:bg-indigo-500 hover:text-white disabled:bg-gray-800 py-5 rounded-2xl font-black transition-all duration-300 uppercase tracking-[0.2em] text-sm shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                {isProcessing ? 'Verifying Protocol...' : 'Initiate Secure Checkout'}
              </button>
              <div className="mt-6 flex justify-center gap-4 opacity-30 grayscale brightness-200">
                <CreditCard size={24} /> <Package size={24} /> <ShieldCheck size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Details Section */}
      <section className="bg-zinc-950 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mb-4">Evidence & Engineering</h3>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Designed for the side-sleeper.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-zinc-900 border border-indigo-900/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src="https://sc02.alicdn.com/kf/A3e7590a459124fef87e61ea64372f22et.png" className="w-full h-full object-cover grayscale" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight italic">3mm Audio Profile</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Integrated ultra-slim transducers are physically undetectable, even when lying directly on your side. No earbud pain, just high-fidelity calm.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-zinc-900 border border-indigo-900/20 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src="https://sc02.alicdn.com/kf/Af913a40d6ef74f33a5e5af211997622ac.png" className="w-full h-full object-cover grayscale" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight italic">Thermo-Regulating Foam</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Breathable memory foam adapts to your face while dissipating heat. The 3D ocular cups apply zero pressure to your eyelids and eyelashes.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-zinc-900 border border-indigo-900/20 rounded-2xl flex items-center justify-center overflow-hidden text-indigo-500">
                <Moon size={32} />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight italic">100% Light Occlusion</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Total optical darkness triggers immediate restorative sleep cycles. Designed with a custom nose-contour to block 100% of external light.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <HelpCircle size={32} className="mx-auto text-indigo-500 mb-4" />
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Protocol Clarifications</h2>
        </div>
        
        <div className="bg-zinc-950 border border-indigo-900/20 rounded-[2.5rem] p-8 md:p-12">
          <FAQItem 
            question="Will I feel the speakers if I sleep on my side?" 
            answer="No. The V1 utilizes ultra-slim 3mm transducers embedded within the thermo-memory foam. They are physically undetectable to most side-sleepers."
          />
          <FAQItem 
            question="Is the NOX V1 washable?" 
            answer="Yes. The audio module is easily removable via the hidden internal port. The outer fabric can be hand-washed or machine-washed on a delicate cycle."
          />
          <FAQItem 
            question="What is the battery life?" 
            answer="The internal module provides 12 hours of continuous high-fidelity audio on a single 1-hour charge. Enough for even the longest recovery protocols."
          />
          <FAQItem 
            question="Will it fit my head size?" 
            answer="The V1 features a 15-inch stretch-fit elastic tensioner, designed to accommodate head circumferences from 20 to 26 inches comfortably."
          />
          <FAQItem 
            question="What if I don't see results?" 
            answer="We offer a 30-night 'Recovery Guarantee.' If the V1 does not materially improve your sleep quality, we will initiate a full refund."
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h3 className="text-center text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mb-12 italic">Performance Benchmarking</h3>
        <div className="overflow-x-auto rounded-3xl border border-indigo-900/20">
          <table className="w-full text-left border-collapse bg-zinc-950/50">
            <thead>
              <tr className="border-b border-indigo-900/20 bg-indigo-900/5">
                <th className="p-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Metric</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-white italic font-black">NOX V1 Serenity</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-gray-700 font-bold">Generic Retail Mask</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono">
              <tr className="border-b border-indigo-900/10 hover:bg-indigo-900/5 transition">
                <td className="p-6 text-gray-400">Audio Profile</td>
                <td className="p-6 text-indigo-400">3mm (Ultra-Thin)</td>
                <td className="p-6 text-gray-700">12mm (Bulky)</td>
              </tr>
              <tr className="border-b border-indigo-900/10 hover:bg-indigo-900/5 transition">
                <td className="p-6 text-gray-400">Pressure Points</td>
                <td className="p-6 text-indigo-400">Zero (3D Ocular)</td>
                <td className="p-6 text-gray-700">High (Flat Design)</td>
              </tr>
              <tr className="border-b border-indigo-900/10 hover:bg-indigo-900/5 transition">
                <td className="p-6 text-gray-400">Occlusion</td>
                <td className="p-6 text-indigo-400">100% (Tested)</td>
                <td className="p-6 text-gray-700">85-90% (Leaking)</td>
              </tr>
              <tr className="hover:bg-indigo-900/5 transition">
                <td className="p-6 text-gray-400">Guarantee</td>
                <td className="p-6 text-indigo-400">30-Night Performance</td>
                <td className="p-6 text-gray-700">Return Only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-8 uppercase leading-none">
            Upgrade Your <br/>Recovery Hardware.
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-12 font-medium text-lg">
            Batch 04 is currently shipping. Secure your V1 Serenity Interface today and join 12,000+ others in the pursuit of restorative rest.
          </p>
          <a href="#store" className="inline-block bg-white text-black px-12 py-6 font-black rounded-full hover:bg-black hover:text-white transition-all duration-300 uppercase text-sm tracking-widest shadow-2xl">
            Initiate Secure Protocol
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
