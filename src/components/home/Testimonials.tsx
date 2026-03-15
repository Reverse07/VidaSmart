'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Valeria M.',
    city: 'Lima',
    initials: 'VM',
    review: 'El enchufe WiFi cambió mi rutina completamente. Ahora controlo todo desde el celular. Llegó en 3 días y el empaque era increíble.',
    product: 'Enchufe WiFi Inteligente',
    rating: 5,
    verified: true,
    date: 'Hace 2 semanas',
    gradient: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
  },
  {
    name: 'Carlos R.',
    city: 'Miraflores',
    initials: 'CR',
    review: 'Mi perro Toby ama el bebedero portátil. Ya no me preocupo por el agua en los paseos. Producto de primera calidad, muy bien terminado.',
    product: 'Bebedero Portátil',
    rating: 5,
    verified: true,
    date: 'Hace 1 mes',
    gradient: 'linear-gradient(135deg, #92400e, #d97706)',
  },
  {
    name: 'Andrea P.',
    city: 'San Isidro',
    initials: 'AP',
    review: 'Las tiras LED transformaron mi cuarto. La app funciona perfecto y los colores son increíblemente vibrantes. 100% recomendado.',
    product: 'Tira LED RGB Smart',
    rating: 5,
    verified: true,
    date: 'Hace 3 semanas',
    gradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
  },
  {
    name: 'Diego F.',
    city: 'Surco',
    initials: 'DF',
    review: 'El soporte para laptop me salvó la espalda. Trabajo desde casa y la diferencia es abismal. La construcción es sólida y elegante.',
    product: 'Soporte Laptop Ergonómico',
    rating: 5,
    verified: true,
    date: 'Hace 1 semana',
    gradient: 'linear-gradient(135deg, #064e3b, #16a34a)',
  },
  {
    name: 'Lucía T.',
    city: 'Barranco',
    initials: 'LT',
    review: 'El cepillo auto-limpiante es un antes y después para mi gata. Limpio en segundos, sin pelusa en las manos. Excelente compra.',
    product: 'Cepillo Auto-Limpiante',
    rating: 5,
    verified: true,
    date: 'Hace 5 días',
    gradient: 'linear-gradient(135deg, #831843, #db2777)',
  },
]

const STATS = [
  { num: '500+', label: 'Clientes satisfechos' },
  { num: '4.9',  label: 'Calificación promedio' },
  { num: '98%',  label: 'Recomendarían VidaSmart' },
  { num: '2–3d', label: 'Tiempo de entrega Lima' },
]

