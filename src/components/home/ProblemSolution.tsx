'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ITEMS = [
  {
    num: '01',
    problem: 'Cables desordenados en tu escritorio',
    solution: 'Organizador de cables inteligente',
    desc: 'Orden instantáneo. Compatible con todos tus dispositivos. Instálalo en 2 minutos.',
    cta: { label: 'Ver organizador', href: '/productos/organizador-cables-premium' },
    color: '#2563EB',
    bg: '#EFF6FF',
    emoji: '🗂️',
  },
  {
    num: '02',
    problem: 'Tu mascota sin agua en los paseos',
    solution: 'Bebedero portátil anti-derrame',
    desc: 'Siempre hidratado. Cabe en cualquier bolso. Un botón para servir el agua.',
    cta: { label: 'Ver bebedero', href: '/productos/bebedero-portatil' },
    color: '#D97706',
    bg: '#FFF7ED',
    emoji: '💧',
  },
  {
    num: '03',
    problem: 'Luces que olvidas apagar',
    solution: 'Enchufe WiFi con control remoto',
    desc: 'Ahorra energía. Controla desde cualquier lugar. Compatible con Alexa y Google Home.',
    cta: { label: 'Ver enchufe', href: '/productos/enchufe-wifi-inteligente' },
    color: '#7C3AED',
    bg: '#F5F3FF',
    emoji: '⚡',
  },
  {
    num: '04',
    problem: 'Pelo de mascota por todas partes',
    solution: 'Cepillo auto-limpiante',
    desc: 'Un botón limpia el cepillo en 1 segundo. Sin ensuciar tus manos.',
    cta: { label: 'Ver cepillo', href: '/productos/cepillo-auto-limpiante' },
    color: '#16A34A',
    bg: '#F0FDF4',
    emoji: '🐾',
  },
]

