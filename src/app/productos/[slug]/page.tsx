'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { ArrowLeft, Check, Shield, Truck, Headphones, Star, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { supabase } from '@/lib/supabase'

export default function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'faq'>('specs')
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div style={{ padding: '80px 48px', fontFamily: 'DM Mono', fontSize: '11px', color: '#6b6760', letterSpacing: '0.1em' }}>
        CARGANDO...
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ padding: '80px 48px', fontFamily: 'DM Sans, sans-serif', textAlign: 'center' }}>
        <p style={{ color: '#6b6760' }}>Producto no encontrado.</p>
        <Link href="/productos" style={{ color: '#2563eb' }}>Volver al catálogo</Link>
      </div>
    )
  }

  const discount = product.compare_price
    ? Math.round((1 - product.price / product.compare_price) * 100)
    : 0

  // Specs, benefits, faq vienen del campo description por ahora
  // En el futuro se pueden agregar columnas a la tabla
  const benefits = [
    'Alta calidad premium',
    'Garantía 30 días',
    'Envío a todo Perú',
    'Soporte por WhatsApp',
  ]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');`}</style>
      <div style={{ background: '#fafaf8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 48px 0' }}>
          <Link href="/productos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#6b6760', fontFamily: 'DM Mono', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <ArrowLeft size={14} /> Volver al catálogo
          </Link>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* IMAGEN */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: product.category === 'tech' ? '#f0f4ff' : '#fff7ed', borderRadius: '32px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '12px' }}>
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: '120px' }}>{product.category === 'tech' ? '⚡' : '🐾'}</span>
              )}
              {discount > 0 && (
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#2563eb', color: '#fff', fontFamily: 'DM Mono', fontSize: '11px', padding: '6px 12px', borderRadius: '100px' }}>-{discount}%</div>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: product.category === 'tech' ? '#f0f4ff' : '#fff7ed', borderRadius: '16px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: i === 0 ? '2px solid #080808' : '2px solid #e8e6e1', cursor: 'pointer', fontSize: '24px' }}>
                  {product.category === 'tech' ? '⚡' : '🐾'}
                </div>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'DM Mono', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb' }}>{product.category}</span>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: '#6b6760', marginLeft: '6px' }}>4.9</span>
              </div>
            </div>

            <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.9, marginBottom: '24px' }}>
              {product.name.toUpperCase()}
            </div>

            <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: '#6b6760', marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* PRECIO */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '24px 0', borderTop: '1px solid #e8e6e1', borderBottom: '1px solid #e8e6e1', marginBottom: '32px' }}>
              <span style={{ fontFamily: 'Bebas Neue', fontSize: '72px', lineHeight: 1 }}>
                S/{product.price / 100}
              </span>
              {product.compare_price && (
                <div>
                  <div style={{ fontSize: '16px', color: '#b0aca4', textDecoration: 'line-through' }}>
                    S/{product.compare_price / 100}
                  </div>
                  <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>
                    Ahorras S/{(product.compare_price - product.price) / 100}
                  </div>
                </div>
              )}
            </div>

            {/* BENEFICIOS */}
            <ul style={{ listStyle: 'none', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {benefits.map((b: string) => (
                <li key={b} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#dcfce7', border: '1px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={10} color="#16a34a" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>

            {/* CANTIDAD + AGREGAR */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f2f1ef', borderRadius: '100px', padding: '6px 16px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #e8e6e1', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={14} />
                </button>
                <span style={{ fontFamily: 'DM Mono', fontSize: '15px', minWidth: '24px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #e8e6e1', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price / 100,
                    image: product.images?.[0] ?? '',
                    quantity: qty,
                    slug: product.slug,
                  })
                  setAdded(true)
                  setTimeout(() => setAdded(false), 2000)
                }}
                style={{ flex: 1, background: added ? '#16a34a' : '#080808', color: '#fff', border: 'none', borderRadius: '100px', padding: '18px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'DM Sans, sans-serif', transition: 'background 0.3s' }}
              >
                {added ? <><Check size={16} /> Agregado al carrito</> : <>Agregar — S/{(product.price / 100) * qty}</>}
              </button>
            </div>

            {/* YAPE */}
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '24px' }}>📱</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803d' }}>Paga con Yape y ahorra S/5</div>
                <div style={{ fontSize: '12px', color: '#16a34a' }}>Coordina por WhatsApp tras tu pedido</div>
              </div>
            </div>

            {/* TRUST */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
              {[{ icon: <Shield size={14} />, text: 'Pago seguro' }, { icon: <Truck size={14} />, text: 'Envío Perú' }, { icon: <Headphones size={14} />, text: 'WhatsApp' }].map(t => (
                <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f2f1ef', borderRadius: '12px', padding: '12px', fontSize: '12px', fontWeight: 500, color: '#6b6760' }}>
                  {t.icon} {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 48px 80px' }}>
          <div style={{ borderBottom: '1px solid #e8e6e1', marginBottom: '40px', display: 'flex' }}>
            {(['specs', 'reviews', 'faq'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ fontFamily: 'DM Mono', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === tab ? '#080808' : 'transparent'}`, cursor: 'pointer', color: activeTab === tab ? '#080808' : '#6b6760' }}>
                {tab === 'specs' ? 'Especificaciones' : tab === 'reviews' ? 'Opiniones' : 'FAQ'}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div style={{ maxWidth: '600px' }}>
              {[
                { label: 'Categoría', value: product.category },
                { label: 'Stock', value: `${product.stock} unidades` },
                { label: 'Peso', value: product.weight_grams ? `${product.weight_grams}g` : 'N/A' },
                { label: 'Proveedor', value: product.supplier },
                { label: 'Garantía', value: '12 meses' },
              ].map((s: any) => (
                <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '16px 0', borderBottom: '1px solid #e8e6e1' }}>
                  <span style={{ fontFamily: 'DM Mono', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b6760' }}>{s.label}</span>
                  <span style={{ fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <p style={{ color: '#6b6760', fontFamily: 'DM Mono', fontSize: '12px' }}>
              Aún no hay reseñas. ¡Sé el primero en opinar!
            </p>
          )}

          {activeTab === 'faq' && (
            <div style={{ maxWidth: '700px' }}>
              {[
                { q: '¿Cuánto demora el envío?', a: 'Lima 2-3 días hábiles. Provincias 5-7 días hábiles.' },
                { q: '¿Puedo devolver el producto?', a: '30 días de garantía de devolución sin preguntas.' },
                { q: '¿Cómo pago con Yape?', a: 'Selecciona Yape en el checkout y te enviamos el QR por WhatsApp.' },
              ].map((f: any) => (
                <div key={f.q} style={{ padding: '24px 0', borderBottom: '1px solid #e8e6e1' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{f.q}</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#6b6760' }}>{f.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}