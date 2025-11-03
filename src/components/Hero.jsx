import { Lotus, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-8 border border-white/60">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{background: 'radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.25), transparent 35%), radial-gradient(circle at 50% 100%, rgba(99,102,241,0.25), transparent 40%)'}} />
      <div className="relative flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/60 text-purple-700 text-sm mb-3">
            <Sparkles className="w-4 h-4" /> Reiki Booking
          </div>
          <h1 className="font-bold text-3xl md:text-4xl text-gray-800 leading-tight">
            Find your healer and book a calming reiki session
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Discover compassionate practitioners, read their specialties, and reserve your next energy healing session in seconds.
          </p>
        </div>
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center shadow-sm">
          <Lotus className="w-16 h-16 text-purple-600" />
        </div>
      </div>
    </div>
  )
}
