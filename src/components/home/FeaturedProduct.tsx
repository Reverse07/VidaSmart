'use client'

import Link from 'next/link'
import { Zap, Check, ArrowRight, ShoppingCart, Star, Gamepad2, Mouse, Gauge, Battery, Zap as ZapIcon } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'

// Product features for Redragon King Pro 4K
const PRODUCT_FEATURES = [
  { text: 'Sensor PAW3395 26K DPI', detail: 'Sensor óptico tope de gama para máxima precisión' },
  { text: 'Polling rate 4K Hz', detail: 'Respuesta ultrarápida de 0.25ms, 4x más rápido que 1000Hz' },
  { text: 'Conectividad tri-modo', detail: '2.4GHz inalámbrico + Bluetooth 5.0 + USB-C' },
  { text: 'Batería 120 horas', detail: 'Más de 5 días de uso continuo sin recargar' },
]

export default function FeaturedProduct() {
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const addItem = useCartStore(state => state.addItem)

  // Intersection observer — animate in when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleAdd = () => {
    addItem({
      id: 'redragon-king-pro-4k',
      name: 'Redragon King Pro 4K',
      price: 219,
      image: '/img/REDRAGON KING PRO 4K/REDRAGON KING PRO 4K_img1.jpg',
      quantity: 1,
      slug: 'redragon-king-pro-4k',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <>
      <style>{`
        /* ── SECTION BG ── */
        .fp-section {
          background: linear-gradient(135deg, #080610 0%, #0a0614 100%);
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }

        /* ── ANIMATED GRID LINES ── */
        .fp-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }

        /* ── STAGGER ── */
        .fp-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .fp-reveal.fp-in { opacity: 1; transform: translateY(0); }
        .fp-d1 { transition-delay: 0.05s; }
        .fp-d2 { transition-delay: 0.15s; }
        .fp-d3 { transition-delay: 0.25s; }
        .fp-d4 { transition-delay: 0.35s; }
        .fp-d5 { transition-delay: 0.45s; }
        .fp-d6 { transition-delay: 0.55s; }

        /* ── VISUAL BOX ── */
        .fp-visual {
          border-radius: 32px;
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #0f0a1a, #130a30, #0c0820);
          border: 1px solid rgba(139,92,246,0.25);
        }

        /* ── ORBIT RINGS ── */
        @keyframes orbit1 {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes orbit2 {
          from { transform: translate(-50%,-50%) rotate(180deg); }
          to   { transform: translate(-50%,-50%) rotate(540deg); }
        }
        .fp-ring {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(139,92,246,0.15);
          pointer-events: none;
        }
        .fp-ring-1 { width: 70%; height: 70%; animation: orbit1 20s linear infinite; }
        .fp-ring-2 { width: 90%; height: 90%; animation: orbit2 30s linear infinite; }

        /* Orbit dots on ring */
        .fp-ring::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 6px; height: 6px;
          background: rgba(139,92,246,0.6);
          border-radius: 50%;
        }

        /* ── INFO CHIPS ── */
        .fp-chip {
          position: absolute;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: 16px;
          padding: 12px 18px;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s ease;
          cursor: default;
          z-index: 10;
        }
        .fp-chip:hover {
          border-color: rgba(139,92,246,0.7);
          transform: translateY(-3px);
        }

        /* ── BENEFIT TABS ── */
        .fp-benefit {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          border-radius: 16px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s ease;
        }
        .fp-benefit.active {
          background: rgba(139,92,246,0.1);
          border-color: rgba(139,92,246,0.25);
        }
        .fp-benefit:hover:not(.active) {
          background: rgba(139,92,246,0.05);
        }

        /* ── BUY BUTTON ── */
        .fp-buy-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #8B5CF6;
          color: #fff;
          padding: 18px 40px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.3s ease;
        }
        .fp-buy-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #A78BFA;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          border-radius: inherit;
        }
        .fp-buy-btn:hover::before { transform: translateX(0); }
        .fp-buy-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 40px rgba(139,92,246,0.5);
        }
        .fp-buy-btn > * { position: relative; z-index: 1; }

        /* ── ADD CART BTN ── */
        .fp-cart-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139,92,246,0.1);
          color: #C4B5FD;
          padding: 17px 28px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(139,92,246,0.25);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .fp-cart-btn:hover, .fp-cart-btn.added {
          background: rgba(34,197,94,0.15);
          border-color: rgba(34,197,94,0.4);
          color: #22c55e;
        }

        /* ── PRICE ── */
        @keyframes priceIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fp-price-anim { animation: priceIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.5s both; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .fp-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <section ref={sectionRef} className="fp-section">
        {/* Grid lines BG */}
        <div className="fp-grid-lines" />

        {/* Ambient glows - Gaming style */}
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

          {/* Section label */}
          <div className={`fp-reveal fp-d1 ${visible ? 'fp-in' : ''}`} style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px', height: '1px',
                background: 'rgba(139,92,246,0.6)',
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#A78BFA',
              }}>🎮 Producto estrella de la semana</span>
            </div>
          </div>

          <div
            className="fp-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '96px',
              alignItems: 'center',
            }}
          >
            {/* ── VISUAL ── */}
            <div className={`fp-reveal fp-d2 ${visible ? 'fp-in' : ''}`}>
              <div className="fp-visual">
                {/* Orbit rings */}
                <div className="fp-ring fp-ring-1" />
                <div className="fp-ring fp-ring-2" />

                {/* Center image - full size */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2,
                }}>
                  <img 
                    src="/img/REDRAGON KING PRO 4K/REDRAGON KING PRO 4K_img1.jpg"
                    alt="Redragon King Pro 4K"
                    style={{
                      width: '90%',
                      height: '90%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 12px 24px rgba(139,92,246,0.4))',
                    }}
                  />
                </div>

                {/* Chip: descuento - más grande y visible */}
                <div className="fp-chip" style={{ 
                  bottom: '24px', 
                  left: '24px',
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.9), rgba(34,197,94,0.7))',
                  border: '1px solid rgba(34,197,94,0.5)',
                  padding: '14px 20px',
                }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', color: '#fff',
                    letterSpacing: '0.12em', marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}>🔥 OFERTA LIMITADA</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '42px', color: '#fff', lineHeight: 1,
                  }}>-21%</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    marginTop: '4px',
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={9} fill="#F59E0B" color="#F59E0B" />
                    ))}
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px', color: '#fff', marginLeft: '2px',
                    }}>4.9</span>
                  </div>
                </div>

                {/* Chip: 4K Hz */}
                <div className="fp-chip" style={{ 
                  top: '24px', 
                  right: '24px',
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.9), rgba(139,92,246,0.7))',
                  border: '1px solid rgba(139,92,246,0.5)',
                  padding: '12px 18px',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <Gauge size={14} color="#fff" />
                    <div>
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '11px', color: '#fff',
                        letterSpacing: '0.08em', fontWeight: 'bold',
                      }}>4K Hz</div>
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '8px', color: 'rgba(255,255,255,0.7)',
                      }}>POLLING RATE</div>
                    </div>
                  </div>
                </div>

                {/* Chip: stock */}
                <div className="fp-chip" style={{ 
                  top: '24px', 
                  left: '24px',
                  background: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(139,92,246,0.4)',
                  padding: '8px 14px',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                    }} />
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px', color: '#C4B5FD',
                      letterSpacing: '0.08em',
                    }}>25 en stock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── COPY ── */}
            <div>
              {/* Label + rating */}
              <div className={`fp-reveal fp-d3 ${visible ? 'fp-in' : ''}`} style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '20px',
                flexWrap: 'wrap', gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '11px', letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#A78BFA',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <Gamepad2 size={12} /> Gaming · Mice
                  </span>
                  <span style={{ color: '#4A3A6A' }}>•</span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px',
                    color: '#8B5CF6',
                  }}>#1 Más vendido</span>
                </div>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                  ))}
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', color: '#9F7AEA', marginLeft: '6px',
                  }}>4.9 (156 reseñas)</span>
                </div>
              </div>

              {/* Title */}
              <div className={`fp-reveal fp-d3 ${visible ? 'fp-in' : ''}`}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(52px, 6vw, 84px)',
                  lineHeight: 0.88,
                  color: '#F3F0FF',
                  marginBottom: '24px',
                  letterSpacing: '-0.01em',
                }}>
                  REDRAGON<br />
                  <span style={{ color: '#8B5CF6' }}>KING PRO</span><br />
                  4K
                </div>
              </div>

              {/* Description */}
              <div className={`fp-reveal fp-d3 ${visible ? 'fp-in' : ''}`}>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#C4B5FD',
                  marginBottom: '28px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Mouse gaming inalámbrico con sensor PAW3395 26K DPI, polling rate 4K Hz y conectividad tri-modo. 
                  Batería de 120 horas para sesiones interminables.
                </p>
              </div>

              {/* Features — interactive tabs */}
              <div
                className={`fp-reveal fp-d4 ${visible ? 'fp-in' : ''}`}
                style={{ marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                {PRODUCT_FEATURES.map((feature, i) => (
                  <div
                    key={feature.text}
                    className={`fp-benefit ${activeTab === i ? 'active' : ''}`}
                    onClick={() => setActiveTab(i)}
                  >
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                      background: activeTab === i ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.1)',
                      border: `1px solid ${activeTab === i ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      marginTop: '1px',
                    }}>
                      <Check size={11} color={activeTab === i ? '#C4B5FD' : '#8B5CF6'} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        color: activeTab === i ? '#F3F0FF' : '#9F7AEA',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: activeTab === i ? 500 : 400,
                        lineHeight: 1.4,
                        transition: 'color 0.25s ease',
                      }}>{feature.text}</p>
                      {activeTab === i && (
                        <p style={{
                          fontSize: '12px', color: '#A78BFA',
                          fontFamily: "'DM Mono', monospace",
                          marginTop: '3px', letterSpacing: '0.04em',
                          animation: 'priceIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
                        }}>{feature.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div
                className={`fp-reveal fp-d5 ${visible ? 'fp-in' : ''}`}
                style={{
                  display: 'flex', alignItems: 'baseline',
                  gap: '16px', marginBottom: '36px',
                  paddingBottom: '36px',
                  borderBottom: '1px solid rgba(139,92,246,0.15)',
                }}
              >
                <span className="fp-price-anim" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '80px', color: '#F3F0FF', lineHeight: 1,
                }}>S/219</span>
                <div>
                  <div style={{
                    fontSize: '18px', color: '#6B5B8A',
                    textDecoration: 'line-through', fontFamily: "'DM Sans', sans-serif",
                  }}>S/279</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '100px',
                    padding: '3px 10px',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', letterSpacing: '0.08em',
                    color: '#22c55e', marginTop: '4px',
                  }}>AHORRAS S/60</div>
                </div>
              </div>

              {/* CTAs */}
              <div className={`fp-reveal fp-d6 ${visible ? 'fp-in' : ''}`} style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center',
              }}>
                <Link href="/productos/redragon-king-pro-4k" className="fp-buy-btn">
                  <span>Comprar ahora</span>
                  <ArrowRight size={16} />
                </Link>

                <button
                  className={`fp-cart-btn ${added ? 'added' : ''}`}
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <Check size={15} />
                      Agregado
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={15} />
                      Al carrito
                    </>
                  )}
                </button>
              </div>

              {/* Trust micro-copy */}
              <div className={`fp-reveal fp-d6 ${visible ? 'fp-in' : ''}`} style={{
                display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap',
              }}>
                {['🔒 Pago seguro', '📦 Envío a todo Perú', '↩ 30 días devolución', '🎮 Garantía 12 meses'].map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', letterSpacing: '0.06em',
                    color: '#6B5B8A', textTransform: 'uppercase',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}