'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, PawPrint, Gamepad2, Plus, Check, Mouse, Keyboard, Headset, Monitor, Sofa, SquareMousePointer, MessageCircle } from 'lucide-react'
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
  subcategory?: string
  description: string
  is_active: boolean
  images?: string[]
}

const CAT_STYLE: Record<string, { bg: string; icon: React.ReactElement; accent: string; dark: boolean }> = {
  gaming:   { bg: '#1a0f2e', icon: <Gamepad2 size={36} color="#A78BFA" />, accent: '#8B5CF6', dark: true },
  tech:     { bg: '#EFF6FF', icon: <Zap size={36} color="#2563EB" />,      accent: '#2563EB', dark: false },
  mascotas: { bg: '#FFF7ED', icon: <PawPrint size={36} color="#D97706" />, accent: '#D97706', dark: false },
}

// Subcategory filters for gaming
const GAMING_SUBCATEGORIES = [
  { label: 'Todo Gaming', value: null, icon: <Gamepad2 size={12} />, accent: '#8B5CF6' },
  { label: 'Mice', value: 'mice', icon: <Mouse size={12} />, accent: '#8B5CF6' },
  { label: 'Teclados', value: 'teclados', icon: <Keyboard size={12} />, accent: '#A78BFA' },
  { label: 'Headsets', value: 'headsets', icon: <Headset size={12} />, accent: '#C084FC' },
  { label: 'Mousepads', value: 'mousepads', icon: <SquareMousePointer size={12} />, accent: '#D946EF' },
  { label: 'Sillas', value: 'sillas', icon: <Sofa size={12} />, accent: '#EC489A' },
  { label: 'Monitores', value: 'monitores', icon: <Monitor size={12} />, accent: '#F43F5E' },
]

const FILTERS = [
  { label: 'Todo',       value: null,       accent: '#080808' },
  { label: 'Gaming',     value: 'gaming',   accent: '#8B5CF6' },
  { label: 'Tecnología', value: 'tech',     accent: '#2563EB' },
  { label: 'Mascotas',   value: 'mascotas', accent: '#D97706' },
]

const WHATSAPP_LINK = 'https://wa.me/51992550179?text=Hola%20VidaSmart%2C%20me%20interesa%20un%20producto'

function ProductCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const style = CAT_STYLE[p.category] ?? CAT_STYLE.tech
  const discount = p.compare_price ? Math.round((1 - p.price / p.compare_price) * 100) : 0

  const subcatInfo = p.subcategory && GAMING_SUBCATEGORIES.find(sc => sc.value === p.subcategory)

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
          {style.dark && subcatInfo && (
            <div style={{
              position: 'absolute', bottom: '14px', left: '14px',
              background: `${subcatInfo.accent}20`,
              border: `1px solid ${subcatInfo.accent}40`,
              borderRadius: '100px', padding: '3px 10px',
              fontFamily: "'DM Mono', monospace", fontSize: '9px',
              color: subcatInfo.accent, letterSpacing: '0.08em',
              backdropFilter: 'blur(8px)', zIndex: 2,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {subcatInfo.icon} {subcatInfo.label}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '20px' }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: style.dark ? '#7C3AED' : '#A09890', marginBottom: '6px',
          }}>
            {p.category === 'gaming' && p.subcategory 
              ? `${p.category} / ${GAMING_SUBCATEGORIES.find(sc => sc.value === p.subcategory)?.label || p.subcategory}`
              : p.category}
          </p>
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
  const subcat = searchParams.get('subcat')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function load() {
      let q = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
      
      if (cat === 'tech' || cat === 'mascotas' || cat === 'gaming') {
        q = q.eq('category', cat)
      }
      
      if (cat === 'gaming' && subcat && subcat !== 'all') {
        q = q.eq('subcategory', subcat)
      }
      
      const { data } = await q
      setProducts(data ?? [])
      setLoading(false)
    }
    load()
  }, [cat, subcat])

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

        {/* Main Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: cat === 'gaming' ? '20px' : '0' }}>
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

        {/* Gaming Subcategory Filters */}
        {cat === 'gaming' && (
          <div style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            paddingTop: '16px',
            borderTop: `1px solid ${isDark ? 'rgba(139,92,246,0.1)' : '#E2DED8'}`,
            marginTop: '8px',
          }}>
            {GAMING_SUBCATEGORIES.map(sub => {
              const isActive = (sub.value === null && !subcat) || (sub.value !== null && subcat === sub.value)
              return (
                <Link
                  key={sub.label}
                  href={sub.value ? `/productos?cat=gaming&subcat=${sub.value}` : '/productos?cat=gaming'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'DM Mono', monospace", fontSize: '10px',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '7px 14px', borderRadius: '100px', textDecoration: 'none',
                    border: `1.5px solid ${isActive ? sub.accent : isDark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
                    background: isActive ? `${sub.accent}20` : 'transparent',
                    color: isActive ? sub.accent : isDark ? '#9F7AEA' : '#A09890',
                    transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {sub.icon}
                  {sub.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* YAPE PROMO SECTION - con imagen de Yape */}
        <div style={{
          marginTop: '48px',
          padding: '24px 28px',
          background: isDark 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #0f0a1a 100%)'
            : 'linear-gradient(135deg, #FFF9E8 0%, #FFF4E0 100%)',
          borderRadius: '20px',
          border: `1px solid ${isDark ? 'rgba(139,92,246,0.2)' : '#FFE4B5'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: isDark ? '#25D366' : '#fff',
              borderRadius: '60px',
              padding: '8px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: isDark ? '0 4px 12px rgba(37,211,102,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <Image
                src="/img/yapeLogo.png"
                alt="Yape"
                width={56}
                height={24}
                style={{ objectFit: 'contain' }}
              />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
                fontWeight: 600,
                color: isDark ? '#fff' : '#111',
              }}>+ S/5 DESCUENTO</span>
            </div>
            <div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: 600,
                color: isDark ? '#F3F0FF' : '#080808',
                marginBottom: '4px',
              }}>
                Paga con Yape y ahorra S/5
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: isDark ? '#9F7AEA' : '#B86B00',
              }}>
                Realiza tu pedido y coordina el pago por WhatsApp
              </div>
            </div>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#25D366',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '40px',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,211,102,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <MessageCircle size={16} />
            Coordinar por WhatsApp
          </a>
        </div>
      </div>

      {/* GRID */}
      <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} dark={isDark} />)
          : products.map(p => <ProductCard key={p.slug} p={p} />)
        }
      </div>

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 48px',
          color: isDark ? '#6B5B8A' : '#A09890',
          fontFamily: "'DM Mono', monospace",
          fontSize: '12px',
        }}>
          No hay productos en esta categoría.
        </div>
      )}
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