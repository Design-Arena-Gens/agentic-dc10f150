import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signSession } from '@/lib/auth'

const users = [
  { id: '1', username: 'admin', password: 'admin', role: 'ADMIN' },
  { id: '2', username: 'user', password: 'user', role: 'USER' },
  { id: '3', username: 'resto', password: 'resto', role: 'RESTAURANT' },
  { id: '4', username: 'deli', password: 'deli', role: 'DELIVERY' }
] as const

export async function POST(req: Request) {
  const body = await req.json()
  const found = users.find(u => u.username === body.username && u.password === body.password)
  if (!found) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = signSession({ userId: found.id, username: found.username, role: found.role as any })
  const isProd = process.env.NODE_ENV === 'production'
  cookies().set('token', token, { httpOnly: true, sameSite: 'lax', secure: isProd, path: '/' })
  return NextResponse.json({ ok: true })
}