export default function Testimonials() {
  const [visible, setVisible]     = useState(false)
  const [active, setActive]       = useState(0)
  const [isHover, setIsHover]     = useState(false)
  const sectionRef                = useRef<HTMLElement>(null)
  const trackRef                  = useRef<HTMLDivElement>(null)
  const autoRef                   = useRef<NodeJS.Timeout | null>(null)

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-advance
  useEffect(() => {
    if (isHover) return
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % REVIEWS.length)
    }, 5000)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [isHover, active])

  const go = (dir: 1 | -1) => {
    if (autoRef.current) clearInterval(autoRef.current)
    setActive(prev => (prev + dir + REVIEWS.length) % REVIEWS.length)
  }

  return (
    <>
      <style>{`
        /* ── STAGGER ── */
        .tm-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .tm-reveal.tm-in { opacity: 1; transform: translateY(0); }
        .tm-d1 { transition-delay: 0.05s; }
        .tm-d2 { transition-delay: 0.18s; }
        .tm-d3 { transition-delay: 0.30s; }
        .tm-d4 { transition-delay: 0.42s; }

        /* ── MAIN CARD ── */
        .tm-main-card {
          background: #fff;
          border: 1px solid #E2DED8;
          border-radius: 32px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: box-shadow 0.4s ease;
        }
        .tm-main-card:hover {
          box-shadow: 0 24px 64px rgba(0,0,0,0.07);
        }

        /* ── QUOTE ICON ── */
        .tm-quote {
          position: absolute;
          top: 32px; right: 36px;
          opacity: 0.06;
        }

        /* ── REVIEW TEXT ── */
        @keyframes reviewIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tm-text-anim {
          animation: reviewIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── AVATAR ── */
        .tm-avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          color: #fff;
          flex-shrink: 0;
          position: relative;
        }
        .tm-avatar::after {
          content: '✓';
          position: absolute;
          bottom: -2px; right: -2px;
          width: 16px; height: 16px;
          background: #22c55e;
          border: 2px solid #FAFAF8;
          border-radius: 50%;
          font-size: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          line-height: 1;
        }

        /* ── THUMBNAIL CARD ── */
        .tm-thumb {
          background: #F5F3EF;
          border: 1px solid #E2DED8;
          border-radius: 20px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .tm-thumb:hover {
          border-color: #C8C3BB;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .tm-thumb.tm-thumb-active {
          background: #fff;
          border-color: #080808;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .tm-thumb-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: #080808;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 5s linear;
        }
        .tm-thumb.tm-thumb-active .tm-thumb-bar {
          transform: scaleX(1);
        }

        /* ── NAV BUTTONS ── */
        .tm-nav-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid #E2DED8;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #7A7269;
        }
        .tm-nav-btn:hover {
          border-color: #080808;
          background: #080808;
          color: #fff;
        }

        /* ── STAT CARD ── */
        .tm-stat {
          padding: 24px;
          border-radius: 20px;
          background: #F5F3EF;
          border: 1px solid #E2DED8;
          text-align: center;
          transition: all 0.25s ease;
        }
        .tm-stat:hover {
          background: #fff;
          border-color: #C8C3BB;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .tm-grid { grid-template-columns: 1fr !important; }
          .tm-thumbs { display: none !important; }
        }
      `}</style>

      <section ref={sectionRef} style={{ padding: '140px 0', background: '#FAFAF8', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

          {/* ── HEADER ── */}
          <div
            className={`tm-reveal tm-d1 ${visible ? 'tm-in' : ''}`}
            style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '64px', flexWrap: 'wrap', gap: '24px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '1px', background: '#C8C3BB' }} />
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: '#A09890',
                }}>Clientes reales · Opiniones verificadas</span>
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                lineHeight: 0.88, color: '#080808',
              }}>
                +500 VIDAS<br />
                <span style={{ color: '#A09890' }}>SIMPLIFICADAS</span>
              </div>
            </div>

            {/* Stars aggregate */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px',
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '48px', color: '#080808', lineHeight: 1,
              }}>4.9</span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#A09890',
              }}>de 5.0 · 127 reseñas</span>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div
            className={`tm-grid tm-reveal tm-d2 ${visible ? 'tm-in' : ''}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            {/* Featured card */}
            <div
              className="tm-main-card"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {/* Quote watermark */}
              <Quote size={120} className="tm-quote" />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {[...Array(REVIEWS[active].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px', color: '#A09890',
                  marginLeft: '8px', alignSelf: 'center',
                  letterSpacing: '0.08em',
                }}>Compra verificada</span>
              </div>

              {/* Review text */}
              <p
                key={active}
                className="tm-text-anim"
                style={{
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: '#080808',
                  flex: 1,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '-0.01em',
                }}
              >
                "{REVIEWS[active].review}"
              </p>

              {/* Author row */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '32px', paddingTop: '24px',
                borderTop: '1px solid #E2DED8',
                flexWrap: 'wrap', gap: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    className="tm-avatar"
                    style={{ background: REVIEWS[active].gradient }}
                  >
                    {REVIEWS[active].initials}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '15px', fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif", color: '#080808',
                    }}>{REVIEWS[active].name}</div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '11px', color: '#A09890',
                      letterSpacing: '0.06em',
                    }}>{REVIEWS[active].city} · {REVIEWS[active].product}</div>
                  </div>
                </div>

                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '10px', color: '#C8C3BB',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{REVIEWS[active].date}</div>
              </div>
            </div>

            {/* Thumbnail stack */}
            <div
              className="tm-thumbs"
              ref={trackRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {REVIEWS.map((r, i) => (
                <div
                  key={r.name}
                  className={`tm-thumb ${active === i ? 'tm-thumb-active' : ''}`}
                  onClick={() => { if (autoRef.current) clearInterval(autoRef.current); setActive(i) }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div
                      className="tm-avatar"
                      style={{
                        background: r.gradient,
                        width: '36px', height: '36px', fontSize: '14px',
                        flexShrink: 0,
                      }}
                    >{r.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
                        {[...Array(r.rating)].map((_, j) => (
                          <Star key={j} size={10} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                      <p style={{
                        fontSize: '12px', color: active === i ? '#080808' : '#7A7269',
                        lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif",
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        transition: 'color 0.25s ease',
                      }}>{r.review}</p>
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '10px', color: '#C8C3BB',
                        marginTop: '6px', letterSpacing: '0.06em',
                      }}>{r.name} · {r.city}</div>
                    </div>
                  </div>
                  <div className="tm-thumb-bar" />
                </div>
              ))}
            </div>
          </div>

          {/* ── NAV + DOTS ── */}
          <div
            className={`tm-reveal tm-d3 ${visible ? 'tm-in' : ''}`}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: '64px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (autoRef.current) clearInterval(autoRef.current); setActive(i) }}
                  style={{
                    width: active === i ? '28px' : '8px',
                    height: '8px', borderRadius: '4px',
                    border: 'none', padding: 0, cursor: 'pointer',
                    background: active === i ? '#080808' : '#D4D0CA',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="tm-nav-btn" onClick={() => go(-1)}>
                <ChevronLeft size={18} />
              </button>
              <button className="tm-nav-btn" onClick={() => go(1)}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* ── STATS BAR ── */}
          <div
            className={`tm-reveal tm-d4 ${visible ? 'tm-in' : ''}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="tm-stat">
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '44px', color: '#080808', lineHeight: 1,
                  marginBottom: '8px',
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '10px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#A09890',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}