"use client"
import { useState } from 'react'
import { Section, Input } from '@/components/ui'

interface Message { id: string; user: string; text: string; time: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'admin', text: 'Welcome to PN\'S public chat. Be respectful.', time: '10:00' },
    { id: '2', user: 'megha', text: 'Hi everyone!', time: '10:02' }
  ])
  const [text, setText] = useState('')

  function send() {
    if (!text.trim()) return
    setMessages(prev => [...prev, { id: String(prev.length+1), user: 'admin', text, time: new Date().toLocaleTimeString() }])
    setText('')
  }

  function moderate(id: string) {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  return (
    <main className="space-y-6">
      <Section title="Public Chat" actions={<span className="text-xs text-gray-500">Admin can remove messages</span>}>
        <div className="h-80 overflow-y-auto border border-gray-200 rounded-md p-3 bg-white" aria-live="polite">
          {messages.map(m => (
            <div key={m.id} className="flex items-start gap-2 py-1">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary" aria-hidden>{m.user[0]?.toUpperCase()}</div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">{m.user} • {m.time}</div>
                <div className="text-sm text-gray-900">{m.text}</div>
              </div>
              <button className="text-red-600 text-xs underline" aria-label={`Remove message ${m.id}`} onClick={()=>moderate(m.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <div className="flex-1"><Input aria-label="Message" placeholder="Type a message" value={text} onChange={e=>setText(e.target.value)} /></div>
          <button className="btn btn-primary" onClick={send}>Send</button>
        </div>
      </Section>
    </main>
  )
}
