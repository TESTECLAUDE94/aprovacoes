'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard, Users, CheckSquare, Settings, LogOut, Dot
} from 'lucide-react'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users },
  { href: '/dashboard/aprovacoes', label: 'Aprovações', icon: CheckSquare },
  { href: '/dashboard/configuracoes', label: 'Configurações', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const cor = (session?.user as any)?.agencyColor || '#534AB7'
  const agencia = (session?.user as any)?.agencyName || 'Minha Agência'

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: cor }} />
          <span className="font-semibold text-sm text-gray-900 truncate">{agencia}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 pl-4">Aprova Aí</p>
      </div>
      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'font-medium text-brand-800 bg-brand-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <div className="px-3 py-2 mb-1">
          <p className="text-xs font-medium text-gray-900 truncate">{session?.user?.name}</p>
          <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={15} />
          Sair
        </button>
      </div>
    </aside>
  )
}
