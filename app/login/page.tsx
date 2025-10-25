"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui'

export default function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) router.push('/admin')
  }

  return (
    <main className="max-w-md mx-auto card">
      <div className="card-header">Sign in</div>
      <form className="card-body space-y-4" onSubmit={onSubmit}>
        <Input id="username" label="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <Input id="password" label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn btn-primary w-full" type="submit">Sign in</button>
      </form>
    </main>
  )
}
