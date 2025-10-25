import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: "PN'S Admin Panel",
  description: "Admin panel for PN'S food delivery"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  )
}
