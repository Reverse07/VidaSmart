'use client'

import Link from 'next/link'
import { Zap, PawPrint, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function CategorySplit() {
  const [hoveredTech, setHoveredTech] = useState(false)
  const [hoveredPet, setHoveredPet] = useState(false)

  return (
    <>
      <style>{`
        .cat-panel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;  
          padding: 56px;
          min-height: 520px;
          text-decoration: none;
          cursor: pointer;
        }

        /* ── ICON BOX ── */
        .cat-icon-box {
          position: absolute;
          top: 48px; right: 48px;
          width: 108px; height: 108px;
          border-radius: 28px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
        }

        /* ── DISPLAY TYPE ── */
        .cat-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 6.5vw, 88px);
          line-height: 0.88;
          margin: 18px 0 28px;
          transition: letter-spacing 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        /* ── COUNT TAG ── */
        .cat-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        /* ── CTA ROW ── */
        .cat-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 13px 24px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          width: fit-content;
        }

        /* ── PROGRESS BAR ── */
        .cat-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .cat-panel:hover .cat-bar { transform: scaleX(1); }

        /* ── BG OVERLAY ── */
        .cat-overlay {
          position: absolute;
          inset: 0;
          transition: opacity 0.5s ease;
        }

        /* ── ITEM TAGS ── */
        .item-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 100px;
          transition: all 0.2s ease;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .cat-split-grid { grid-template-columns: 1fr !important; }
          .cat-panel { min-height: 380px; padding: 40px 32px; }
          .cat-icon-box { width: 80px; height: 80px; top: 32px; right: 32px; }
        }
      `}</style>

      <section
        className="cat-split-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
      >
        {/* ══ TECH PANEL ══ */}
        <Link
          href="/productos?cat=tech"
          className="cat-panel"
          style={{ background: '#080808' }}
          onMouseEnter={() => setHoveredTech(true)}
          onMouseLeave={() => setHoveredTech(false)}
        >
          {/* Ambient glow */}
          <div className="cat-overlay" style={{
            background: `radial-gradient(ellipse at 75% 25%, rgba(37,99,235,${hoveredTech ? '0.22' : '0.10'}) 0%, transparent 60%)`,
          }} />

          {/* Noise texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
            opacity: 0.6,
          }} />

          {/* Icon box */}
          <div
            className="cat-icon-box"
            style={{
              background: 'rgba(37,99,235,0.12)',
              border: `1px solid rgba(37,99,235,${hoveredTech ? '0.5' : '0.25'})`,
              transform: hoveredTech ? 'rotate(-6deg) scale(1.08)' : 'rotate(0deg) scale(1)',
              boxShadow: hoveredTech ? '0 20px 40px rgba(37,99,235,0.25)' : 'none',
            }}
          >
            <Zap
              size={44}
              color="#2563EB"
              style={{ transition: 'transform 0.3s ease', transform: hoveredTech ? 'scale(1.1)' : 'scale(1)' }}
            />
          </div>

          {/* Item tags */}
          <div style={{
            position: 'absolute', top: '48px', left: '56px',
            display: 'flex', flexDirection: 'column', gap: '6px',
            opacity: hoveredTech ? 1 : 0,
            transform: hoveredTech ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {['Enchufes WiFi', 'Tiras LED Smart', 'Soportes Laptop'].map((tag, i) => (
              <span key={tag} className="item-tag" style={{
                background: 'rgba(37,99,235,0.15)',
                color: '#93B4F8',
                border: '1px solid rgba(37,99,235,0.2)',
                transitionDelay: `${i * 0.05}s`,
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2563EB' }} />
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="cat-count" style={{
              background: hoveredTech ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.06)',
              color: hoveredTech ? '#93B4F8' : '#555',
              border: `1px solid ${hoveredTech ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.08)'}`,
            }}>
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: hoveredTech ? '#2563EB' : '#444',
                transition: 'background 0.3s ease',
              }} />
              01 — Tecnología · 4 productos
            </div>

            <div
              className="cat-title"
              style={{
                color: '#FAFAF8',
                letterSpacing: hoveredTech ? '0.04em' : '-0.01em',
              }}
            >
              SMART<br />HOME
            </div>

            <div
              className="cat-cta"
              style={{
                background: hoveredTech ? '#2563EB' : 'rgba(255,255,255,0.08)',
                color: hoveredTech ? '#fff' : '#888',
                border: `1px solid ${hoveredTech ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                transform: hoveredTech ? 'translateX(6px)' : 'translateX(0)',
              }}
            >
              Ver colección
              <ArrowRight
                size={14}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: hoveredTech ? 'translateX(3px)' : 'translateX(0)',
                }}
              />
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="cat-bar" style={{ background: '#2563EB', width: '100%' }} />
        </Link>

        {/* ══ MASCOTAS PANEL ══ */}
        <Link
          href="/productos?cat=mascotas"
          className="cat-panel"
          style={{ background: '#F5F3EF' }}
          onMouseEnter={() => setHoveredPet(true)}
          onMouseLeave={() => setHoveredPet(false)}
        >
          {/* Warm ambient */}
          <div className="cat-overlay" style={{
            background: `radial-gradient(ellipse at 75% 25%, rgba(245,158,11,${hoveredPet ? '0.18' : '0.08'}) 0%, transparent 60%)`,
          }} />

          {/* Subtle grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />

          {/* Icon box */}
          <div
            className="cat-icon-box"
            style={{
              background: 'rgba(245,158,11,0.10)',
              border: `1px solid rgba(245,158,11,${hoveredPet ? '0.45' : '0.20'})`,
              transform: hoveredPet ? 'rotate(6deg) scale(1.08)' : 'rotate(0deg) scale(1)',
              boxShadow: hoveredPet ? '0 20px 40px rgba(245,158,11,0.18)' : 'none',
            }}
          >
            <PawPrint
              size={44}
              color="#D97706"
              style={{ transition: 'transform 0.3s ease', transform: hoveredPet ? 'scale(1.1)' : 'scale(1)' }}
            />
          </div>

          {/* Item tags */}
          <div style={{
            position: 'absolute', top: '48px', left: '56px',
            display: 'flex', flexDirection: 'column', gap: '6px',
            opacity: hoveredPet ? 1 : 0,
            transform: hoveredPet ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {['Bebederos portátiles', 'Camas térmicas', 'Cepillos auto-limpiant.'].map((tag, i) => (
              <span key={tag} className="item-tag" style={{
                background: 'rgba(245,158,11,0.10)',
                color: '#92400E',
                border: '1px solid rgba(245,158,11,0.2)',
                transitionDelay: `${i * 0.05}s`,
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D97706' }} />
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="cat-count" style={{
              background: hoveredPet ? 'rgba(245,158,11,0.12)' : 'rgba(0,0,0,0.05)',
              color: hoveredPet ? '#92400E' : '#9C9690',
              border: `1px solid ${hoveredPet ? 'rgba(245,158,11,0.25)' : 'rgba(0,0,0,0.08)'}`,
            }}>
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: hoveredPet ? '#D97706' : '#C8C3BB',
                transition: 'background 0.3s ease',
              }} />
              02 — Mascotas · 4 productos
            </div>

            <div
              className="cat-title"
              style={{
                color: '#080808',
                letterSpacing: hoveredPet ? '0.04em' : '-0.01em',
              }}
            >
              PET<br />SMART
            </div>

            <div
              className="cat-cta"
              style={{
                background: hoveredPet ? '#D97706' : 'rgba(0,0,0,0.06)',
                color: hoveredPet ? '#fff' : '#7A7269',
                border: `1px solid ${hoveredPet ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                transform: hoveredPet ? 'translateX(6px)' : 'translateX(0)',
              }}
            >
              Ver colección
              <ArrowRight
                size={14}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: hoveredPet ? 'translateX(3px)' : 'translateX(0)',
                }}
              />
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="cat-bar" style={{ background: '#D97706', width: '100%' }} />
        </Link>
      </section>
    </>
  )
}