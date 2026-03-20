'use client'

import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Plus, Check, Zap, PawPrint, Gamepad2, Mouse } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_price: number
  category: string
  description: string
  images?: string[]
}

const CATEGORY_STYLE: Record<string, { bg: string; icon: React.ReactElement; accent: string; label: string }> = {
  gaming:   { bg: '#1a0f2e', icon: <Gamepad2 size={36} color="#A78BFA" />, accent: '#8B5CF6', label: 'Gaming' },
  tech:     { bg: '#EFF6FF', icon: <Zap size={36} color="#2563EB" />,      accent: '#2563EB', label: 'Tech' },
  mascotas: { bg: '#FFF7ED', icon: <PawPrint size={36} color="#D97706" />, accent: '#D97706', label: 'Mascotas' },
}

function ProductCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const style = CATEGORY_STYLE[p.category] ?? CATEGORY_STYLE.tech
  const discount = p.compare_price ? Math.round((1 - p.price / p.compare_price) * 100) : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: p.id, name: p.name, price: p.price / 100, image: p.images?.[0] ?? '', quantity: 1, slug: p.slug })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/productos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article
        style={{
          background: p.category === 'gaming' ? '#0f0a1a' : '#fff',
          border: `1px solid ${p.category === 'gaming' ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
          borderRadius: '24px', overflow: 'hidden',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = p.category === 'gaming'
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
          {p.category === 'gaming' && (
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
              filter: p.category === 'gaming' ? 'drop-shadow(0 8px 16px rgba(139,92,246,0.3))' : 'none',
            }} />
          ) : (
            <div style={{
              width: '80px', height: '80px',
              background: p.category === 'gaming' ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.8)',
              borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              border: p.category === 'gaming' ? '1px solid rgba(139,92,246,0.3)' : 'none',
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
          {p.category === 'gaming' && (
            <div style={{
              position: 'absolute', bottom: '14px', left: '14px',
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)',
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
            color: p.category === 'gaming' ? '#7C3AED' : '#A09890', marginBottom: '6px',
          }}>{style.label}</p>
          <h3 style={{
            fontSize: '15px', fontWeight: 600, lineHeight: 1.3,
            color: p.category === 'gaming' ? '#F3F0FF' : '#080808',
            marginBottom: '6px', fontFamily: "'DM Sans', sans-serif",
          }}>{p.name}</h3>
          <p style={{
            fontSize: '12px', color: p.category === 'gaming' ? '#6B5B8A' : '#7A7269',
            marginBottom: '16px', lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif",
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{p.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px',
                color: p.category === 'gaming' ? '#F3F0FF' : '#080808',
              }}>S/{p.price / 100}</span>
              {p.compare_price && (
                <span style={{
                  fontSize: '12px',
                  color: p.category === 'gaming' ? '#4A3A6A' : '#C8C3BB',
                  textDecoration: 'line-through', fontFamily: "'DM Sans', sans-serif",
                }}>S/{p.compare_price / 100}</span>
              )}
            </div>
            <button onClick={handleAdd} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              background: added ? '#16A34A' : style.accent,
              color: '#fff', border: 'none', borderRadius: '100px', padding: '9px 16px',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              transform: added ? 'scale(0.97)' : 'scale(1)',
              boxShadow: added ? 'none' : p.category === 'gaming' ? '0 4px 14px rgba(139,92,246,0.4)' : 'none',
            }}>
              {added ? <><Check size={12} /> Listo</> : <><Plus size={12} /> Agregar</>}
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

function SkeletonCard({ dark = false }: { dark?: boolean }) {
  const shimmerBg = dark
    ? 'linear-gradient(90deg, #1a1030 25%, #251845 50%, #1a1030 75%)'
    : 'linear-gradient(90deg, #F2F1EF 25%, #E8E6E1 50%, #F2F1EF 75%)'
  const blockBg = dark ? '#1a1030' : '#F2F1EF'
  return (
    <div style={{
      borderRadius: '24px', overflow: 'hidden',
      border: `1px solid ${dark ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
      background: dark ? '#0f0a1a' : '#fff',
    }}>
      <div style={{ aspectRatio: '1', background: shimmerBg, backgroundSize: '800px 100%', animation: 'shimmer 1.4s infinite' }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ height: '11px', width: '40%', borderRadius: '6px', background: blockBg, animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: '16px', width: '80%', borderRadius: '6px', background: blockBg, animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: '12px', width: '60%', borderRadius: '6px', background: blockBg, animation: 'shimmer 1.4s infinite' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
          <div style={{ height: '28px', width: '64px', borderRadius: '6px', background: blockBg, animation: 'shimmer 1.4s infinite' }} />
          <div style={{ height: '36px', width: '96px', borderRadius: '100px', background: blockBg, animation: 'shimmer 1.4s infinite' }} />
        </div>
      </div>
    </div>
  )
}

