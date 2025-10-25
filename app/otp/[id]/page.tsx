"use client"
import { Section, Input } from '@/components/ui'
import { useParams } from 'next/navigation'

export default function OTPPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <main className="space-y-6">
      <Section title={`OTP Verification for Partner ${id}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="font-semibold">Instructions for Customer</h2>
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
              <li>Receive your order and check items.</li>
              <li>Ask partner to show OTP on their app.</li>
              <li>Enter the OTP here to confirm delivery.</li>
            </ol>
            <Input aria-label="Delivery OTP" placeholder="Enter 6-digit OTP" />
            <button className="btn btn-primary">Confirm Delivery</button>
          </div>
          <div className="space-y-3">
            <h2 className="font-semibold">Instructions for Delivery Partner</h2>
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
              <li>Provide the OTP to the customer upon arrival.</li>
              <li>Mark order as delivered after OTP confirmation.</li>
              <li>Ensure correct distance is recorded for payout.</li>
            </ol>
          </div>
        </div>
      </Section>
    </main>
  )
}
