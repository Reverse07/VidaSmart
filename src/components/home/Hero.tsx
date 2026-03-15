'use client'

import Link from 'next/link'
import { ArrowRight, PawPrint, Zap, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setLoaded(true)
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        /* ── HERO VARS ── */
        .hero-root {
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          --black:  #080808;
          --white:  #FAFAF8;
          --gray-2: #E2DED8;
          --gray-4: #7A7269;
          --blue:   #2563EB;
        }

        /* ── STAGGER REVEAL ── */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-d1 { transition-delay: 0.05s; }
        .reveal-d2 { transition-delay: 0.15s; }
        .reveal-d3 { transition-delay: 0.25s; }
        .reveal-d4 { transition-delay: 0.38s; }
        .reveal-d5 { transition-delay: 0.50s; }
        .reveal-d6 { transition-delay: 0.62s; }

        /* ── DISPLAY TYPE ── */
        .hero-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(88px, 16vw, 200px);
          line-height: 0.86;
          letter-spacing: -0.01em;
          color: var(--black);
          display: block;
        }

        /* ── BUTTONS ── */
        .hero-btn-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--black);
          color: var(--white);
          padding: 17px 36px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .hero-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--blue);
          border-radius: inherit;
          transform: translateX(-101%);
          transition: transform 0.4s var(--ease);
          z-index: 0;
        }
        .hero-btn-primary:hover::after { transform: translateX(0); }
        .hero-btn-primary:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(37,99,235,0.35);
        }
        .hero-btn-primary > * { position: relative; z-index: 1; }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--black);
          padding: 16px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: 1.5px solid var(--gray-2);
          text-decoration: none;
          transition: all 0.3s var(--ease);
        }
        .hero-btn-secondary:hover {
          border-color: var(--black);
          background: var(--black);
          color: var(--white);
          transform: scale(1.03);
        }

        /* ── FLOATING CARD ── */
        .price-card {
          transition: transform 0.12s ease-out;
        }

        /* ── STAT NUMBER ── */
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          line-height: 1;
          color: var(--black);
          display: block;
          transition: color 0.2s ease;
        }
        .stat-wrap:hover .stat-num { color: var(--blue); }

        /* ── BADGE PILL ── */
        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--white);
          border: 1px solid var(--gray-2);
          border-radius: 100px;
          padding: 6px 14px 6px 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #5C554E;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: all 0.25s var(--ease);
        }
        .badge-pill:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          transform: translateY(-1px);
        }

        /* ── SCROLL INDICATOR ── */
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
          50%       { transform: translateY(6px) scaleY(0.7); opacity: 1; }
        }
        .scroll-line {
          animation: scrollBob 2.2s ease-in-out infinite;
        }

        /* ── GLOW BLOB ── */
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(20px, -30px) scale(1.05); }
          66%       { transform: translate(-15px, 15px) scale(0.97); }
        }
        .glow-blob {
          animation: blobFloat 12s ease-in-out infinite;
        }

        /* ── MARQUEE TICKER ── */
        @keyframes tickerMove {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerMove 22s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }

        /* ── PRODUCT TAG ── */
        @keyframes tagPop {
          from { transform: scale(0.8) translateY(4px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .tag-pop {
          animation: tagPop 0.5s var(--ease) both;
        }

        /* ── GRID TEXTURE ── */
        .grid-texture {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.07) 1px, transparent 0);
          background-size: 28px 28px;
        }
      `}</style>

      <section
        ref={heroRef}
        className="hero-root"
        style={{
          minHeight: '100svh',
          position: 'relative',
          overflow: 'hidden',
          background: '#FAFAF8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── BACKGROUND LAYER ── */}
        <div className="grid-texture" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* ── AMBIENT GLOW BLOB ── */}
        <div
          className="glow-blob"
          style={{
            position: 'absolute',
            top: '15%', right: '8%',
            width: '480px', height: '480px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none',
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%', left: '5%',
            width: '320px', height: '320px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none',
            transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
            transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* ── MAIN CONTENT ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1400px', margin: '0 auto',
          padding: '80px 48px 0',
          width: '100%', flex: 1,
          display: 'flex', flexDirection: 'column',
        }}>

          {/* TOP ROW */}
          <div className={`reveal reveal-d1 ${loaded ? 'in' : ''}`} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '56px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                display: 'inline-block',
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#22C55E',
                boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#7A7269',
              }}>
                Colección 2026 — Perú
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-pill">
                <span style={{
                  width: '18px', height: '18px', background: '#EFF6FF',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Zap size={10} color="#2563EB" />
                </span>
                Smart Home
              </span>
              <span className="badge-pill">
                <span style={{
                  width: '18px', height: '18px', background: '#FFF7ED',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <PawPrint size={10} color="#D97706" />
                </span>
                Mascotas
              </span>
              <span className="badge-pill" style={{ gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} fill="#F59E0B" color="#F59E0B" />
                ))}
                <span style={{ marginLeft: '2px' }}>4.9</span>
              </span>
            </div>
          </div>

          {/* HEADLINE + FLOATING CARD */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <div style={{ position: 'relative' }}>
              {/* LINE 1 */}
              <div
                className={`reveal reveal-d2 ${loaded ? 'in' : ''}`}
                style={{ overflow: 'hidden' }}
              >
                <span className="hero-display">MEJORA</span>
              </div>

              {/* LINE 2 — TU + floating card */}
              <div
                className={`reveal reveal-d3 ${loaded ? 'in' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="hero-display">TU</span>

                {/* FLOATING PRICE CARD */}
                <div
                  className="price-card"
                  style={{
                    background: '#080808',
                    color: '#FAFAF8',
                    borderRadius: '22px',
                    padding: '22px 28px',
                    marginBottom: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    minWidth: '192px',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
                    transform: `translate(${mousePos.x * 0.06}px, ${mousePos.y * 0.06}px)`,
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '9px', color: '#555',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                  }}>Precio desde</span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '44px', lineHeight: 1, color: '#FAFAF8',
                  }}>S/ 49</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#22C55E', flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '11px', color: '#777', fontFamily: "'DM Sans', sans-serif" }}>
                      Envío gratis Lima
                    </span>
                  </div>
                </div>
              </div>

              {/* LINE 3 */}
              <div
                className={`reveal reveal-d4 ${loaded ? 'in' : ''}`}
                style={{ overflow: 'hidden' }}
              >
                <span className="hero-display" style={{ color: '#2563EB' }}>VIDA.</span>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div
              className={`reveal reveal-d5 ${loaded ? 'in' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: '52px',
                paddingTop: '40px',
                borderTop: '1px solid #E2DED8',
                flexWrap: 'wrap',
                gap: '32px',
                paddingBottom: '60px',
              }}
            >
              {/* LEFT: copy + CTAs */}
              <div style={{ maxWidth: '420px' }}>
                <p style={{
                  fontSize: '17px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: '#7A7269',
                  marginBottom: '32px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Gadgets inteligentes y accesorios para mascotas. Diseñados para simplificar tu día a día en el Perú.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/productos?cat=tech" className="hero-btn-primary">
                    <span>Explorar productos</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link href="/productos?cat=mascotas" className="hero-btn-secondary">
                    <PawPrint size={15} />
                    Para mascotas
                  </Link>
                </div>
              </div>

              {/* RIGHT: stats */}
              <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-end' }}>
                {[
                  { num: '500+', label: 'Clientes felices' },
                  { num: '4.9★', label: 'Calificación' },
                  { num: '2–3d', label: 'Envío Lima' },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="stat-wrap"
                    style={{
                      textAlign: 'center',
                      cursor: 'default',
                      padding: '8px',
                      borderRadius: '12px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#F2F1EF'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                  >
                    <span className="stat-num">{s.num}</span>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#A09890',
                      display: 'block',
                      marginTop: '6px',
                    }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM TICKER ── */}
        <div
          className={`reveal reveal-d6 ${loaded ? 'in' : ''}`}
          style={{
            position: 'relative', zIndex: 1,
            borderTop: '1px solid #E2DED8',
            background: 'rgba(250,250,248,0.8)',
            backdropFilter: 'blur(8px)',
            overflow: 'hidden',
            padding: '14px 0',
          }}
        >
          <div className="ticker-track">
            {[...Array(3)].flatMap(() => [
              { text: 'Envíos a todo el Perú', accent: false },
              { text: '✦', accent: true },
              { text: 'Paga con Yape', accent: false },
              { text: '✦', accent: true },
              { text: 'Garantía 30 días', accent: false },
              { text: '✦', accent: true },
              { text: 'Soporte WhatsApp 24/7', accent: false },
              { text: '✦', accent: true },
              { text: 'Envío gratis desde S/100', accent: false },
              { text: '✦', accent: true },
              { text: 'Calidad premium', accent: false },
              { text: '✦', accent: true },
            ]).map((item, i) => (
              <span key={i} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: item.accent ? '0.05em' : '0.1em',
                textTransform: 'uppercase',
                color: item.accent ? '#C8C3BB' : '#7A7269',
                padding: item.accent ? '0 16px' : '0 24px',
                whiteSpace: 'nowrap',
              }}>{item.text}</span>
            ))}
          </div>
        </div>

        {/* ── SCROLL HINT ── */}
        <div style={{
          position: 'absolute',
          bottom: '72px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '6px',
          zIndex: 2, opacity: 0.5,
          pointerEvents: 'none',
        }}>
          <div className="scroll-line" style={{
            width: '1px', height: '44px',
            background: 'linear-gradient(to bottom, #7A7269, transparent)',
          }} />
        </div>
      </section>
    </>
  )
}