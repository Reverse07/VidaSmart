import Link from 'next/link'
import { ArrowRight, PawPrint } from 'lucide-react'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr',
      position: 'relative',
      overflow: 'hidden',
      background: '#fafaf8',
      padding: '80px 0 0'
    }}>
      <style>{`
        .hero-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(96px, 18vw, 220px);
          line-height: 0.88;
          letter-spacing: -0.01em;
          color: #080808;
        }
        .btn-primary {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          background: #080808; color: #fafaf8;
          padding: 16px 32px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; border: none; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: #2563eb; transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          border-radius: inherit;
        }
        .btn-primary:hover::before { transform: translateY(0); }
        .btn-primary span, .btn-primary svg { position: relative; z-index: 1; }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #080808;
          padding: 15px 32px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          border: 1.5px solid #e8e6e1; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-secondary:hover { border-color: #080808; background: #080808; color: #fafaf8; }
        @keyframes scrollLine {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.6); }
        }
      `}</style>

      {/* Background dot texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, #e8e6e1 1px, transparent 0)',
        backgroundSize: '32px 32px',
        opacity: 0.5
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 48px', width: '100%'
      }}>
        {/* Label row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '48px'
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760'
          }}>Colección 2026 — Tech + Mascotas</span>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb'
          }}>● Lima, Perú</span>
        </div>

        {/* Big type */}
        <div>
          <div className="hero-display">MEJORA</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '32px' }}>
            <div className="hero-display">TU</div>
            {/* Floating price card */}
            <div style={{
              background: '#080808', color: '#fafaf8',
              borderRadius: '20px', padding: '20px 28px',
              marginBottom: '16px',
              display: 'flex', flexDirection: 'column', gap: '4px',
              minWidth: '200px'
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: '10px',
                color: '#666', letterSpacing: '0.1em'
              }}>PRECIO DESDE</span>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '42px', lineHeight: 1, color: '#fafaf8'
              }}>S/ 49</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Envío gratis en Lima</span>
            </div>
          </div>
          <div className="hero-display" style={{ color: '#2563eb' }}>VIDA.</div>
        </div>

        {/* Sub + CTA */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: '48px', paddingTop: '48px',
          borderTop: '1px solid #e8e6e1',
          flexWrap: 'wrap', gap: '32px'
        }}>
          <div style={{ maxWidth: '440px' }}>
            <p style={{
              fontSize: '18px', fontWeight: 300, lineHeight: 1.6,
              color: '#6b6760', marginBottom: '32px',
              fontFamily: "'DM Sans', sans-serif"
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

          {/* Stats */}
          <div style={{ display: 'flex', gap: '48px' }}>
            {[
              { num: '500+', label: 'Clientes' },
              { num: '4.9',  label: 'Rating' },
              { num: '8',    label: 'Productos' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '56px', lineHeight: 1, color: '#080808'
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '11px',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#6b6760', marginTop: '8px'
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, #b0aca4, transparent)',
          animation: 'scrollLine 2s ease-in-out infinite'
        }} />
      </div>
    </section>
  )
}