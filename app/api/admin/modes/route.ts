import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'

// Simple in-memory store (resets on redeploy)
let modes = { food: true, grocery: true, delivery: true }

export async function GET() {
  try { requireRole(['ADMIN']) } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  return NextResponse.json(modes)
}

export async function POST(req: Request) {
  try { requireRole(['ADMIN']) } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const body = await req.json()
  modes = { ...modes, ...body }
  return NextResponse.json(modes)
}
