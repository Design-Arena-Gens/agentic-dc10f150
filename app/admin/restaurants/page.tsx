import Image from 'next/image'
import { Section, Table, Input, Badge } from '@/components/ui'
import { restaurants } from '@/data/restaurants'
import { requireRole } from '@/lib/auth'

export default function RestaurantsPage() {
  requireRole(['ADMIN','RESTAURANT'])
  return (
    <main className="space-y-6">
      <Section title="Restaurants" actions={<div className="w-64"><Input placeholder="Filter by name/cuisine" aria-label="Filter restaurants" /></div>}>
        <Table headers={["Name", "Cuisine", "Status", "Menu Items", "Actions"]}>
          {restaurants.map(r => (
            <tr key={r.id}>
              <td className="font-semibold">{r.name}<div className="text-xs text-gray-500">{r.address}</div></td>
              <td>{r.cuisine}</td>
              <td>{r.isOpen ? <Badge color='success'>Open</Badge> : <Badge color='danger'>Closed</Badge>}</td>
              <td>
                <div className="flex gap-3 overflow-x-auto">
                  {r.menu.map(m => (
                    <div key={m.id} className="min-w-[220px] flex gap-3 items-center">
                      <Image src={m.photo} alt={m.name} width={56} height={56} className="rounded-md object-cover" />
                      <div>
                        <div className="font-medium">{m.name} <span className="text-gray-500">₹{m.price}</span></div>
                        <div className="text-xs text-gray-500 line-clamp-2 max-w-[220px]">{m.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <a className="text-primary underline" href={`/admin/restaurants/${r.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </Table>
      </Section>
    </main>
  )
}
