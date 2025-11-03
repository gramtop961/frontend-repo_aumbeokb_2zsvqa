import { useEffect, useState } from 'react'
import { User, Star } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function HealerGrid({ refreshKey, onSelect }) {
  const [healers, setHealers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/healers`)
        const data = await res.json()
        if (mounted) setHealers(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [refreshKey])

  if (loading) {
    return <div className="animate-pulse text-gray-500">Loading healers…</div>
  }

  if (!healers.length) {
    return <p className="text-gray-500">No healers yet. Add the first one above.</p>
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {healers.map((h) => (
        <button
          key={h.id}
          onClick={() => onSelect?.(h)}
          className="text-left group bg-white/70 backdrop-blur border border-white/60 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition"
        >
          <div className="flex items-center gap-4">
            {h.avatar_url ? (
              <img src={h.avatar_url} alt={h.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <User className="w-6 h-6 text-purple-700" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800 group-hover:text-purple-700 transition">{h.name}</h4>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="text-sm font-medium">{(h.rating || 4.9).toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{h.specialty}</p>
            </div>
          </div>
          {h.bio && <p className="mt-3 text-sm text-gray-600 line-clamp-2">{h.bio}</p>}
        </button>
      ))}
    </div>
  )
}
