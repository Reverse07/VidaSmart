'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { Zap, PawPrint, Gamepad2, Plus, Check, Mouse } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/store/cartStore'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_price: number
  category: string
  description: string
  is_active: boolean
  images?: string[]
}

const CAT_STYLE: Record<string, { bg: string; icon: React.ReactElement; accent: string; dark: boolean }> = {
  gaming:   { bg: '#1a0f2e', icon: <Gamepad2 size={36} color="#A78BFA" />, accent: '#8B5CF6', dark: true },
  tech:     { bg: '#EFF6FF', icon: <Zap size={36} color="#2563EB" />,      accent: '#2563EB', dark: false },
  mascotas: { bg: '#FFF7ED', icon: <PawPrint size={36} color="#D97706" />, accent: '#D97706', dark: false },
}

const FILTERS = [
  { label: 'Todo',       value: null,       accent: '#080808' },
  { label: 'Gaming',     value: 'gaming',   accent: '#8B5CF6' },
  { label: 'Tecnología', value: 'tech',     accent: '#2563EB' },
  { label: 'Mascotas',   value: 'mascotas', accent: '#D97706' },
]

function ProductCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const style = CAT_STYLE[p.category] ?? CAT_STYLE.tech
  const discount = p.compare_price ? Math.round((1 - p.price / p.compare_price) * 100) : 0

  return (
    <Link href={`/productos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{
        background: style.dark ? '#0f0a1a' : '#fff',
        border: `1px solid ${style.dark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
        borderRadius: '24px', overflow: 'hidden',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = style.dark
            ? '0 24px 48px rgba(139,92,246,0.20)'
            : '0 24px 48px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{
          background: style.bg, aspectRatio: '1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {style.dark && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.15), transparent 70%)',
              pointerEvents: 'none',
            }} />
          )}
          {p.images?.[0] ? (
            <img src={p.images[0]} alt={p.name} style={{
              width: '80%', height: '80%', objectFit: 'contain',
              position: 'relative', zIndex: 1,
              filter: style.dark ? 'drop-shadow(0 8px 16px rgba(139,92,246,0.3))' : 'none',
            }} />
          ) : (
            <div style={{
              width: '80px', height: '80px',
              background: style.dark ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.8)',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              border: style.dark ? '1px solid rgba(139,92,246,0.3)' : 'none',
              position: 'relative', zIndex: 1,
            }}>{style.icon}</div>
          )}
          {discount > 0 && (
            <div style={{
              position: 'absolute', top: '14px', right: '14px',
              background: style.accent, color: '#fff',
              fontFamily: "'DM Mono', monospace", fontSize: '10px',
              padding: '4px 8px', borderRadius: '100px', zIndex: 2,
            }}>-{discount}%</div>
          )}
          {style.dark && (
            <div style={{
              position: 'absolute', bottom: '14px', left: '14px',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: '100px', padding: '3px 10px',
              fontFamily: "'DM Mono', monospace", fontSize: '9px',
              color: '#C4B5FD', letterSpacing: '0.08em',
              backdropFilter: 'blur(8px)', zIndex: 2,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <Mouse size={9} color="#A78BFA" /> PERIFÉRICO
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '20px' }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: style.dark ? '#7C3AED' : '#A09890', marginBottom: '6px',
          }}>{p.category}</p>
          <h3 style={{
            fontSize: '15px', fontWeight: 600, lineHeight: 1.3,
            color: style.dark ? '#F3F0FF' : '#080808',
            marginBottom: '6px', fontFamily: "'DM Sans', sans-serif",
          }}>{p.name}</h3>
          <p style={{
            fontSize: '12px', color: style.dark ? '#6B5B8A' : '#7A7269',
            marginBottom: '16px', lineHeight: 1.5,
            fontFamily: "'DM Sans', sans-serif",
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{p.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px',
                color: style.dark ? '#F3F0FF' : '#080808',
              }}>S/{p.price / 100}</span>
              {p.compare_price && (
                <span style={{
                  fontSize: '12px',
                  color: style.dark ? '#4A3A6A' : '#C8C3BB',
                  textDecoration: 'line-through',
                  fontFamily: "'DM Sans', sans-serif",
                }}>S/{p.compare_price / 100}</span>
              )}
            </div>
            <button
              onClick={e => {
                e.preventDefault()
                addItem({ id: p.id, name: p.name, price: p.price / 100, image: p.images?.[0] ?? '', quantity: 1, slug: p.slug })
                setAdded(true)
                setTimeout(() => setAdded(false), 1800)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: added ? '#16A34A' : style.accent,
                color: '#fff', border: 'none',
                borderRadius: '100px', padding: '9px 16px',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: !added && style.dark ? '0 4px 14px rgba(139,92,246,0.4)' : 'none',
              }}
            >
              {added ? <><Check size={12} /> Listo</> : <><Plus size={12} /> Agregar</>}
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

function SkeletonCard({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{
      borderRadius: '24px', overflow: 'hidden',
      border: `1px solid ${dark ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
      background: dark ? '#0f0a1a' : '#fff',
    }}>
      <div style={{
        aspectRatio: '1',
        background: dark
          ? 'linear-gradient(90deg,#1a1030 25%,#251845 50%,#1a1030 75%)'
          : 'linear-gradient(90deg,#F2F1EF 25%,#E8E6E1 50%,#F2F1EF 75%)',
        backgroundSize: '800px 100%',
        animation: 'shimmer 1.4s infinite',
      }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[40, 80, 60].map(w => (
          <div key={w} style={{
            height: '13px', width: `${w}%`, borderRadius: '6px',
            background: dark ? '#1a1030' : '#F2F1EF',
            animation: 'shimmer 1.4s infinite',
          }} />
        ))}
      </div>
    </div>
  )
}

function Catalogo() {
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function load() {
      let q = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
      if (cat === 'tech' || cat === 'mascotas' || cat === 'gaming') q = q.eq('category', cat)
      const { data } = await q
      setProducts(data ?? [])
      setLoading(false)
    }
    load()
  }, [cat])

  const isDark = cat === 'gaming'

  const TITLE: Record<string, string> = {
    gaming:   'PC GAMING\nPERIFÉRICOS',
    tech:     'TECNOLOGÍA\nSMART HOME',
    mascotas: 'MASCOTAS\nPET SMART',
  }

  return (
    <div style={{ background: isDark ? '#080610' : '#FAFAF8', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: '80px 48px 48px',
        borderBottom: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
        background: isDark
          ? 'linear-gradient(180deg, #0f0a1a 0%, #080610 100%)'
          : 'transparent',
        position: 'relative', overflow: 'hidden',
      }}>
        {isDark && (
          <div style={{
            position: 'absolute', top: '-100px', right: '-100px',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
        )}
        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: '11px',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: isDark ? '#7C3AED' : '#A09890', marginBottom: '16px',
        }}>
          {loading ? '...' : `${products.length} productos disponibles`}
        </p>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(52px, 8vw, 96px)',
          lineHeight: 0.88, marginBottom: '32px',
          color: isDark ? '#F3F0FF' : '#080808',
          whiteSpace: 'pre-line',
        }}>
          {cat ? TITLE[cat] : 'TODOS LOS\nPRODUCTOS'}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FILTERS.map(f => {
            const active = cat === f.value
            return (
              <Link key={f.label} href={f.value ? `/productos?cat=${f.value}` : '/productos'} style={{
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '10px 20px', borderRadius: '100px', textDecoration: 'none',
                border: `1.5px solid ${active ? f.accent : isDark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
                background: active ? f.accent : 'transparent',
                color: active ? '#fff' : isDark ? '#9F7AEA' : '#A09890',
                transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: active && f.value === 'gaming' ? '0 4px 14px rgba(139,92,246,0.35)' : 'none',
              }}>{f.label}</Link>
            )
          })}
        </div>
      </div>

      {/* GRID */}
      <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} dark={isDark} />)
          : products.map(p => <ProductCard key={p.slug} p={p} />)
        }
      </div>
    </div>
  )
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 48px' }}>Cargando...</div>}>
      <Catalogo />
    </Suspense>
  )
}