export default function ProblemSolution() {
  const [activeItem, setActiveItem] = useState(0)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle through items every 4s
  useEffect(() => {
    const tick = 40 // ms per progress tick
    const total = 4000 // ms total

    const startCycle = () => {
      setProgress(0)
      progressRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100
          return prev + (tick / total) * 100
        })
      }, tick)
      intervalRef.current = setTimeout(() => {
        setActiveItem(prev => (prev + 1) % ITEMS.length)
        setProgress(0)
        if (progressRef.current) clearInterval(progressRef.current)
      }, total)
    }

    startCycle()
    return () => {
      if (progressRef.current !== null) clearInterval(progressRef.current)
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [activeItem])

  const handleSelect = (i: number) => {
    if (progressRef.current) clearInterval(progressRef.current)
    if (intervalRef.current) clearTimeout(intervalRef.current)
    setActiveItem(i)
    setProgress(0)
  }

  const active = ITEMS[activeItem]

  return (
    <>
      <style>{`
        .ps-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ps-reveal.ps-in { opacity: 1; transform: translateY(0); }
        .ps-d1 { transition-delay: 0.05s; }
        .ps-d2 { transition-delay: 0.15s; }
        .ps-d3 { transition-delay: 0.25s; }

        /* ── ROW ── */
        .ps-row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 22px 20px;
          border-radius: 18px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .ps-row:hover { background: rgba(0,0,0,0.025); }
        .ps-row.ps-active {
          background: #fff;
          border-color: #E2DED8;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        /* ── NUMBER ── */
        .ps-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #C8C3BB;
          flex-shrink: 0;
          margin-top: 2px;
          transition: color 0.25s ease;
        }
        .ps-row.ps-active .ps-num { color: #A09890; }

        /* ── PROGRESS BAR ── */
        .ps-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: currentColor;
          transition: none;
        }

        /* ── VISUAL PANEL ── */
        .ps-visual {
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          transition: background 0.6s ease;
        }

        /* ── EMOJI FLOAT ── */
        @keyframes emojiFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(2deg); }
        }
        .ps-emoji {
          animation: emojiFloat 4s ease-in-out infinite;
          font-size: 96px;
          line-height: 1;
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.12));
        }

        /* ── CONTENT SWAP ── */
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ps-content-swap {
          animation: contentIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── BADGE ── */
        .ps-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
          font-weight: 500;
        }

        /* ── CTA ── */
        .ps-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          color: #fff;
        }
        .ps-cta:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .ps-cta svg {
          transition: transform 0.25s ease;
        }
        .ps-cta:hover svg { transform: translateX(4px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ps-grid { grid-template-columns: 1fr !important; }
          .ps-visual { min-height: 280px; }
          .ps-sticky { position: static !important; }
        }
      `}</style>

      <section ref={sectionRef} style={{ background: '#F5F3EF', padding: '140px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

          {/* Top label */}
          <div className={`ps-reveal ps-d1 ${visible ? 'ps-in' : ''}`} style={{ marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '1px', background: '#C8C3BB' }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#A09890',
              }}>El problema que resolvemos</span>
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 7vw, 88px)',
              lineHeight: 0.88, color: '#080808',
            }}>
              TU VIDA,<br />
              <span style={{ color: '#A09890' }}>SIMPLIFICADA.</span>
            </div>
          </div>

          {/* Main grid */}
          <div
            className="ps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* LEFT — rows */}
            <div className={`ps-reveal ps-d2 ${visible ? 'ps-in' : ''}`}>
              <p style={{
                fontSize: '16px', fontWeight: 300, color: '#7A7269',
                lineHeight: 1.7, marginBottom: '40px', maxWidth: '380px',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Cada producto resuelve un problema real. Sin complicaciones, sin manuales largos.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {ITEMS.map((item, i) => (
                  <div
                    key={item.num}
                    className={`ps-row ${activeItem === i ? 'ps-active' : ''}`}
                    onClick={() => handleSelect(i)}
                    style={{ color: item.color }}
                  >
                    {/* Number */}
                    <span className="ps-num">{item.num}</span>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '12px', color: '#B0ACA4',
                        fontStyle: 'italic', marginBottom: '6px',
                        fontFamily: "'DM Sans', sans-serif",
                        textDecoration: activeItem === i ? 'none' : 'line-through',
                        textDecorationColor: '#D4D0CA',
                        transition: 'text-decoration 0.3s ease',
                      }}>
                        {item.problem}
                      </p>
                      <h3 style={{
                        fontSize: '16px', fontWeight: 700,
                        color: activeItem === i ? '#080808' : '#5C554E',
                        fontFamily: "'DM Sans', sans-serif",
                        transition: 'color 0.25s ease',
                        lineHeight: 1.3,
                      }}>
                        {item.solution}
                      </h3>

                      {activeItem === i && (
                        <p style={{
                          fontSize: '13px', color: '#7A7269',
                          marginTop: '8px', lineHeight: 1.6,
                          fontFamily: "'DM Sans', sans-serif",
                          animation: 'contentIn 0.35s cubic-bezier(0.16,1,0.3,1)',
                        }}>
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {/* Emoji indicator */}
                    <span style={{
                      fontSize: '20px',
                      opacity: activeItem === i ? 1 : 0.3,
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                      transform: activeItem === i ? 'scale(1.15)' : 'scale(1)',
                      flexShrink: 0,
                    }}>{item.emoji}</span>

                    {/* Progress bar */}
                    {activeItem === i && (
                      <div
                        className="ps-progress"
                        style={{
                          width: `${progress}%`,
                          color: item.color,
                          background: item.color,
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — visual panel */}
            <div
              className={`ps-reveal ps-d3 ${visible ? 'ps-in' : ''} ps-sticky`}
              style={{ position: 'sticky', top: '120px' }}
            >
              <div
                className="ps-visual"
                style={{ background: active.bg }}
              >
                {/* Dot grid texture */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }} />

                {/* Ambient glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 50% 40%, ${active.color}18, transparent 65%)`,
                  transition: 'background 0.6s ease',
                }} />

                {/* Content */}
                <div
                  key={activeItem}
                  className="ps-content-swap"
                  style={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center',
                    padding: '48px 40px',
                  }}
                >
                  {/* Emoji */}
                  <div className="ps-emoji">{active.emoji}</div>

                  {/* Badge */}
                  <div
                    className="ps-badge"
                    style={{
                      background: `${active.color}18`,
                      color: active.color,
                      border: `1px solid ${active.color}30`,
                      marginTop: '28px',
                    }}
                  >
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: active.color,
                    }} />
                    Solución VidaSmart
                  </div>

                  {/* Solution title */}
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    color: '#080808',
                    lineHeight: 0.95,
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                  }}>
                    {active.solution.toUpperCase()}
                  </div>

                  {/* Desc */}
                  <p style={{
                    fontSize: '14px', color: '#7A7269',
                    lineHeight: 1.65, maxWidth: '300px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                  }}>
                    {active.desc}
                  </p>

                  {/* CTA */}
                  <Link
                    href={active.cta.href}
                    className="ps-cta"
                    style={{ background: active.color }}
                  >
                    {active.cta.label}
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Corner number */}
                <div style={{
                  position: 'absolute', bottom: '24px', right: '28px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '80px', color: `${active.color}12`,
                  lineHeight: 1, userSelect: 'none',
                  transition: 'color 0.6s ease',
                }}>
                  {active.num}
                </div>
              </div>

              {/* Dots indicator */}
              <div style={{
                display: 'flex', justifyContent: 'center',
                gap: '8px', marginTop: '20px',
              }}>
                {ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      width: activeItem === i ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      border: 'none',
                      background: activeItem === i ? active.color : '#D4D0CA',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}