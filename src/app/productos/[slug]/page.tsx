'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'
import { ArrowLeft, Check, Shield, Truck, Headphones, Star, Plus, Minus, Play, Gamepad2, Zap, PawPrint } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { supabase } from '@/lib/supabase'

const CAT = {
  gaming:   { bg: '#0f0a1a', accent: '#8B5CF6', text: '#A78BFA', label: 'Gaming', icon: <Gamepad2 size={14} color="#A78BFA" /> },
  tech:     { bg: '#EFF6FF', accent: '#2563EB', text: '#2563EB', label: 'Tech',   icon: <Zap size={14} color="#2563EB" /> },
  mascotas: { bg: '#FFF7ED', accent: '#D97706', text: '#D97706', label: 'Mascotas', icon: <PawPrint size={14} color="#D97706" /> },
}

const ZOOM = 2.5 // zoom multiplier

function isVideo(src: string) {
  return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov')
}

export default function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }        = React.use(params)
  const [qty, setQty]   = useState(1)
  const [activeTab, setActiveTab]   = useState<'specs' | 'reviews' | 'faq'>('specs')
  const [added, setAdded]           = useState(false)
  const [product, setProduct]       = useState<any>(null)
  const [loading, setLoading]       = useState(true)
  const [activeMedia, setActiveMedia] = useState(0)

  // Zoom state
  const [zooming, setZooming]       = useState(false)
  const [zoomPos, setZoomPos]       = useState({ x: 50, y: 50 })
  const [lensPos, setLensPos]       = useState({ x: 0, y: 0 })
  const imgContainerRef             = useRef<HTMLDivElement>(null)
  const LENS_SIZE = 120

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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgContainerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100))

    // lens clamped so it stays inside the box
    const lensX = Math.max(LENS_SIZE / 2, Math.min(rect.width  - LENS_SIZE / 2, x)) - LENS_SIZE / 2
    const lensY = Math.max(LENS_SIZE / 2, Math.min(rect.height - LENS_SIZE / 2, y)) - LENS_SIZE / 2

    setZoomPos({ x: xPct, y: yPct })
    setLensPos({ x: lensX, y: lensY })
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '80px 48px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#6b6760', letterSpacing: '0.1em' }}>
        CARGANDO...
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ padding: '80px 48px', fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}>
        <p style={{ color: '#6b6760' }}>Producto no encontrado.</p>
        <Link href="/productos" style={{ color: '#2563eb' }}>Volver al catálogo</Link>
      </div>
    )
  }

  const cat     = CAT[product.category as keyof typeof CAT] ?? CAT.tech
  const isDark  = product.category === 'gaming'
  const discount = product.compare_price
    ? Math.round((1 - product.price / product.compare_price) * 100)
    : 0

  const allMedia: string[] = product.images ?? []
  const currentMedia = allMedia[activeMedia]
  const isCurrentVideo = currentMedia ? isVideo(currentMedia) : false
  const canZoom = !isCurrentVideo && !!currentMedia

  const benefits = ['Alta calidad premium', 'Garantía 30 días', 'Envío a todo Perú', 'Soporte por WhatsApp']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .pd-page { min-height: 100vh; font-family: 'DM Sans', sans-serif; }

        .pd-thumb {
          aspect-ratio: 1; border-radius: 12px; overflow: hidden;
          cursor: pointer; border: 2px solid transparent;
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          display: flex; align-items: center; justify-content: center; position: relative;
        }
        .pd-thumb:hover { transform: translateY(-2px); }
        .pd-thumb.active { border-color: var(--accent) !important; }
        .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .pd-play-badge {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.3); border-radius: inherit;
        }

        /* Main image container */
        .pd-main-wrap {
          position: relative;
          border-radius: 28px; overflow: hidden;
          aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .pd-main-wrap img {
          width: 85%; height: 85%; object-fit: contain;
          position: relative; z-index: 1;
          transition: opacity 0.2s ease;
          display: block;
          pointer-events: none;
          user-select: none;
        }
        .pd-main-wrap.zooming { cursor: crosshair; }

        /* Lens overlay */
        .pd-lens {
          position: absolute;
          width: ${LENS_SIZE}px; height: ${LENS_SIZE}px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(0px);
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.2);
        }

        /* Zoom result panel */
        .pd-zoom-result {
          position: absolute;
          left: calc(100% + 16px);
          top: 0;
          width: 440px;
          height: 440px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          z-index: 50;
          pointer-events: none;
          background: #0a0a12;
        }
        .pd-zoom-result img {
          position: absolute;
          width: ${ZOOM * 100}%;
          height: ${ZOOM * 100}%;
          object-fit: contain;
          transform-origin: top left;
          pointer-events: none;
          user-select: none;
        }

        .pd-add-btn {
          flex: 1; background: var(--accent); color: #fff; border: none;
          border-radius: 100px; padding: 18px 32px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .pd-add-btn:hover { transform: scale(1.02); }
        .pd-add-btn.added { background: #16a34a !important; box-shadow: none; }

        .pd-tab {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 24px; background: transparent; border: none; cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }

        .pd-benefit {
          display: flex; gap: 10px; align-items: flex-start; font-size: 14px;
        }

        @media (max-width: 900px) {
          .pd-grid { grid-template-columns: 1fr !important; }
          .pd-zoom-result { display: none !important; }
        }
      `}</style>

      <div
        className="pd-page"
        style={{
          background: isDark ? '#080610' : '#FAFAF8',
          '--accent': cat.accent,
        } as React.CSSProperties}
      >
        {/* Back */}
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px 48px 0' }}>
          <Link href="/productos" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            textDecoration: 'none',
            color: isDark ? '#7C3AED' : '#6b6760',
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <ArrowLeft size={14} /> Volver al catálogo
          </Link>
        </div>

        {/* Main grid */}
        <div className="pd-grid" style={{
          maxWidth: '1300px', margin: '0 auto',
          padding: '40px 48px 80px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '72px', alignItems: 'start',
        }}>

          {/* ── GALLERY ── */}
          <div style={{ position: 'sticky', top: '90px' }}>

            {/* Main media + zoom */}
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <div
                ref={imgContainerRef}
                className={`pd-main-wrap ${zooming && canZoom ? 'zooming' : ''}`}
                style={{
                  background: isDark ? 'linear-gradient(145deg, #0c0820, #130a30)' : cat.bg,
                  border: isDark ? '1px solid rgba(139,92,246,0.2)' : 'none',
                  boxShadow: isDark ? '0 24px 64px rgba(139,92,246,0.12)' : '0 8px 32px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={() => { if (canZoom) setZooming(true) }}
                onMouseLeave={() => setZooming(false)}
                onMouseMove={canZoom ? handleMouseMove : undefined}
              >
                {isDark && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.12), transparent 65%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {currentMedia ? (
                  isCurrentVideo ? (
                    <video key={currentMedia} autoPlay loop muted playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                      <source src={currentMedia} />
                    </video>
                  ) : (
                    <img
                      src={currentMedia}
                      alt={product.name}
                      style={{
                        filter: isDark ? 'drop-shadow(0 12px 24px rgba(139,92,246,0.25))' : 'none',
                        opacity: zooming ? 0.85 : 1,
                      }}
                    />
                  )
                ) : (
                  <span style={{ fontSize: '120px', position: 'relative', zIndex: 1 }}>
                    {isDark ? '🎮' : product.category === 'tech' ? '⚡' : '🐾'}
                  </span>
                )}

                {/* Discount badge */}
                {discount > 0 && (
                  <div style={{
                    position: 'absolute', top: '20px', left: '20px',
                    background: cat.accent, color: '#fff',
                    fontFamily: "'DM Mono', monospace", fontSize: '11px',
                    padding: '5px 12px', borderRadius: '100px', zIndex: 2,
                    boxShadow: `0 4px 12px ${cat.accent}44`,
                  }}>-{discount}%</div>
                )}

                {/* Lens */}
                {zooming && canZoom && (
                  <div className="pd-lens" style={{
                    left: lensPos.x,
                    top: lensPos.y,
                  }} />
                )}

                {/* Zoom hint */}
                {!zooming && canZoom && (
                  <div style={{
                    position: 'absolute', bottom: '16px', right: '16px',
                    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                    borderRadius: '100px', padding: '5px 12px',
                    fontFamily: "'DM Mono', monospace", fontSize: '9px',
                    color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em',
                    pointerEvents: 'none', zIndex: 3,
                  }}>
                    🔍 PASA EL CURSOR PARA ZOOM
                  </div>
                )}
              </div>

              {/* Zoom result panel */}
              {zooming && canZoom && (
                <div className="pd-zoom-result" style={{
                  background: isDark ? '#0a0614' : '#fff',
                  border: isDark ? '1px solid rgba(139,92,246,0.2)' : '1px solid #E2DED8',
                }}>
                  <img
                    src={currentMedia}
                    alt="zoom"
                    style={{
                      left: `-${(zoomPos.x / 100) * (ZOOM - 1) * 440}px`,
                      top:  `-${(zoomPos.y / 100) * (ZOOM - 1) * 440}px`,
                      filter: isDark ? 'drop-shadow(0 0 20px rgba(139,92,246,0.2))' : 'none',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allMedia.length > 1 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(allMedia.length, 5)}, 1fr)`,
                gap: '8px',
              }}>
                {allMedia.map((src, i) => {
                  const isVid = isVideo(src)
                  return (
                    <div
                      key={i}
                      className={`pd-thumb ${activeMedia === i ? 'active' : ''}`}
                      onClick={() => { setActiveMedia(i); setZooming(false) }}
                      style={{
                        background: isDark ? '#130a30' : cat.bg,
                        border: `2px solid ${activeMedia === i ? cat.accent : isDark ? 'rgba(139,92,246,0.1)' : '#E2DED8'}`,
                      }}
                    >
                      {isVid ? (
                        <>
                          <video src={src} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div className="pd-play-badge">
                            <Play size={16} color="#fff" fill="#fff" />
                          </div>
                        </>
                      ) : (
                        <img src={src} alt={`${product.name} ${i + 1}`} style={{ objectFit: 'contain', padding: '6px' }} />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── INFO ── */}
          <div>
            {/* Category + rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                letterSpacing: '0.12em', textTransform: 'uppercase', color: cat.text,
              }}>
                {cat.icon} {cat.label}
              </div>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: isDark ? '#6B5B8A' : '#6b6760', marginLeft: '6px' }}>4.9</span>
              </div>
            </div>

            {/* Title */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 5vw, 68px)',
              lineHeight: 0.9, marginBottom: '20px',
              color: isDark ? '#F3F0FF' : '#080808',
            }}>
              {product.name.toUpperCase()}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '15px', fontWeight: 300, lineHeight: 1.7,
              color: isDark ? '#9F7AEA' : '#6b6760', marginBottom: '28px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '16px',
              padding: '24px 0',
              borderTop: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : '#e8e6e1'}`,
              borderBottom: `1px solid ${isDark ? 'rgba(139,92,246,0.15)' : '#e8e6e1'}`,
              marginBottom: '28px',
            }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '72px', lineHeight: 1,
                color: isDark ? '#F3F0FF' : '#080808',
              }}>S/{product.price / 100}</span>
              {product.compare_price && (
                <div>
                  <div style={{ fontSize: '16px', color: isDark ? '#4A3A6A' : '#b0aca4', textDecoration: 'line-through', fontFamily: "'DM Sans', sans-serif" }}>
                    S/{product.compare_price / 100}
                  </div>
                  <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                    Ahorras S/{(product.compare_price - product.price) / 100}
                  </div>
                </div>
              )}
            </div>

            {/* Benefits */}
            <ul style={{ listStyle: 'none', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {benefits.map(b => (
                <li key={b} className="pd-benefit">
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: isDark ? 'rgba(139,92,246,0.15)' : '#dcfce7',
                    border: isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid #86efac',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={10} color={isDark ? '#A78BFA' : '#16a34a'} />
                  </div>
                  <span style={{ color: isDark ? '#C4B5FD' : '#3E3A35', fontFamily: "'DM Sans', sans-serif" }}>{b}</span>
                </li>
              ))}
            </ul>

            {/* Qty + Add */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: isDark ? 'rgba(139,92,246,0.08)' : '#f2f1ef',
                borderRadius: '100px', padding: '6px 16px',
                border: isDark ? '1px solid rgba(139,92,246,0.15)' : 'none',
              }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: isDark ? '1px solid rgba(139,92,246,0.25)' : '1.5px solid #e8e6e1',
                  background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isDark ? '#A78BFA' : '#080808',
                }}>
                  <Minus size={14} />
                </button>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '15px',
                  minWidth: '24px', textAlign: 'center',
                  color: isDark ? '#F3F0FF' : '#080808',
                }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: isDark ? '1px solid rgba(139,92,246,0.25)' : '1.5px solid #e8e6e1',
                  background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isDark ? '#A78BFA' : '#080808',
                }}>
                  <Plus size={14} />
                </button>
              </div>
              <button
                className={`pd-add-btn ${added ? 'added' : ''}`}
                style={{ '--accent': added ? '#16a34a' : cat.accent } as React.CSSProperties}
                onClick={() => {
                  addItem({ id: product.id, name: product.name, price: product.price / 100, image: product.images?.[0] ?? '', quantity: qty, slug: product.slug })
                  setAdded(true)
                  setTimeout(() => setAdded(false), 2000)
                }}
              >
                {added ? <><Check size={16} /> Agregado al carrito</> : <>Agregar — S/{(product.price / 100) * qty}</>}
              </button>
            </div>

            {/* Yape */}
            <div style={{
              background: isDark ? 'rgba(34,197,94,0.08)' : '#f0fdf4',
              border: isDark ? '1px solid rgba(34,197,94,0.2)' : '1px solid #86efac',
              borderRadius: '16px', padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
            }}>
              <span style={{ fontSize: '24px' }}>📱</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803d', fontFamily: "'DM Sans', sans-serif" }}>Paga con Yape y ahorra S/5</div>
                <div style={{ fontSize: '12px', color: '#16a34a', fontFamily: "'DM Sans', sans-serif" }}>Coordina por WhatsApp tras tu pedido</div>
              </div>
            </div>

            {/* Trust */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
              {[
                { icon: <Shield size={14} />, text: 'Pago seguro' },
                { icon: <Truck size={14} />, text: 'Envío Perú' },
                { icon: <Headphones size={14} />, text: 'WhatsApp' },
              ].map(t => (
                <div key={t.text} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: isDark ? 'rgba(139,92,246,0.08)' : '#f2f1ef',
                  border: isDark ? '1px solid rgba(139,92,246,0.12)' : 'none',
                  borderRadius: '12px', padding: '12px',
                  fontSize: '12px', fontWeight: 500,
                  color: isDark ? '#9F7AEA' : '#6b6760',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {t.icon} {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{
          maxWidth: '1300px', margin: '0 auto', padding: '0 48px 80px',
          borderTop: `1px solid ${isDark ? 'rgba(139,92,246,0.12)' : '#e8e6e1'}`,
        }}>
          <div style={{
            borderBottom: `1px solid ${isDark ? 'rgba(139,92,246,0.12)' : '#e8e6e1'}`,
            marginBottom: '40px', display: 'flex',
          }}>
            {(['specs', 'reviews', 'faq'] as const).map(tab => (
              <button key={tab} className="pd-tab" onClick={() => setActiveTab(tab)} style={{
                fontFamily: "'DM Mono', monospace",
                borderBottom: `2px solid ${activeTab === tab ? cat.accent : 'transparent'}`,
                color: activeTab === tab ? (isDark ? '#C4B5FD' : '#080808') : (isDark ? '#6B5B8A' : '#6b6760'),
              }}>
                {tab === 'specs' ? 'Especificaciones' : tab === 'reviews' ? 'Opiniones' : 'FAQ'}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div style={{ maxWidth: '600px' }}>
              {[
                { label: 'Categoría', value: product.category },
                { label: 'Stock',     value: `${product.stock} unidades` },
                { label: 'Peso',      value: product.weight_grams ? `${product.weight_grams}g` : 'N/A' },
                { label: 'Proveedor', value: product.supplier },
                { label: 'Garantía',  value: '12 meses' },
              ].map(s => (
                <div key={s.label} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '16px 0',
                  borderBottom: `1px solid ${isDark ? 'rgba(139,92,246,0.10)' : '#e8e6e1'}`,
                }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? '#6B5B8A' : '#6b6760' }}>{s.label}</span>
                  <span style={{ fontWeight: 600, color: isDark ? '#F3F0FF' : '#080808', fontFamily: "'DM Sans', sans-serif" }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <p style={{ color: isDark ? '#6B5B8A' : '#6b6760', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>
              Aún no hay reseñas. ¡Sé el primero en opinar!
            </p>
          )}

          {activeTab === 'faq' && (
            <div style={{ maxWidth: '700px' }}>
              {[
                { q: '¿Cuánto demora el envío?', a: 'Lima 2-3 días hábiles. Provincias 5-7 días hábiles.' },
                { q: '¿Puedo devolver el producto?', a: '30 días de garantía de devolución sin preguntas.' },
                { q: '¿Cómo pago con Yape?', a: 'Selecciona Yape en el checkout y te enviamos el QR por WhatsApp.' },
              ].map(f => (
                <div key={f.q} style={{ padding: '24px 0', borderBottom: `1px solid ${isDark ? 'rgba(139,92,246,0.10)' : '#e8e6e1'}` }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: isDark ? '#F3F0FF' : '#080808', fontFamily: "'DM Sans', sans-serif" }}>{f.q}</div>
                  <div style={{ fontSize: '14px', lineHeight: 1.6, color: isDark ? '#9F7AEA' : '#6b6760', fontFamily: "'DM Sans', sans-serif" }}>{f.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}