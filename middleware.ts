import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = req.cookies.get('token')?.value
    if (!token) return NextResponse.redirect(new URL('/login', req.url))
    try {
      jwt.verify(token, JWT_SECRET)
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
