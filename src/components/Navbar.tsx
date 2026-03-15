'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

export default function Navbar() {
  const itemCount = useCartStore(state => state.itemCount)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@400&display=swap');`}</style>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e8e6e1',
        fontFamily: 'DM Sans, sans-serif'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* LOGO */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', letterSpacing: '0.02em', color: '#080808' }}>
              VIDA<span style={{ color: '#2563eb' }}>SMART</span>
            </div>
          </Link>

          {/* NAV LINKS — Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[
              { label: 'Productos', href: '/productos' },
              { label: 'Tecnología', href: '/productos?cat=tech' },
              { label: 'Mascotas', href: '/productos?cat=mascotas' },
            ].map(link => (
              <Link key={link.label} href={link.href} style={{
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6b6760',
                transition: 'color 0.2s',
                fontFamily: 'DM Sans, sans-serif'
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#080808'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b6760'}
              >{link.label}</Link>
            ))}
          </div>

          {/* CARRITO */}
          <Link href="/carrito" style={{ position: 'relative', textDecoration: 'none', color: '#080808', padding: '8px' }}>
            <ShoppingCart size={22} />
            {itemCount() > 0 && (
              <div style={{
                position: 'absolute', top: 0, right: 0,
                background: '#2563eb', color: '#fff',
                fontSize: '10px', fontWeight: 700,
                width: '18px', height: '18px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'DM Mono'
              }}>
                {itemCount()}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </>
  )
}