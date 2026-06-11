'use client'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={copy} className="text-gray-400 hover:text-brand-600 transition-colors" title="Copiar link">
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  )
}
