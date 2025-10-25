import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">PN'S Admin Panel</h1>
        <nav className="flex gap-3">
          <Link className="btn btn-primary" href="/admin">Dashboard</Link>
          <Link className="btn btn-secondary" href="/login">Login</Link>
        </nav>
      </header>
      <section className="card">
        <div className="card-header">Welcome</div>
        <div className="card-body">
          <p className="text-gray-700">Manage users, restaurants, deliveries, and more with secure role-based access.</p>
        </div>
      </section>
    </main>
  )
}
