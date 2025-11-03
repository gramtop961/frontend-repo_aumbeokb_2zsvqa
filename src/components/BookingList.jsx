import { useEffect, useState } from 'react'
import { Clock, User, Calendar } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function BookingList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/bookings`)
        const data = await res.json()
        if (mounted) setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [refreshKey])

  if (loading) return <p className="text-gray-500">Loading bookings…</p>

  if (!items.length) return <p className="text-gray-500">No bookings yet. Your confirmed sessions will appear here.</p>

  return (
    <div className="space-y-4">
      {items.map((b) => (
        <div key={b.id} className="bg-white/70 backdrop-blur rounded-xl border border-white/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">{b.customer_name}</div>
                <div className="text-sm text-gray-600">with {b?.healer?.name || 'Healer'} — {b?.healer?.specialty || ''}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{b.scheduled_for ? new Date(b.scheduled_for).toLocaleString() : 'Anytime'}</span>
              <Clock className="w-4 h-4 ml-3" />
              <span>{new Date(b.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
