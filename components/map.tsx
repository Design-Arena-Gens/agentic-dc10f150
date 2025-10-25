"use client"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export function MapContainer({ partners }: { partners: { id: string, name: string, location: { lat: number, lng: number } }[] }) {
  const position = [28.6139, 77.2090] as [number, number]
  return (
    <div className="h-[320px] w-full rounded-xl overflow-hidden">
      <LeafletMap center={position} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {partners.map(p => (
          <Marker key={p.id} position={[p.location.lat, p.location.lng] as [number, number]}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{p.name}</div>
                <div>ID: {p.id}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  )
}
