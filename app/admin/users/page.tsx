import { requireRole } from '@/lib/auth'
import { Section, Table, Input, Badge } from '@/components/ui'

const users = [
  { id: '1', username: 'admin', role: 'ADMIN', status: 'active', wallet: 1200 },
  { id: '2', username: 'megha', role: 'USER', status: 'active', wallet: 300 },
  { id: '3', username: 'yash', role: 'DELIVERY', status: 'inactive', wallet: 0 },
  { id: '4', username: 'amrit', role: 'RESTAURANT', status: 'active', wallet: 500 },
]

export default function UsersPage() {
  requireRole(['ADMIN'])
  return (
    <main className="space-y-6">
      <Section title="User Management" actions={<div className="w-64"><Input placeholder="Search username" aria-label="Search users" /></div>}>
        <Table headers={["Username", "Role", "Status", "Wallet", "Actions"]}>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td><span className="font-medium">{u.role}</span></td>
              <td>{u.status === 'active' ? <Badge color='success'>Active</Badge> : <Badge color='warning'>Inactive</Badge>}</td>
              <td>₹{u.wallet}</td>
              <td>
                <a className="text-primary underline" href={`/profile/${u.username}`}>View profile</a>
              </td>
            </tr>
          ))}
        </Table>
      </Section>
    </main>
  )
}
