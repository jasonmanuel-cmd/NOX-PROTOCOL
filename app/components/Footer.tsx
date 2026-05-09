import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-indigo-900/20 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-500">
        <div>
          <h3 className="text-white font-bold mb-4 italic">NOX PROTOCOL</h3>
          <p className="leading-relaxed">
            Human optimization via advanced sleep technology. Designed for the relentless.
          </p>
        </div>
        <div>
          <h4 className="text-gray-300 font-semibold mb-4 text-[10px] uppercase tracking-[0.3em] opacity-50">Support</h4>
          <ul className="space-y-3">
            <li><Link href="/shipping" className="text-gray-500 hover:text-indigo-400 transition-colors duration-300 font-mono text-xs">SHIPPING_PROTOCOL</Link></li>
            <li><Link href="/refunds" className="text-gray-500 hover:text-indigo-400 transition-colors duration-300 font-mono text-xs">REFUND_PROTOCOL</Link></li>
            <li><Link href="/contact" className="text-gray-500 hover:text-indigo-400 transition-colors duration-300 font-mono text-xs">CONTACT_UPLINK</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-300 font-semibold mb-4 text-[10px] uppercase tracking-[0.3em] opacity-50">Connect</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors duration-300 font-mono text-xs">TIKTOK_UPLINK</a></li>
            <li><a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors duration-300 font-mono text-xs">INSTAGRAM_UPLINK</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 text-[10px] uppercase tracking-[0.2em] text-gray-700">
        © 2026 NOX PROTOCOL LABS. All rights reserved.
      </div>
    </footer>
  )
}
