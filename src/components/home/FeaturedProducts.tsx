'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Plus, Check, Zap, PawPrint } from 'lucide-react'
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
}

function ProductCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  const discount = p.compare_price
    ? Math.round((1 - p.price / p.compare_price) * 100)
    : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: p.id, name: p.name, price: p.price / 100, image: '', quantity: 1, slug: p.slug })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/productos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{
        background: '#fff',
        border: '1px solid #E2DED8',
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 24px 48px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{
          background: p.category === 'tech' ? '#EFF6FF' : '#FFF7ED',
          aspectRatio: '1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            {p.category === 'tech'
              ? <Zap size={40} color="#2563EB" />
              : <PawPrint size={40} color="#D97706" />}
          </div>
          {discount > 0 && (
            <div style={{
              position: 'absolute', top: '14px', right: '14px',
              background: '#2563EB', color: '#fff',
              fontFamily: "'DM Mono', monospace", fontSize: '10px',
              padding: '4px 8px', borderRadius: '100px',
            }}>-{discount}%</div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '20px' }}>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#A09890', marginBottom: '6px',
          }}>{p.category}</p>
          <h3 style={{
            fontSize: '15px', fontWeight: 600, lineHeight: 1.3,
            color: '#080808', marginBottom: '6px',
            fontFamily: "'DM Sans', sans-serif",
          }}>{p.name}</h3>
          <p style={{
            fontSize: '12px', color: '#7A7269', marginBottom: '16px',
            lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif",
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{p.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '28px', color: '#080808',
              }}>S/{p.price / 100}</span>
              {p.compare_price && (
                <span style={{
                  fontSize: '12px', color: '#C8C3BB', textDecoration: 'line-through',
                  fontFamily: "'DM Sans', sans-serif",
                }}>S/{p.compare_price / 100}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: added ? '#16A34A' : '#080808',
                color: '#fff', border: 'none',
                borderRadius: '100px', padding: '9px 16px',
                fontSize: '12px', fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                transform: added ? 'scale(0.97)' : 'scale(1)',
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

function SkeletonCard() {
  return (
    <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #E2DED8' }}>
      <div style={{
        aspectRatio: '1',
        background: 'linear-gradient(90deg, #F2F1EF 25%, #E8E6E1 50%, #F2F1EF 75%)',
        backgroundSize: '800px 100%',
        animation: 'shimmer 1.4s infinite',
      }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ height: '11px', width: '40%', borderRadius: '6px', background: '#F2F1EF', animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: '16px', width: '80%', borderRadius: '6px', background: '#F2F1EF', animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: '12px', width: '60%', borderRadius: '6px', background: '#F2F1EF', animation: 'shimmer 1.4s infinite' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
          <div style={{ height: '28px', width: '64px', borderRadius: '6px', background: '#F2F1EF', animation: 'shimmer 1.4s infinite' }} />
          <div style={{ height: '36px', width: '96px', borderRadius: '100px', background: '#F2F1EF', animation: 'shimmer 1.4s infinite' }} />
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'tech' | 'mascotas'>('all')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      setProducts(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter)

  const FILTERS = [
    { key: 'all',      label: 'Todo' },
    { key: 'tech',     label: 'Tecnología' },
    { key: 'mascotas', label: 'Mascotas' },
  ] as const

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .fp-section-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1),
                      transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .fp-section-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        .filter-pill {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 9px 20px;
          border-radius: 100px;
          border: 1.5px solid #E2DED8;
          background: transparent;
          color: #A09890;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .filter-pill:hover { border-color: #080808; color: #080808; }
        .filter-pill.active { background: #080808; border-color: #080808; color: #FAFAF8; }
      `}</style>

      <section ref={sectionRef} style={{ padding: '120px 0', background: '#FAFAF8' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

          {/* Header */}
          <div className={`fp-section-reveal ${visible ? 'in' : ''}`} style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'flex-end',
            marginBottom: '40px',
            paddingBottom: '32px',
            borderBottom: '1px solid #E2DED8',
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
              transition: 'color 0.2s',
              paddingBottom: '4px',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#080808'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7A7269'}
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filters */}
          <div className={`fp-section-reveal ${visible ? 'in' : ''}`} style={{
            display: 'flex', gap: '8px', marginBottom: '40px',
            transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
            transitionDelay: '0.1s',
          }}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`filter-pill ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >{f.label}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {loading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((p, i) => (
                <div
                  key={p.slug}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s,
                                 transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
                  }}
                >
                  <ProductCard p={p} />
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}