import { useState } from 'react'
import { Sparkles, Plus } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function HealerForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', specialty: '', bio: '', email: '', avatar_url: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const inputClass = 'w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.specialty) {
      setError('Please provide at least name and specialty')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/healers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: 4.9 }),
      })
      if (!res.ok) throw new Error('Failed to create healer')
      setForm({ name: '', specialty: '', bio: '', email: '', avatar_url: '' })
      onCreated?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl border border-white/50 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-800">Add a Healer</h3>
      </div>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className={inputClass} />
        <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Specialty (e.g. Usui Reiki)" className={inputClass} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className={`${inputClass} md:col-span-2`} />
        <input name="avatar_url" value={form.avatar_url} onChange={handleChange} placeholder="Avatar URL (optional)" className={`${inputClass} md:col-span-2`} />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio (optional)" className={`${inputClass} md:col-span-2 min-h-[90px]`} />
        {error && <p className="text-sm text-red-600 md:col-span-2">{error}</p>}
        <div className="md:col-span-2 flex justify-end">
          <button disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-60">
            <Plus className="w-4 h-4" />
            {loading ? 'Adding…' : 'Add Healer'}
          </button>
        </div>
      </form>
    </div>
  )
}
