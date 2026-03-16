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
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        .hero-root {
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          --black: #080808;
          --white: #FAFAF8;
          --gray-2: #E2DED8;
          --blue: #2563EB;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.05s; }
        .reveal-d2 { transition-delay: 0.15s; }
        .reveal-d3 { transition-delay: 0.25s; }
        .reveal-d4 { transition-delay: 0.38s; }
        .reveal-d5 { transition-delay: 0.50s; }
        .reveal-d6 { transition-delay: 0.62s; }

        .hero-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 9vw, 140px);
          line-height: 0.86;
          letter-spacing: -0.01em;
          color: var(--black);
          display: block;
        }

        .hero-btn-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--black);
          color: var(--white);
          padding: 16px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .hero-btn-primary::after {
          content: '';
          position: absolute; inset: 0;
          background: var(--blue);
          border-radius: inherit;
          transform: translateX(-101%);
          transition: transform 0.4s var(--ease);
          z-index: 0;
        }
        .hero-btn-primary:hover::after { transform: translateX(0); }
        .hero-btn-primary:hover { transform: scale(1.03); box-shadow: 0 8px 32px rgba(37,99,235,0.35); }
        .hero-btn-primary > * { position: relative; z-index: 1; }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--black);
          padding: 15px 28px;
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
        .badge-pill:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); transform: translateY(-1px); }

        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 44px;
          line-height: 1;
          color: var(--black);
          display: block;
          transition: color 0.2s ease;
        }
        .stat-wrap:hover .stat-num { color: var(--blue); }

        @keyframes scrollBob {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
          50%       { transform: translateY(6px) scaleY(0.7); opacity: 1; }
        }
        .scroll-line { animation: scrollBob 2.2s ease-in-out infinite; }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(20px,-30px) scale(1.05); }
          66%       { transform: translate(-15px,15px) scale(0.97); }
        }
        .glow-blob { animation: blobFloat 12s ease-in-out infinite; }

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

        /* ── HERO IMAGE ── */
        .hero-img-wrap {
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08);
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          height: 580px;
        }
        .hero-img-wrap:hover { transform: scale(1.015); }
        .hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-img-badge {
          position: absolute;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 20px;
          padding: 14px 20px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.10);
        }

        /* ── LAYOUT ── */
        .hero-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
          flex: 1;
          padding-bottom: 60px;
        }

        @media (max-width: 960px) {
          .hero-main-grid { grid-template-columns: 1fr !important; }
          .hero-img-col { display: none !important; }
          .hero-display { font-size: clamp(64px, 18vw, 120px) !important; }
        }

        @media (max-width: 600px) {
          .hero-top-row { flex-direction: column !important; align-items: flex-start !important; }
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
        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.055) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        {/* Glow blob azul */}
        <div className="glow-blob" style={{
          position: 'absolute', top: '8%', right: '3%',
          width: '520px', height: '520px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }} />

        {/* Glow blob ámbar */}
        <div style={{
          position: 'absolute', bottom: '15%', left: '2%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
          transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * -0.15}px)`,
          transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1)',
        }} />

        {/* ── CONTENIDO ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '1400px', margin: '0 auto',
          padding: '72px 48px 0',
          width: '100%', flex: 1,
          display: 'flex', flexDirection: 'column',
        }}>

          {/* TOP ROW */}
          <div
            className={`hero-top-row reveal reveal-d1 ${loaded ? 'in' : ''}`}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '48px', flexWrap: 'wrap', gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                display: 'inline-block', width: '6px', height: '6px',
                borderRadius: '50%', background: '#22C55E',
                boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7269',
              }}>Colección 2026 — Perú</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-pill">
                <span style={{ width: '18px', height: '18px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={10} color="#2563EB" />
                </span>
                Smart Home
              </span>
              <span className="badge-pill">
                <span style={{ width: '18px', height: '18px', background: '#FFF7ED', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PawPrint size={10} color="#D97706" />
                </span>
                Mascotas
              </span>
              <span className="badge-pill" style={{ gap: '4px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={9} fill="#F59E0B" color="#F59E0B" />)}
                <span style={{ marginLeft: '2px' }}>4.9</span>
              </span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="hero-main-grid">

            {/* COLUMNA IZQUIERDA — texto */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

              <div className={`reveal reveal-d2 ${loaded ? 'in' : ''}`}>
                <span className="hero-display">MEJORA</span>
              </div>
              <div className={`reveal reveal-d3 ${loaded ? 'in' : ''}`}>
                <span className="hero-display">TU</span>
              </div>
              <div className={`reveal reveal-d4 ${loaded ? 'in' : ''}`}>
                <span className="hero-display" style={{ color: '#2563EB' }}>VIDA.</span>
              </div>

              <div className={`reveal reveal-d5 ${loaded ? 'in' : ''}`} style={{
                marginTop: '36px', paddingTop: '32px',
                borderTop: '1px solid #E2DED8',
              }}>
                <p style={{
                  fontSize: '16px', fontWeight: 300, lineHeight: 1.7,
                  color: '#7A7269', marginBottom: '28px',
                  fontFamily: "'DM Sans', sans-serif", maxWidth: '400px',
                }}>
                  Gadgets inteligentes y accesorios para mascotas. Diseñados para simplificar tu día a día en el Perú.
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
                  <Link href="/productos?cat=tech" className="hero-btn-primary">
                    <span>Explorar productos</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link href="/productos?cat=mascotas" className="hero-btn-secondary">
                    <PawPrint size={15} />
                    Para mascotas
                  </Link>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                  {[
                    { num: '500+', label: 'Clientes' },
                    { num: '4.9★', label: 'Rating' },
                    { num: '2–3d', label: 'Envío Lima' },
                  ].map(s => (
                    <div key={s.label} className="stat-wrap" style={{
                      textAlign: 'center', cursor: 'default',
                      padding: '8px 12px', borderRadius: '12px',
                      transition: 'background 0.2s ease',
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#F2F1EF'}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                    >
                      <span className="stat-num">{s.num}</span>
                      <span style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '10px',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#A09890', display: 'block', marginTop: '4px',
                      }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA — imagen */}
            <div
              className={`hero-img-col reveal reveal-d3 ${loaded ? 'in' : ''}`}
              style={{
                position: 'relative',
                transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)`,
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div className="hero-img-wrap">
                <img
                  src="/img/imagenHero.jpg"
                  alt="VidaSmart — tecnología y mascotas"
                />
                {/* Overlay gradient bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '35%',
                  background: 'linear-gradient(to top, rgba(250,250,248,0.35), transparent)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Badge precio — bottom left */}
              <div
                className="hero-img-badge"
                style={{
                  bottom: '28px', left: '-20px',
                  transform: `translate(${mousePos.x * -0.07}px, ${mousePos.y * -0.07}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '9px',
                  color: '#A09890', letterSpacing: '0.12em',
                  textTransform: 'uppercase', marginBottom: '5px',
                }}>Precio desde</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '38px', color: '#080808', lineHeight: 1,
                }}>S/ 49</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: '#7A7269', fontFamily: "'DM Sans', sans-serif" }}>
                    Envío gratis Lima
                  </span>
                </div>
              </div>

              {/* Badge rating — top right */}
              <div
                className="hero-img-badge"
                style={{
                  top: '20px', right: '-16px',
                  transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
                  transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div style={{ display: 'flex', gap: '2px', marginBottom: '5px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '26px', color: '#080808', lineHeight: 1,
                }}>4.9 / 5.0</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '9px',
                  color: '#A09890', letterSpacing: '0.1em', marginTop: '4px',
                  textTransform: 'uppercase',
                }}>+500 reseñas</div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM TICKER */}
        <div className={`reveal reveal-d6 ${loaded ? 'in' : ''}`} style={{
          position: 'relative', zIndex: 1,
          borderTop: '1px solid #E2DED8',
          background: 'rgba(250,250,248,0.85)',
          backdropFilter: 'blur(8px)',
          overflow: 'hidden',
          padding: '13px 0',
        }}>
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

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '68px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          zIndex: 2, opacity: 0.35, pointerEvents: 'none',
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