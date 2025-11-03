import { useEffect, useState } from 'react'
import { Calendar, User } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function BookingForm({ selectedHealer, onBooked, onHealerChange }) {
  const [form, setForm] = useState({ customer_name: '', customer_email: '', healer_id: '', notes: '', scheduled_for: '' })
  const [healers, setHealers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inputClass = 'w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/healers`)
        const data = await res.json()
        setHealers(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (selectedHealer?.id) {
      setForm((f) => ({ ...f, healer_id: selectedHealer.id }))
    }
  }, [selectedHealer])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (name === 'healer_id') {
      const h = healers.find((x) => x.id === value)
      onHealerChange?.(h)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.customer_name || !form.customer_email || !form.healer_id) {
      setError('Please fill your name, email, and select a healer')
      return
    }
    setLoading(true)
    try {
      const payload = { ...form }
      if (!payload.scheduled_for) delete payload.scheduled_for
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create booking')
      setForm({ customer_name: '', customer_email: '', healer_id: selectedHealer?.id || '', notes: '', scheduled_for: '' })
      onBooked?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl border border-white/50 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-800">Book a Session</h3>
      </div>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Your name" className={inputClass} />
        <input name="customer_email" value={form.customer_email} onChange={handleChange} placeholder="Your email" className={inputClass} />
        <select name="healer_id" value={form.healer_id} onChange={handleChange} className={`${inputClass} md:col-span-2`}>
          <option value="">Select a healer…</option>
          {healers.map((h) => (
            <option key={h.id} value={h.id}>{h.name} · {h.specialty}</option>
          ))}
        </select>
        <input type="datetime-local" name="scheduled_for" value={form.scheduled_for} onChange={handleChange} className={inputClass} />
        <input name="notes" value={form.notes} onChange={handleChange} placeholder="Intentions or notes (optional)" className={inputClass} />
        {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
        <div className="md:col-span-2 flex justify-end">
          <button disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-60">
            <User className="w-4 h-4" />
            {loading ? 'Booking…' : 'Book Session'}
          </button>
        </div>
      </form>
    </div>
  )
}
