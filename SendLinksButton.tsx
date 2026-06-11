'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'

type Aprovador = { id: string; nome: string; email: string; whatsapp?: string | null }

export function SendLinksButton({
  conteudoId,
  aprovadores,
  linkAprovacao,
}: {
  conteudoId: string
  aprovadores: Aprovador[]
  linkAprovacao: string
}) {
  const [loading, setLoading] = useState(false)

  async function enviar() {
    setLoading(true)
    try {
      const res = await fetch('/api/conteudos/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudoId }),
      })
      if (!res.ok) throw new Error()
      toast.success('Links enviados por email!')
    } catch {
      toast.error('Erro ao enviar links')
    } finally {
      setLoading(false)
    }
  }

  const whatsappLinks = aprovadores.filter(a => a.whatsapp)

  return (
    <div className="flex gap-2 flex-wrap">
      <button onClick={enviar} disabled={loading} className="btn text-xs">
        <Send size={13} />
        {loading ? 'Enviando...' : 'Enviar por email'}
      </button>
      {whatsappLinks.map(a => (
        <a
          key={a.id}
          href={`https://wa.me/${a.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${a.nome}! Segue o link para aprovar o conteúdo: ${linkAprovacao}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn text-xs"
        >
          WhatsApp — {a.nome}
        </a>
      ))}
    </div>
  )
}
