import Link from 'next/link'
import { ArrowRight, PawPrint } from 'lucide-react'

export default function HomeCTA() {
  return (
    <section style={{ padding: '140px 48px', textAlign: 'center', background: '#fafaf8' }}>
      <style>{`
        .btn-primary-cta {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
          background: #080808; color: #fafaf8;
          padding: 16px 32px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; border: none; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-primary-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #2563eb; transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          border-radius: inherit;
        }
        .btn-primary-cta:hover::before { transform: translateY(0); }
        .btn-primary-cta span, .btn-primary-cta svg { position: relative; z-index: 1; }
        .btn-secondary-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #080808;
          padding: 15px 32px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          border: 1.5px solid #e8e6e1; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .btn-secondary-cta:hover { border-color: #080808; background: #080808; color: #fafaf8; }
      `}</style>
      <span style={{
        display: 'block', marginBottom: '24px',
        fontFamily: "'DM Mono', monospace", fontSize: '11px',
        letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760'
      }}>¿Listo para empezar?</span>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(56px, 10vw, 130px)',
        lineHeight: 0.88, marginBottom: '48px', color: '#080808'
      }}>
        VIVE MÁS<br />
        <span style={{ color: '#2563eb' }}>INTELIGENTE.</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/productos" className="btn-primary-cta">
          <span>Ver todos los productos</span>
          <ArrowRight size={16} />
        </Link>
        <Link href="/productos?cat=mascotas" className="btn-secondary-cta">
          <PawPrint size={16} />
          Para tu mascota
        </Link>
      </div>
    </section>
  )
}