import { useState } from 'react'
import Hero from './components/Hero'
import HealerForm from './components/HealerForm'
import HealerGrid from './components/HealerGrid'
import BookingForm from './components/BookingForm'
import BookingList from './components/BookingList'

function App() {
  const [refreshHealersKey, setRefreshHealersKey] = useState(0)
  const [refreshBookingsKey, setRefreshBookingsKey] = useState(0)

  const onHealerCreated = () => setRefreshHealersKey((k) => k + 1)
  const onBookingCreated = () => setRefreshBookingsKey((k) => k + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <Hero />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HealerForm onCreated={onHealerCreated} />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Our Healers</h3>
              <HealerGrid refreshKey={refreshHealersKey} />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <BookingForm onCreated={onBookingCreated} />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
              <BookingList refreshKey={refreshBookingsKey} />
            </div>
          </div>
        </div>

        <footer className="pt-6 text-center text-gray-500 text-sm">✨ May your session bring peace and balance</footer>
      </div>
    </div>
  )
}

export default App
