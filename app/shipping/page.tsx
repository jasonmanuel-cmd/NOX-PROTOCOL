export default function Shipping() {
  return (
    <main className="max-w-2xl mx-auto py-20 px-6 text-gray-400 text-sm leading-loose">
      <h1 className="text-3xl font-black italic text-white mb-8 tracking-tighter">SHIPPING PROTOCOL</h1>
      
      <section className="mb-8">
        <h2 className="text-indigo-400 font-bold mb-2 uppercase tracking-widest text-xs">01. Processing</h2>
        <p>Orders are processed within 24-48 hours. As an optimization lab, we ensure every unit is vetted before dispatch.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-indigo-400 font-bold mb-2 uppercase tracking-widest text-xs">02. Transit Times</h2>
        <p>Due to high demand for the V1 and CORE units, standard shipping to the US takes 7-12 business days. International transit may take 10-15 business days.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-indigo-400 font-bold mb-2 uppercase tracking-widest text-xs">03. Tracking</h2>
        <p>A tracking number will be issued to your registered email immediately upon dispatch. High-priority tracking is standard on all NOX orders.</p>
      </section>

      <a href="/" className="inline-block mt-8 text-indigo-500 font-bold hover:underline">← BACK TO TERMINAL</a>
    </main>
  )
}
