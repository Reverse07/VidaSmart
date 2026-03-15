'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { Zap, PawPrint, Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_price: number
  category: string
  description: string
  is_active: boolean
}

function Catalogo() {
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (cat === 'tech' || cat === 'mascotas') {
        query = query.eq('category', cat)
      }

      const { data } = await query
      setProducts(data ?? [])
      setLoading(false)
    }
    fetchProducts()
  }, [cat])

  if (loading) {
    return (
      <div style={{ padding: '80px 48px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#6b6760', letterSpacing: '0.1em' }}>
        CARGANDO PRODUCTOS...
      </div>
    )
  }

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');`}</style>

      <div style={{ padding: '80px 48px 48px', borderBottom: '1px solid #e8e6e1' }}>
        <p style={{ fontFamily: 'DM Mono', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760', marginBottom: '16px' }}>
          {products.length} productos disponibles
        </p>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(56px, 8vw, 96px)', lineHeight: 0.88, marginBottom: '32px' }}>
          {cat === 'tech' ? 'TECNOLOGÍA' : cat === 'mascotas' ? 'MASCOTAS' : 'TODOS LOS PRODUCTOS'}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: 'Todo', value: null },
            { label: 'Tecnología', value: 'tech' },
            { label: 'Mascotas', value: 'mascotas' },
          ].map(f => (
            <Link key={f.label} href={f.value ? `/productos?cat=${f.value}` : '/productos'} style={{
              fontFamily: 'DM Mono', fontSize: '11px', letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '10px 20px', borderRadius: '100px',
              border: `1.5px solid ${cat === f.value ? '#080808' : '#e8e6e1'}`,
              background: cat === f.value ? '#080808' : 'transparent',
              color: cat === f.value ? '#fafaf8' : '#6b6760',
              textDecoration: 'none',
            }}>{f.label}</Link>
          ))}
        </div>
      </div>

      <div style={{ padding: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {products.map(p => (
          <Link key={p.slug} href={`/productos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '24px', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 48px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ background: p.category === 'tech' ? '#f0f4ff' : '#fff7ed', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.8)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.category === 'tech' ? <Zap size={40} color="#2563eb" /> : <PawPrint size={40} color="#d97706" />}
                </div>
                {p.compare_price && (
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#2563eb', color: '#fff', fontFamily: 'DM Mono', fontSize: '10px', padding: '4px 8px', borderRadius: '100px' }}>
                    -{Math.round((1 - p.price / p.compare_price) * 100)}%
                  </div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6760', marginBottom: '6px' }}>{p.category}</p>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.3 }}>{p.name}</h3>
                <p style={{ fontSize: '12px', color: '#6b6760', marginBottom: '16px', lineHeight: 1.5 }}>
                  {p.description?.slice(0, 60)}...
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '28px' }}>S/{p.price / 100}</span>
                    {p.compare_price && <span style={{ fontSize: '12px', color: '#b0aca4', textDecoration: 'line-through' }}>S/{p.compare_price / 100}</span>}
                  </div>
                  <div style={{ background: '#080808', color: '#fff', borderRadius: '100px', padding: '8px 14px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Plus size={12} /> Ver
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
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