"use client"

import { useState } from "react"
import { validerTicket } from "@/modules/events/action-valider"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ValiderTicketPage() {
  const params = useParams()
  const eventId = params.id as string

  const [code, setCode] = useState("")
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const result = await validerTicket(eventId, code)
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else if (result.success) {
      setMessage({ type: 'success', text: result.success })
      setCode("") 
    }
    setLoading(false)
  }

  return (
    <main className="max-w-md mx-auto p-6 mt-10">
      <Link href="/dashboard" className="text-sm text-text-secondary hover:text-primary hover:underline mb-6 inline-block">
        ← Retour au dashboard
      </Link>

      <div className="bg-surface border border-border rounded-xl p-8 shadow-card">
        <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">Valider un ticket</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2 text-text-secondary">
              Code du ticket
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
              className="w-full text-center text-xl font-mono p-3 border border-border rounded-lg uppercase bg-background focus:outline-none focus:border-primary"
              placeholder="EVT-XXXXXX"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors"
          >
            {loading ? "Vérification..." : "Valider l'entrée"}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${
            message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </main>
  )
}