type FilterKey = 'all' | 'gaming' | 'tech' | 'mascotas'

const FILTERS: { key: FilterKey; label: string; accent: string }[] = [
  { key: 'all',      label: 'Todo',       accent: '#080808' },
  { key: 'gaming',   label: 'Gaming',     accent: '#8B5CF6' },
  { key: 'tech',     label: 'Tecnología', accent: '#2563EB' },
  { key: 'mascotas', label: 'Mascotas',   accent: '#D97706' },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState<FilterKey>('all')
  const [visible, setVisible]   = useState(false)
  const sectionRef              = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      if (filter === 'all') {
        // 5 destacados de cada categoría
        const [gaming, tech, mascotas] = await Promise.all([
          supabase.from('products').select('*').eq('is_active', true).eq('category', 'gaming').order('created_at', { ascending: false }).limit(5),
          supabase.from('products').select('*').eq('is_active', true).eq('category', 'tech').order('created_at', { ascending: false }).limit(5),
          supabase.from('products').select('*').eq('is_active', true).eq('category', 'mascotas').order('created_at', { ascending: false }).limit(5),
        ])
        setProducts([...(gaming.data ?? []), ...(tech.data ?? []), ...(mascotas.data ?? [])])
      } else {
        // Categoría específica: mostrar 8
        const { data } = await supabase
          .from('products').select('*').eq('is_active', true).eq('category', filter)
          .order('created_at', { ascending: false }).limit(8)
        setProducts(data ?? [])
      }
      setLoading(false)
    }
    load()
  }, [filter])

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .fp-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .fp-reveal.in { opacity: 1; transform: translateY(0); }
        .filter-pill {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 9px 20px; border-radius: 100px;
          border: 1.5px solid #E2DED8;
          background: transparent; color: #A09890; cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .filter-pill:hover { border-color: #C8C3BB; color: #5C554E; }
      `}</style>

      <section ref={sectionRef} style={{ padding: '120px 0', background: '#FAFAF8' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

          {/* Header */}
          <div className={`fp-reveal ${visible ? 'in' : ''}`} style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            alignItems: 'flex-end', marginBottom: '40px',
            paddingBottom: '32px', borderBottom: '1px solid #E2DED8',
          }}>
            <div>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A09890',
              }}>Más vendidos</span>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 0.9, marginTop: '12px', color: '#080808',
              }}>PRODUCTOS<br />ESTRELLA</div>
            </div>
            <Link href="/productos" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              textDecoration: 'none', fontWeight: 500, fontSize: '14px',
              color: '#7A7269', fontFamily: "'DM Sans', sans-serif",
              transition: 'color 0.2s', paddingBottom: '4px',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#080808'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7A7269'}
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filters */}
          <div className={`fp-reveal ${visible ? 'in' : ''}`}
            style={{ display: 'flex', gap: '8px', marginBottom: '40px', transitionDelay: '0.1s', flexWrap: 'wrap' }}
          >
            {FILTERS.map(f => (
              <button key={f.key} className="filter-pill" onClick={() => setFilter(f.key)} style={{
                background: filter === f.key ? f.accent : 'transparent',
                borderColor: filter === f.key ? f.accent : '#E2DED8',
                color: filter === f.key ? '#fff' : '#A09890',
                boxShadow: filter === f.key && f.key === 'gaming' ? '0 4px 14px rgba(139,92,246,0.35)' : 'none',
              }}>{f.label}</button>
            ))}
          </div>

          {/* Contador */}
          <div className={`fp-reveal ${visible ? 'in' : ''}`} style={{
            marginBottom: '24px', transitionDelay: '0.15s',
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '10px',
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8C3BB',
            }}>
              {filter === 'all'
                ? 'Mostrando 5 de cada categoría'
                : `Mostrando ${products.length} productos`
              }
            </span>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {loading
              ? [...Array(filter === 'all' ? 15 : 8)].map((_, i) => (
                  <SkeletonCard key={i} dark={filter === 'gaming'} />
                ))
              : products.map((p, i) => (
                <div key={p.slug} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
                }}>
                  <ProductCard p={p} />
                </div>
              ))
            }
          </div>

          {/* Ver más */}
          {!loading && (
            <div className={`fp-reveal ${visible ? 'in' : ''}`} style={{
              textAlign: 'center', marginTop: '48px',
            }}>
              <Link href={filter === 'all' ? '/productos' : `/productos?cat=${filter}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#7A7269', textDecoration: 'none',
                padding: '12px 28px', borderRadius: '100px',
                border: '1.5px solid #E2DED8',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#080808'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#080808'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E2DED8'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#7A7269'
                }}
              >
                Ver catálogo completo <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}