'use client'

import { useEffect, useRef, useState } from 'react'
import { Shield, RotateCcw, Headphones, Truck, Zap } from 'lucide-react'

const ITEMS = [
  {
    icon: <Shield size={20} strokeWidth={1.8} />,
    title: 'Pagos 100% Seguros',
    desc: 'Yape · Mercado Pago · Tarjeta',
    detail: 'Encriptación SSL en cada transacción',
    color: '#2563EB',
    bg: '#EFF6FF',
    accentBg: '#DBEAFE',
    emoji: '🔒',
  },
  {
    icon: <RotateCcw size={20} strokeWidth={1.8} />,
    title: 'Garantía 30 días',
    desc: 'Devolución sin preguntas',
    detail: 'Reembolso completo o cambio de producto',
    color: '#16A34A',
    bg: '#F0FDF4',
    accentBg: '#DCFCE7',
    emoji: '✅',
  },
  {
    icon: <Headphones size={20} strokeWidth={1.8} />,
    title: 'Soporte WhatsApp',
    desc: 'Respuesta en menos de 1 hora',
    detail: 'Lunes a Sábado · 9am–8pm',
    color: '#25D366',
    bg: '#F0FDF4',
    accentBg: '#DCFCE7',
    emoji: '💬',
  },
  {
    icon: <Truck size={20} strokeWidth={1.8} />,
    title: 'Envíos a todo Perú',
    desc: 'Lima 2–3 días · Provincia 5–7',
    detail: 'Tracking en tiempo real incluido',
    color: '#D97706',
    bg: '#FFF7ED',
    accentBg: '#FED7AA',
    emoji: '📦',
  },
]

export default function TrustBar() {
  const [visible, setVisible]   = useState(false)
  const [hovered, setHovered]   = useState<number | null>(null)
  const sectionRef              = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── ITEM REVEAL ── */
        .tb-item {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity   0.6s cubic-bezier(0.16,1,0.3,1),
            transform 0.6s cubic-bezier(0.16,1,0.3,1),
            background 0.25s ease;
        }
        .tb-item.tb-in { opacity: 1; transform: translateY(0); }
        .tb-item-0 { transition-delay: 0.05s; }
        .tb-item-1 { transition-delay: 0.12s; }
        .tb-item-2 { transition-delay: 0.19s; }
        .tb-item-3 { transition-delay: 0.26s; }

        /* ── ICON BOX ── */
        .tb-icon {
          width: 52px; height: 52px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s ease;
        }

        /* ── DETAIL TEXT ── */
        @keyframes detailIn {
          from { opacity: 0; transform: translateY(4px); max-height: 0; }
          to   { opacity: 1; transform: translateY(0);   max-height: 24px; }
        }
        .tb-detail {
          overflow: hidden;
          animation: detailIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── GRID RESPONSIVE ── */
        @media (max-width: 768px) {
          .tb-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tb-divider-v { display: none !important; }
        }
        @media (max-width: 480px) {
          .tb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: '#FAFAF8',
          borderTop:    '1px solid #E2DED8',
          borderBottom: '1px solid #E2DED8',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #2563EB 0%, #16A34A 33%, #25D366 66%, #D97706 100%)',
          opacity: 0.6,
        }} />

        <div
          className="tb-grid"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`tb-item tb-item-${i} ${visible ? 'tb-in' : ''}`}
              style={{
                padding: '36px 32px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                borderRight: i < 3 ? '1px solid #E2DED8' : 'none',
                cursor: 'default',
                background: hovered === i ? item.bg : 'transparent',
                position: 'relative',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover glow */}
              {hovered === i && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 20% 50%, ${item.color}0a, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* Icon */}
              <div
                className="tb-icon"
                style={{
                  background: hovered === i ? item.accentBg : '#F2F1EF',
                  color: hovered === i ? item.color : '#5C554E',
                  transform: hovered === i ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                  boxShadow: hovered === i ? `0 8px 20px ${item.color}25` : 'none',
                }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '4px',
                  fontFamily: "'DM Sans', sans-serif",
                  color: hovered === i ? '#080808' : '#3E3A35',
                  transition: 'color 0.2s ease',
                }}>{item.title}</div>

                <div style={{
                  fontSize: '11px',
                  color: hovered === i ? item.color : '#A09890',
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.06em',
                  transition: 'color 0.25s ease',
                }}>{item.desc}</div>

                {/* Detail — shows on hover */}
                {hovered === i && (
                  <div className="tb-detail" style={{
                    fontSize: '11px',
                    color: '#7A7269',
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    <span style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: item.color,
                      flexShrink: 0,
                    }} />
                    {item.detail}
                  </div>
                )}
              </div>

              {/* Corner emoji — shows on hover */}
              {hovered === i && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px', right: '20px',
                  fontSize: '28px',
                  opacity: 0.12,
                  animation: 'detailIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>{item.emoji}</div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom trust tagline */}
        <div style={{
          borderTop: '1px solid #E2DED8',
          padding: '16px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s',
        }}>
          <Zap size={12} color="#2563EB" />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C8C3BB',
          }}>
            Más de 500 peruanos ya simplificaron su vida con VidaSmart
          </span>
          <Zap size={12} color="#D97706" />
        </div>
      </section>
    </>
  )
}