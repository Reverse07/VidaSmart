'use client'

import Link from 'next/link'
import { Zap, Check, ArrowRight, ShoppingCart, Star } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'

const BENEFITS = [
  { text: 'Control desde cualquier celular', detail: 'App Tuya Smart o Smart Life' },
  { text: 'Compatible con Alexa y Google Home', detail: 'Integración por voz en segundos' },
  { text: 'Programa horarios automáticos', detail: 'Enciende y apaga sin que lo pienses' },
  { text: 'Monitorea consumo eléctrico', detail: 'Ahorra hasta S/40 al mes' },
]

export default function FeaturedProduct() {
  const [visible, setVisible] = useState(false)
  const [added, setAdded]     = useState(false)
  const [hoverBtn, setHoverBtn] = useState(false)
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
      id: 'enchufe-wifi-inteligente',
      name: 'Enchufe WiFi Inteligente',
      price: 69,
      image: '',
      quantity: 1,
      slug: 'enchufe-wifi-inteligente',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <>
      <style>{`
        /* ── SECTION BG ── */
        .fp-section {
          background: #080808;
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }

        /* ── ANIMATED GRID LINES ── */
        .fp-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
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
          background: linear-gradient(145deg, #0c1929, #0f2240, #0a1628);
          border: 1px solid rgba(37,99,235,0.15);
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
          border: 1px solid rgba(37,99,235,0.12);
          pointer-events: none;
        }
        .fp-ring-1 { width: 60%; height: 60%; animation: orbit1 20s linear infinite; }
        .fp-ring-2 { width: 82%; height: 82%; animation: orbit2 30s linear infinite; }

        /* Orbit dots on ring */
        .fp-ring::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 6px; height: 6px;
          background: rgba(37,99,235,0.5);
          border-radius: 50%;
        }

        /* ── ICON BOX ── */
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
          50%       { box-shadow: 0 0 0 16px rgba(37,99,235,0); }
        }
        .fp-icon-box {
          position: relative;
          width: 160px; height: 160px;
          background: rgba(37,99,235,0.12);
          border-radius: 40px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(37,99,235,0.35);
          animation: iconPulse 3s ease-in-out infinite;
          z-index: 2;
        }

        /* ── STATUS DOT ── */
        @keyframes statusPing {
          0%   { transform: scale(1); opacity: 1; }
          75%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .fp-status-ping {
          position: absolute;
          inset: 0; border-radius: 50%;
          background: #22c55e;
          animation: statusPing 2s cubic-bezier(0,0,0.2,1) infinite;
        }

        /* ── INFO CHIPS ── */
        .fp-chip {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 14px 20px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s ease;
          cursor: default;
        }
        .fp-chip:hover {
          border-color: rgba(37,99,235,0.3);
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
          background: rgba(37,99,235,0.08);
          border-color: rgba(37,99,235,0.2);
        }
        .fp-benefit:hover:not(.active) {
          background: rgba(255,255,255,0.03);
        }

        /* ── BUY BUTTON ── */
        .fp-buy-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FAFAF8;
          color: #080808;
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
          background: #2563EB;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          border-radius: inherit;
        }
        .fp-buy-btn:hover::before { transform: translateX(0); }
        .fp-buy-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 40px rgba(37,99,235,0.4);
        }
        .fp-buy-btn > * { position: relative; z-index: 1; }
        .fp-buy-btn:hover > * { color: #fff; }

        /* ── ADD CART BTN ── */
        .fp-cart-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #555;
          padding: 17px 28px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .fp-cart-btn:hover, .fp-cart-btn.added {
          background: rgba(34,197,94,0.1);
          border-color: rgba(34,197,94,0.3);
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

        {/* Ambient glows */}
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

          {/* Section label */}
          <div className={`fp-reveal fp-d1 ${visible ? 'fp-in' : ''}`} style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px', height: '1px',
                background: 'rgba(37,99,235,0.5)',
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#2563EB',
              }}>Producto estrella de la semana</span>
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

                {/* Center icon */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div className="fp-icon-box">
                    <Zap size={72} color="#2563EB" strokeWidth={1.5} />
                    {/* Status dot */}
                    <div style={{
                      position: 'absolute', top: '-10px', right: '-10px',
                      width: '22px', height: '22px',
                    }}>
                      <div className="fp-status-ping" />
                      <div style={{
                        position: 'absolute', inset: '4px',
                        background: '#22c55e', borderRadius: '50%',
                        border: '2px solid #080808',
                      }} />
                    </div>
                  </div>
                </div>

                {/* Chip: ahorro */}
                <div className="fp-chip" style={{ bottom: '28px', left: '28px' }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '9px', color: '#444',
                    letterSpacing: '0.12em', marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}>Ahorro mensual</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '32px', color: '#22c55e', lineHeight: 1,
                  }}>S/ 40</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    marginTop: '4px',
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} fill="#F59E0B" color="#F59E0B" />
                    ))}
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '9px', color: '#555', marginLeft: '2px',
                    }}>4.9</span>
                  </div>
                </div>

                {/* Chip: stock */}
                <div className="fp-chip" style={{ top: '28px', left: '28px' }}>
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
                      fontSize: '10px', color: '#888',
                      letterSpacing: '0.08em',
                    }}>50 en stock</span>
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
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#444',
                }}>Tech · Smart Home</span>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                  ))}
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', color: '#666', marginLeft: '6px',
                  }}>4.9 (24 reseñas)</span>
                </div>
              </div>

              {/* Title */}
              <div className={`fp-reveal fp-d3 ${visible ? 'fp-in' : ''}`}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(52px, 6vw, 84px)',
                  lineHeight: 0.88,
                  color: '#FAFAF8',
                  marginBottom: '32px',
                  letterSpacing: '-0.01em',
                }}>
                  ENCHUFE<br />
                  <span style={{ color: '#2563EB' }}>WiFi</span><br />
                  INTELIGENTE
                </div>
              </div>

              {/* Benefits — interactive tabs */}
              <div
                className={`fp-reveal fp-d4 ${visible ? 'fp-in' : ''}`}
                style={{ marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                {BENEFITS.map((b, i) => (
                  <div
                    key={b.text}
                    className={`fp-benefit ${activeTab === i ? 'active' : ''}`}
                    onClick={() => setActiveTab(i)}
                  >
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                      background: activeTab === i ? 'rgba(37,99,235,0.25)' : 'rgba(37,99,235,0.10)',
                      border: `1px solid ${activeTab === i ? 'rgba(37,99,235,0.5)' : 'rgba(37,99,235,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      marginTop: '1px',
                    }}>
                      <Check size={11} color={activeTab === i ? '#60A5FA' : '#2563EB'} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        color: activeTab === i ? '#E2E8F0' : '#888',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: activeTab === i ? 500 : 400,
                        lineHeight: 1.4,
                        transition: 'color 0.25s ease',
                      }}>{b.text}</p>
                      {activeTab === i && (
                        <p style={{
                          fontSize: '12px', color: '#60A5FA',
                          fontFamily: "'DM Mono', monospace",
                          marginTop: '3px', letterSpacing: '0.04em',
                          animation: 'priceIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
                        }}>{b.detail}</p>
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
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="fp-price-anim" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '80px', color: '#FAFAF8', lineHeight: 1,
                }}>S/69</span>
                <div>
                  <div style={{
                    fontSize: '18px', color: '#333',
                    textDecoration: 'line-through', fontFamily: "'DM Sans', sans-serif",
                  }}>S/99</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    background: 'rgba(37,99,235,0.15)',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: '100px',
                    padding: '3px 10px',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', letterSpacing: '0.08em',
                    color: '#60A5FA', marginTop: '4px',
                  }}>AHORRAS S/30</div>
                </div>
              </div>

              {/* CTAs */}
              <div className={`fp-reveal fp-d6 ${visible ? 'fp-in' : ''}`} style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center',
              }}>
                <Link href="/productos/enchufe-wifi-inteligente" className="fp-buy-btn">
                  <span>Comprar ahora</span>
                  <ArrowRight size={16} style={{ transition: 'color 0.3s' }} />
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
                {['🔒 Pago seguro', '📦 Envío en 2-3 días', '↩ 30 días devolución'].map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '10px', letterSpacing: '0.06em',
                    color: '#444', textTransform: 'uppercase',
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