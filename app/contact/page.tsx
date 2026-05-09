export default function Contact() {
  return (
    <main className="max-w-2xl mx-auto py-20 px-6 text-gray-400 text-sm leading-loose text-center">
      <h1 className="text-3xl font-black italic text-white mb-8 tracking-tighter uppercase">Support Terminal</h1>
      
      <p className="mb-12">System technicians are available 24/7 for deployment support and order inquiries.</p>

      <div className="bg-zinc-900 border border-indigo-900/30 p-12 rounded-3xl">
        <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-[0.4em] mb-2">Direct Uplink</h2>
        <p className="text-2xl font-black text-white italic tracking-tighter">support@noxprotocol.com</p>
      </div>

      <p className="mt-12 text-xs text-gray-600 italic">Expected response latency: &lt; 4 hours.</p>

      <a href="/" className="inline-block mt-12 text-indigo-500 font-bold hover:underline">← BACK TO TERMINAL</a>
    </main>
  )
}
