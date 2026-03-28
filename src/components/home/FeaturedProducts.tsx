'use client'

import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Plus, Check, Zap, PawPrint, Gamepad2, Mouse, Star } from 'lucide-react'
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

// PRODUCTOS ESTRELLA MANUALES (IDs de tus productos más vendidos)
const STARRED_IDS = [
  '0c0fcb7d-d85b-4318-9726-719cd67a66a0', // ATK Blue F1 Leviatan
  'fa179fc5-a939-46a6-a474-4e82474aa653', // Attack Shark R3
  'fbe99596-8462-4212-9b47-1812d0723c92', // AULA HERO 68HE
  '6f43e725-f2a2-45a9-9173-b4a5d14351d0', // Logitech G502 Hero
  'f8774579-6cb4-4f7f-bc2b-08339ebf373d', // Razer Basilisk V3
  '8fee1e6a-b16f-4806-a27f-42df6766ab8b', // Logitech G Pro X Superlight 2
  '21746b01-0d47-486f-bdc0-e7b58840cd07', // Focos WiFi RGB
  'e62a9380-70f3-4d3a-83b4-a2f57eff2ba0', // Foco Tapo L630
  '82ddefa9-b6b2-49a0-8935-c6cd003bb2bb', // Tira LED Gaming
  '9edc5cd6-0458-4f5f-9f2e-388119ba20f6', // Fuente Petkit
  'cb5a551f-13c9-407c-9cde-e5f4d6b7e8c2', // Rascador Salem
  '7cceaf96-1951-43fd-bdc8-98586a93dfc4', // Alfombra olfativa
]

const CATEGORY_STYLE: Record<string, { bg: string; icon: React.ReactElement; accent: string; label: string }> = {
  gaming:   { bg: '#1a0f2e', icon: <Gamepad2 size={36} color="#A78BFA" />, accent: '#8B5CF6', label: 'Gaming' },
  tech:     { bg: '#EFF6FF', icon: <Zap size={36} color="#2563EB" />,      accent: '#2563EB', label: 'Tech' },
  mascotas: { bg: '#FFF7ED', icon: <PawPrint size={36} color="#D97706" />, accent: '#D97706', label: 'Mascotas' },
}

function ProductCard({ p, featured = false }: { p: Product; featured?: boolean }) {
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
          position: 'relative',
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
        {/* Badge Estrella */}
        {featured && (
          <div style={{
            position: 'absolute', top: '14px', left: '14px', zIndex: 10,
            background: '#F59E0B', color: '#fff', borderRadius: '100px',
            padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            <Star size={10} fill="#fff" /> ESTRELLA
          </div>
        )}
        
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
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
    async function loadStarredProducts() {
      setLoading(true)
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .in('id', STARRED_IDS)
      
      // Mantener el orden de STARRED_IDS
      const ordered = STARRED_IDS.map(id => data?.find(p => p.id === id)).filter(Boolean) as Product[]
      setProducts(ordered)
      setLoading(false)
    }
    loadStarredProducts()
  }, [])

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
              }}>Lo más vendido</span>
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
            }}>
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {/* Contador */}
          <div className={`fp-reveal ${visible ? 'in' : ''}`} style={{
            marginBottom: '24px', transitionDelay: '0.05s',
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '10px',
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8C3BB',
            }}>
              {!loading && `${products.length} productos destacados para ti`}
            </span>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {loading
              ? [...Array(12)].map((_, i) => <SkeletonCard key={i} dark={false} />)
              : products.map((p, i) => (
                <div key={p.slug} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
                }}>
                  <ProductCard p={p} featured={i < 3} />
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}