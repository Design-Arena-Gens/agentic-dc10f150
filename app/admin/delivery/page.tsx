"use client"
import { Section, Table, Input, Badge } from '@/components/ui'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

const MapContainer = dynamic(() => import('@/components/map').then(m => m.MapContainer), { ssr: false })

const partners = [
  { id: 'd1', name: 'Ravi', status: 'available', completed: 124, rating: 4.7, location: { lat:28.6139, lng:77.2090 }, balance: 820 },
  { id: 'd2', name: 'Priya', status: 'busy', completed: 98, rating: 4.5, location: { lat:28.5355, lng:77.3910 }, balance: 560 },
  { id: 'd3', name: 'Aman', status: 'offline', completed: 56, rating: 4.2, location: { lat:28.7041, lng:77.1025 }, balance: 120 },
]

export default function DeliveryPage() {
  const [rate, setRate] = useState(8) // Rs per km
  const [distanceKm, setDistanceKm] = useState(5)
  const payout = useMemo(() => Math.round(rate * distanceKm), [rate, distanceKm])

  return (
    <main className="space-y-6">
      <Section title="Delivery Partners" actions={<div className="w-64"><Input placeholder="Search partner" /></div>}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapContainer partners={partners} />
          </div>
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">Payment Calculator</div>
              <div className="card-body space-y-3">
                <label className="label">Rate (₹ per km)</label>
                <input className="input" type="number" min={1} value={rate} onChange={e=>setRate(parseInt(e.target.value||'0'))} />
                <label className="label">Distance (km)</label>
                <input className="input" type="number" min={0} value={distanceKm} onChange={e=>setDistanceKm(parseFloat(e.target.value||'0'))} />
                <div className="text-lg font-semibold">Payout: ₹{payout}</div>
                <p className="text-xs text-gray-500">Distance uses coordinates (no Google Maps). Adjust as needed.</p>
              </div>
            </div>
          </div>
        </div>

        <Table headers={["Name", "Status", "Completed", "Rating", "Balance", "Actions"]}>
          {partners.map(p => (
            <tr key={p.id}>
              <td className="font-medium">{p.name}</td>
              <td>{p.status === 'available' ? <Badge color='success'>Available</Badge> : p.status==='busy' ? <Badge color='warning'>Busy</Badge> : <Badge color='danger'>Offline</Badge>}</td>
              <td>{p.completed}</td>
              <td>{p.rating}</td>
              <td>₹{p.balance}</td>
              <td><a href={`/otp/${p.id}`} className="text-primary underline">Verify OTP</a></td>
            </tr>
          ))}
        </Table>
      </Section>
    </main>
  )
}
