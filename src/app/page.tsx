'use client'

import Link from 'next/link'
import {
  ShoppingBag, PawPrint, Zap, Shield,
  Headphones, Truck, Star, ArrowRight,
  Check, Plus, ChevronRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --black: #080808;
          --white: #fafaf8;
          --gray-1: #f2f1ef;
          --gray-2: #e8e6e1;
          --gray-3: #b0aca4;
          --gray-4: #6b6760;
          --accent: #2563eb;
          --accent-light: #eff6ff;
          --serif-display: 'Bebas Neue', sans-serif;
          --sans: 'DM Sans', sans-serif;
          --mono: 'DM Mono', monospace;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: var(--sans);
          background: var(--white);
          color: var(--black);
          -webkit-font-smoothing: antialiased;
        }

        /* ── MARQUEE ── */
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* ── HERO NUMBER ── */
        .hero-display {
          font-family: var(--serif-display);
          font-size: clamp(96px, 18vw, 220px);
          line-height: 0.88;
          letter-spacing: -0.01em;
          color: var(--black);
        }

        /* ── PRODUCT CARD HOVER ── */
        .prod-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .prod-card:hover { transform: translateY(-6px); }
        .prod-card .card-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .prod-card:hover .card-img { transform: scale(1.04); }
        .prod-card .card-btn {
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .prod-card:hover .card-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── LINK UNDERLINE ANIM ── */
        .link-hover {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--black);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .link-hover:hover::after { width: 100%; }

        /* ── TESTIMONIAL ── */
        .testimonial-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        /* ── CTA BTN ── */
        .btn-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--black);
          color: var(--white);
          padding: 16px 32px;
          border-radius: 100px;
          font-family: var(--sans);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.01em;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: inherit;
        }
        .btn-primary:hover::before { transform: translateY(0); }
        .btn-primary span, .btn-primary svg { position: relative; z-index: 1; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--black);
          padding: 15px 32px;
          border-radius: 100px;
          font-family: var(--sans);
          font-weight: 600;
          font-size: 14px;
          border: 1.5px solid var(--gray-2);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-secondary:hover {
          border-color: var(--black);
          background: var(--black);
          color: var(--white);
        }

        /* ── SECTION LABEL ── */
        .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gray-4);
        }

        /* ── FEATURE ROW ── */
        .feature-row {
          border-top: 1px solid var(--gray-2);
          transition: background 0.3s ease;
        }
        .feature-row:hover { background: var(--gray-1); }

        /* ── NUMBER ACCENT ── */
        .num-accent {
          font-family: var(--serif-display);
          font-size: 13px;
          color: var(--gray-3);
          letter-spacing: 0.05em;
        }
      `}</style>

      <div style={{ background: 'var(--white)', color: 'var(--black)' }}>

        {/* ══════════════════════════════════════
            MARQUEE BAR
        ══════════════════════════════════════ */}
        <div style={{
          background: 'var(--black)',
          color: 'var(--white)',
          overflow: 'hidden',
          padding: '10px 0',
          borderBottom: '1px solid #1a1a1a'
        }}>
          <div className="marquee-track">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap' }}>
                {['ENVÍOS A TODO EL PERÚ', 'PAGO CON YAPE', 'GARANTÍA 30 DÍAS', 'SOPORTE WHATSAPP 24/7', 'MERCADO PAGO', 'CALIDAD PREMIUM', 'ENVÍOS A TODO EL PERÚ', 'PAGO CON YAPE', 'GARANTÍA 30 DÍAS', 'SOPORTE WHATSAPP 24/7',].map((t, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    padding: '0 32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    color: '#888'
                  }}>
                    <span style={{ color: 'var(--white)' }}>{t}</span>
                    <span style={{ fontSize: '6px', color: '#444' }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            HERO — Editorial brutal
        ══════════════════════════════════════ */}
        <section style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--white)',
          padding: '80px 0 0'
        }}>
          {/* Background texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--gray-2) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
            opacity: 0.5
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '0 48px', width: '100%' }}>

            {/* Label row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <span className="label">Colección 2026 — Tech + Mascotas</span>
              <span className="label" style={{ color: 'var(--accent)' }}>● Lima, Perú</span>
            </div>

            {/* BIG TYPE */}
            <div style={{ marginBottom: '0' }}>
              <div className="hero-display">MEJORA</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '32px' }}>
                <div className="hero-display">TU</div>
                {/* Floating card */}
                <div style={{
                  background: 'var(--black)',
                  color: 'var(--white)',
                  borderRadius: '20px',
                  padding: '20px 28px',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '200px'
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: '#666', letterSpacing: '0.1em' }}>PRECIO DESDE</span>
                  <span style={{ fontFamily: 'var(--serif-display)', fontSize: '42px', lineHeight: 1, color: 'var(--white)' }}>S/ 49</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>Envío gratis en Lima</span>
                </div>
              </div>
              <div className="hero-display" style={{ color: 'var(--accent)' }}>VIDA.</div>
            </div>

            {/* Sub + CTA */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: '48px',
              paddingTop: '48px',
              borderTop: '1px solid var(--gray-2)',
              flexWrap: 'wrap',
              gap: '32px'
            }}>
              <div style={{ maxWidth: '440px' }}>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: 'var(--gray-4)',
                  marginBottom: '32px'
                }}>
                  Tecnología inteligente y productos para mascotas. Diseñados para simplificar tu día a día en Perú.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/productos?cat=tech" className="btn-primary">
                    <span>Explorar productos</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/productos?cat=mascotas" className="btn-secondary">
                    <PawPrint size={16} />
                    Para mascotas
                  </Link>
                </div>
              </div>

              {/* Stats verticales */}
              <div style={{ display: 'flex', gap: '48px' }}>
                {[
                  { num: '500+', label: 'Clientes' },
                  { num: '4.9', label: 'Rating' },
                  { num: '8', label: 'Productos' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--serif-display)',
                      fontSize: '56px',
                      lineHeight: 1,
                      color: 'var(--black)'
                    }}>{s.num}</div>
                    <div className="label" style={{ marginTop: '8px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom scroll hint */}
          <div style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
          }}>
            <div style={{
              width: '1px', height: '48px',
              background: 'linear-gradient(to bottom, var(--gray-3), transparent)',
              animation: 'scrollLine 2s ease-in-out infinite'
            }} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            CATEGORÍAS — Full bleed split
        ══════════════════════════════════════ */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
          {/* Tech */}
          <Link href="/productos?cat=tech" style={{
            textDecoration: 'none',
            background: 'var(--black)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '400px',
            cursor: 'pointer'
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 70% 30%, #1e3a8a22, transparent 60%)'
            }} />
            <div style={{
              position: 'absolute', top: '48px', right: '48px',
              width: '120px', height: '120px',
              background: 'rgba(37, 99, 235, 0.15)',
              borderRadius: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(37,99,235,0.3)'
            }}>
              <Zap size={48} color="#2563eb" />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="label" style={{ color: '#444' }}>01 — Tecnología</span>
              <div style={{
                fontFamily: 'var(--serif-display)',
                fontSize: 'clamp(48px, 6vw, 80px)',
                color: 'var(--white)',
                lineHeight: 0.9,
                margin: '16px 0 24px'
              }}>SMART<br />HOME</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px', fontWeight: 500 }}>
                <span>Ver colección</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </Link>

          {/* Mascotas */}
          <Link href="/productos?cat=mascotas" style={{
            textDecoration: 'none',
            background: 'var(--gray-1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '400px',
            cursor: 'pointer'
          }}>
            <div style={{
              position: 'absolute', top: '48px', right: '48px',
              width: '120px', height: '120px',
              background: 'rgba(245, 158, 11, 0.12)',
              borderRadius: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(245,158,11,0.25)'
            }}>
              <PawPrint size={48} color="#d97706" />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="label">02 — Mascotas</span>
              <div style={{
                fontFamily: 'var(--serif-display)',
                fontSize: 'clamp(48px, 6vw, 80px)',
                color: 'var(--black)',
                lineHeight: 0.9,
                margin: '16px 0 24px'
              }}>PET<br />SMART</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-4)', fontSize: '13px', fontWeight: 500 }}>
                <span>Ver colección</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </Link>
        </section>

        {/* ══════════════════════════════════════
            PRODUCTOS — Grid editorial
        ══════════════════════════════════════ */}
        <section style={{ padding: '120px 0', background: 'var(--white)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'flex-end',
              marginBottom: '64px',
              borderBottom: '1px solid var(--gray-2)',
              paddingBottom: '32px'
            }}>
              <div>
                <span className="label">Más vendidos</span>
                <div style={{
                  fontFamily: 'var(--serif-display)',
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  lineHeight: 0.9,
                  marginTop: '12px'
                }}>PRODUCTOS<br />ESTRELLA</div>
              </div>
              <Link href="/productos" className="link-hover" style={{
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '14px',
                color: 'var(--black)',
                paddingBottom: '4px'
              }}>
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>

            {/* Grid asimétrico */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { name: 'Enchufe WiFi Inteligente', price: 69, old: 99, cat: 'Tech', tag: 'Más vendido', bg: '#f0f4ff', icon: <Zap size={48} color="#2563eb" />, desc: 'Control desde tu celular' },
                { name: 'Tira LED RGB Smart 3m', price: 99, old: 139, cat: 'Tech', tag: 'Nuevo', bg: '#f5f0ff', icon: <Zap size={48} color="#7c3aed" />, desc: 'Transforma tu espacio' },
                { name: 'Bebedero Portátil', price: 49, old: 69, cat: 'Mascotas', tag: 'Popular', bg: '#fff7ed', icon: <PawPrint size={48} color="#d97706" />, desc: 'Hidratación en cualquier lugar' },
                { name: 'Cepillo Auto-Limpiante', price: 69, old: 89, cat: 'Mascotas', tag: 'Top rated', bg: '#f0fdf4', icon: <PawPrint size={48} color="#16a34a" />, desc: 'Limpieza en 1 segundo' },
              ].map((p, i) => (
                <div key={p.name} className="prod-card" style={{
                  background: 'var(--white)',
                  border: '1px solid var(--gray-2)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  gridRow: i === 0 ? 'span 1' : 'span 1'
                }}>
                  {/* Image area */}
                  <div className="card-img" style={{
                    background: p.bg,
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '80px', height: '80px',
                      background: 'rgba(255,255,255,0.8)',
                      borderRadius: '20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(8px)'
                    }}>
                      {p.icon}
                    </div>
                    {/* Tag */}
                    <div style={{
                      position: 'absolute', top: '16px', left: '16px',
                      background: 'var(--black)',
                      color: 'var(--white)',
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      padding: '4px 10px',
                      borderRadius: '100px'
                    }}>{p.tag}</div>
                    {/* Descuento */}
                    <div style={{
                      position: 'absolute', top: '16px', right: '16px',
                      background: 'var(--accent)',
                      color: 'var(--white)',
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      padding: '4px 8px',
                      borderRadius: '100px'
                    }}>-{Math.round((1 - p.price / p.old) * 100)}%</div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '20px' }}>
                    <div className="label" style={{ marginBottom: '6px' }}>{p.cat}</div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.3 }}>{p.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--gray-4)', marginBottom: '16px' }}>{p.desc}</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontFamily: 'var(--serif-display)', fontSize: '28px', color: 'var(--black)' }}>S/{p.price}</span>
                        <span style={{ fontSize: '12px', color: 'var(--gray-3)', textDecoration: 'line-through' }}>S/{p.old}</span>
                      </div>
                      <button className="card-btn" style={{
                        background: 'var(--black)',
                        color: 'var(--white)',
                        border: 'none',
                        borderRadius: '100px',
                        padding: '10px 18px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--sans)'
                      }}>
                        <Plus size={14} /> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PROBLEMA → SOLUCIÓN — Row list
        ══════════════════════════════════════ */}
        <section style={{ background: 'var(--gray-1)', padding: '120px 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-start' }}>
              {/* Left — sticky label */}
              <div style={{ position: 'sticky', top: '120px' }}>
                <span className="label">El problema que resolvemos</span>
                <div style={{
                  fontFamily: 'var(--serif-display)',
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  lineHeight: 0.9,
                  margin: '20px 0 32px',
                  color: 'var(--black)'
                }}>TU VIDA,<br />SIMPLIFICADA.</div>
                <p style={{ fontSize: '16px', fontWeight: 300, color: 'var(--gray-4)', lineHeight: 1.7, maxWidth: '360px' }}>
                  Cada producto resuelve un problema real. Sin complicaciones, sin manuales largos, sin frustración.
                </p>
              </div>

              {/* Right — feature rows */}
              <div>
                {[
                  { num: '01', problem: 'Cables desordenados en tu escritorio', solution: 'Organizador de cables inteligente', desc: 'Orden instantáneo. Compatible con todos tus dispositivos. Instálalo en 2 minutos.' },
                  { num: '02', problem: 'Tu mascota sin agua en los paseos', solution: 'Bebedero portátil anti-derrame', desc: 'Siempre hidratado. Cabe en cualquier bolso. Un botón para servir el agua.' },
                  { num: '03', problem: 'Luces que olvidas apagar', solution: 'Enchufe WiFi con control remoto', desc: 'Ahorra energía. Controla desde cualquier lugar. Compatible con Alexa.' },
                  { num: '04', problem: 'Pelo de mascota por todas partes', solution: 'Cepillo auto-limpiante', desc: 'Un botón limpia el cepillo en 1 segundo. Sin ensuciar tus manos.' },
                ].map((item) => (
                  <div key={item.num} className="feature-row" style={{ padding: '28px 0', cursor: 'default' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                      <span className="num-accent">{item.num}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '12px', color: 'var(--gray-3)', marginBottom: '8px', fontStyle: 'italic' }}>
                          ✗ {item.problem}
                        </p>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--black)' }}>
                          ✓ {item.solution}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-4)', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                      <ChevronRight size={16} color="var(--gray-3)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRODUCTO DESTACADO — Full bleed
        ══════════════════════════════════════ */}
        <section style={{ background: 'var(--black)', padding: '120px 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

              {/* Visual */}
              <div style={{
                background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
                borderRadius: '32px',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #1e3a8a44'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '300px', height: '300px',
                  background: 'radial-gradient(circle, #2563eb22, transparent)',
                  borderRadius: '50%'
                }} />
                <div style={{
                  width: '160px', height: '160px',
                  background: 'rgba(37, 99, 235, 0.15)',
                  borderRadius: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(37,99,235,0.4)',
                  position: 'relative'
                }}>
                  <Zap size={72} color="#2563eb" />
                  {/* Ping */}
                  <div style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    width: '24px', height: '24px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    border: '3px solid var(--black)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} />
                  </div>
                </div>
                {/* Floating info chips */}
                <div style={{
                  position: 'absolute', bottom: '32px', left: '32px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  backdropFilter: 'blur(12px)'
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: '#666', marginBottom: '4px' }}>AHORRO MENSUAL</div>
                  <div style={{ fontFamily: 'var(--serif-display)', fontSize: '28px', color: '#22c55e' }}>S/ 40</div>
                </div>
              </div>

              {/* Copy */}
              <div>
                <span className="label" style={{ color: '#444' }}>Producto estrella · Tech</span>
                <div style={{
                  fontFamily: 'var(--serif-display)',
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  lineHeight: 0.9,
                  color: 'var(--white)',
                  margin: '20px 0 32px'
                }}>ENCHUFE<br />WiFi<br />INTELIGENTE</div>

                <ul style={{ listStyle: 'none', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    'Control desde cualquier celular',
                    'Compatible con Alexa y Google Home',
                    'Programa horarios automáticos',
                    'Monitorea el consumo eléctrico en tiempo real',
                  ].map(b => (
                    <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#888' }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: 'rgba(37,99,235,0.2)', border: '1px solid #2563eb44',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Check size={10} color="#2563eb" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '40px' }}>
                  <span style={{ fontFamily: 'var(--serif-display)', fontSize: '72px', color: 'var(--white)', lineHeight: 1 }}>S/69</span>
                  <span style={{ color: '#444', textDecoration: 'line-through', fontSize: '20px' }}>S/99</span>
                  <span style={{
                    background: '#2563eb',
                    color: 'var(--white)',
                    fontFamily: 'var(--mono)',
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '100px'
                  }}>AHORRAS S/30</span>
                </div>

                <Link href="/productos/enchufe-wifi-inteligente" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--white)',
                  color: 'var(--black)',
                  padding: '18px 40px',
                  borderRadius: '100px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  Comprar ahora <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIOS — Masonry style
        ══════════════════════════════════════ */}
        <section style={{ padding: '120px 0', background: 'var(--white)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '64px' }}>
              <div>
                <span className="label">Clientes reales</span>
                <div style={{
                  fontFamily: 'var(--serif-display)',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  lineHeight: 0.9,
                  marginTop: '12px'
                }}>+500 VIDAS<br />SIMPLIFICADAS</div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />)}
                <span style={{ marginLeft: '8px', fontWeight: 700 }}>4.9</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { name: 'Valeria M.', city: 'Lima', review: 'El enchufe WiFi cambió mi rutina completamente. Ahora controlo todo desde el celular. Llegó en 3 días y el empaque era increíble.', product: 'Enchufe WiFi Inteligente', rating: 5 },
                { name: 'Carlos R.', city: 'Miraflores', review: 'Mi perro Toby ama el bebedero portátil. Ya no me preocupo por el agua en los paseos. Producto de primera calidad.', product: 'Bebedero Portátil', rating: 5 },
                { name: 'Andrea P.', city: 'San Isidro', review: 'Las tiras LED transformaron mi cuarto. La app funciona perfecto y los colores son vibrantes. 100% recomendado.', product: 'Tira LED RGB Smart', rating: 5 },
              ].map((t) => (
                <div key={t.name} className="testimonial-card" style={{
                  background: 'var(--gray-1)',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid var(--gray-2)'
                }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'var(--black)',
                    marginBottom: '28px'
                  }}>"{t.review}"</p>
                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--gray-2)', paddingTop: '20px' }}>
                    <div style={{
                      width: '40px', height: '40px',
                      background: 'var(--black)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--white)',
                      fontFamily: 'var(--serif-display)',
                      fontSize: '18px'
                    }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-4)', fontFamily: 'var(--mono)' }}>
                        {t.city} · {t.product}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONFIANZA — Horizontal bar
        ══════════════════════════════════════ */}
        <section style={{ borderTop: '1px solid var(--gray-2)', borderBottom: '1px solid var(--gray-2)' }}>
          <div style={{
            maxWidth: '1400px', margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'
          }}>
            {[
              { icon: <Shield size={22} />, title: 'Pagos 100% Seguros', desc: 'Yape · Mercado Pago · Tarjeta' },
              { icon: <ArrowRight size={22} />, title: 'Garantía 30 días', desc: 'Devolución sin preguntas' },
              { icon: <Headphones size={22} />, title: 'Soporte WhatsApp', desc: 'Respuesta en menos de 1 hora' },
              { icon: <Truck size={22} />, title: 'Envíos a todo Perú', desc: 'Lima 2-3 días · Provincia 5-7' },
            ].map((t, i) => (
              <div key={t.title} style={{
                padding: '40px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderRight: i < 3 ? '1px solid var(--gray-2)' : 'none',
                transition: 'background 0.2s ease',
                cursor: 'default'
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  width: '48px', height: '48px',
                  background: 'var(--black)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--white)',
                  flexShrink: 0
                }}>{t.icon}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{t.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-4)', fontFamily: 'var(--mono)' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════ */}
        <section style={{ padding: '140px 48px', textAlign: 'center', background: 'var(--white)' }}>
          <span className="label" style={{ display: 'block', marginBottom: '24px' }}>¿Listo para empezar?</span>
          <div style={{
            fontFamily: 'var(--serif-display)',
            fontSize: 'clamp(56px, 10vw, 130px)',
            lineHeight: 0.88,
            marginBottom: '48px',
            color: 'var(--black)'
          }}>
            VIVE MÁS<br />
            <span style={{ color: 'var(--accent)' }}>INTELIGENTE.</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/productos" className="btn-primary">
              <span>Ver todos los productos</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/productos?cat=mascotas" className="btn-secondary">
              <PawPrint size={16} />
              Para tu mascota
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}