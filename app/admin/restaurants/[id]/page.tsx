"use client"
import { useParams } from 'next/navigation'
import { restaurants } from '@/data/restaurants'
import { Section, Input, Textarea, Badge } from '@/components/ui'
import Image from 'next/image'
import { useState } from 'react'

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>()
  const found = restaurants.find(r => r.id === id)
  const [name, setName] = useState(found?.name || '')
  const [cuisine, setCuisine] = useState(found?.cuisine || '')
  const [isOpen, setIsOpen] = useState(found?.isOpen || false)

  if (!found) return <div className="text-red-600">Restaurant not found</div>

  return (
    <main className="space-y-6">
      <Section title={`Restaurant: ${found.name}`} actions={<span className="text-xs text-gray-500">ID: {found.id}</span>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="card">
              <div className="card-header">Details</div>
              <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
                <Input label="Cuisine" value={cuisine} onChange={e=>setCuisine(e.target.value)} />
                <div>
                  <span className="label">Status</span>
                  <button className={`btn ${isOpen ? 'btn-primary' : 'btn-secondary'}`} onClick={()=>setIsOpen(v=>!v)}>{isOpen ? 'Open' : 'Closed'}</button>
                </div>
                <div>
                  <div className="label">Location</div>
                  <div className="text-sm text-gray-700">Lat: {found.lat}, Lng: {found.lng}</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">Menu</div>
              <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
                {found.menu.map(m => (
                  <div key={m.id} className="flex gap-3">
                    <Image src={m.photo} alt={m.name} width={80} height={80} className="rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="font-medium">{m.name} <span className="text-gray-500">₹{m.price}</span></div>
                      <Textarea value={m.description} aria-label={`${m.name} description`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">Operational</div>
              <div className="card-body space-y-2">
                <div>{isOpen ? <Badge color='success'>Accepting Orders</Badge> : <Badge color='danger'>Not Accepting Orders</Badge>}</div>
                <button className="btn btn-primary w-full">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
