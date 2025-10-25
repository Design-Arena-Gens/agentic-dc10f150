import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { Section, Toggle } from '@/components/ui'

async function getModes() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + '/api/admin/modes' : 'http://localhost:3000/api/admin/modes', { cache: 'no-store' })
  if (!res.ok) return { food: true, grocery: true, delivery: true }
  return res.json()
}

export default async function AdminDashboard() {
  requireRole(['ADMIN'])
  const modes = await getModes()

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav className="flex gap-2">
          <Link className="btn btn-primary" href="/admin/users">Users</Link>
          <Link className="btn btn-primary" href="/admin/restaurants">Restaurants</Link>
          <Link className="btn btn-primary" href="/admin/delivery">Delivery Partners</Link>
          <Link className="btn btn-secondary" href="/admin/chat">Public Chat</Link>
        </nav>
      </header>

      <Section title="Service Modes" actions={<span className="text-xs text-gray-500">Toggle availability</span>}>
        {/* Client subcomponent to mutate modes */}
        {/* @ts-expect-error Async Server Component boundary */}
        <ModesClient initialModes={modes} />
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Section title="Users">
          <p className="text-sm text-gray-600 mb-3">Manage users and roles</p>
          <Link className="btn btn-primary" href="/admin/users">Open</Link>
        </Section>
        <Section title="Restaurants">
          <p className="text-sm text-gray-600 mb-3">View and update restaurant details</p>
          <Link className="btn btn-primary" href="/admin/restaurants">Open</Link>
        </Section>
        <Section title="Delivery Partners">
          <p className="text-sm text-gray-600 mb-3">Track performance and payments</p>
          <Link className="btn btn-primary" href="/admin/delivery">Open</Link>
        </Section>
      </div>
    </main>
  )
}

// Client component to handle toggle interactions
function ModesClient({ initialModes }: { initialModes: { food: boolean; grocery: boolean; delivery: boolean } }) {
  'use client'
  const [modes, setModes] = require('react').useState(initialModes)

  async function toggle(key: 'food'|'grocery'|'delivery') {
    const next = { ...modes, [key]: !modes[key] }
    setModes(next)
    await fetch('/api/admin/modes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) })
  }

  const { createElement } = require('react')
  return createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-4' },
    createElement(Toggle, { label: 'Food', checked: modes.food, description: 'Restaurant orders', onChange: () => toggle('food') }),
    createElement(Toggle, { label: 'Grocery', checked: modes.grocery, description: 'Grocery deliveries', onChange: () => toggle('grocery') }),
    createElement(Toggle, { label: 'Delivery', checked: modes.delivery, description: 'Parcel delivery', onChange: () => toggle('delivery') }),
  )
}
