"use client"
import { Section, Table, Input } from '@/components/ui'
import { useParams } from 'next/navigation'

const tx = [
  { id: 't1', type: 'CREDIT', amount: 500, date: '2025-10-01' },
  { id: 't2', type: 'DEBIT', amount: 199, date: '2025-10-03' },
  { id: 't3', type: 'DEBIT', amount: 129, date: '2025-10-05' }
]

export default function ProfilePage() {
  const params = useParams<{ username: string }>()
  const username = params.username

  const whatsappUrl = (amount: number) => `https://wa.me/918434805818?text=${encodeURIComponent(`Hi, I'd like to add ₹${amount} to my PN'S wallet. Username: ${username}`)}`
  const [amount, setAmount] = (require('react') as typeof import('react')).useState(200)

  return (
    <main className="space-y-6">
      <Section title={`Profile: ${username}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="card">
              <div className="card-header">Wallet</div>
              <div className="card-body space-y-3">
                <div className="flex gap-2 items-end">
                  <div className="flex-1"><Input label="Amount (₹)" id="amount" type="number" min={1} value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0'))} aria-label="Top-up amount" /></div>
                  <a className="btn btn-primary" href={whatsappUrl(amount)} target="_blank" rel="noopener noreferrer" aria-label="Add balance via WhatsApp">Add via WhatsApp</a>
                </div>
                <p className="text-xs text-gray-500">This will open WhatsApp with a pre-filled message to top-up your wallet.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">Transaction History</div>
              <div className="card-body">
                <Table headers={["ID","Type","Amount","Date"]}>
                  {tx.map(t => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.type}</td>
                      <td>₹{t.amount}</td>
                      <td>{t.date}</td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">Delivery OTP Verification</div>
              <div className="card-body space-y-2">
                <p className="text-sm text-gray-700">Share the OTP with the delivery partner only upon receiving your order.</p>
                <Input aria-label="Enter OTP" placeholder="Enter OTP" />
                <button className="btn btn-secondary w-full">Verify</button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
