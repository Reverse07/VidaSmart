import Link from 'next/link'
import { Zap, PawPrint, ChevronRight } from 'lucide-react'

export default function CategorySplit() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
      <Link href="/productos?cat=tech" style={{
        textDecoration: 'none', background: '#080808',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '48px', position: 'relative', overflow: 'hidden', minHeight: '400px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 30%, #1e3a8a22, transparent 60%)'
        }} />
        <div style={{
          position: 'absolute', top: '48px', right: '48px',
          width: '120px', height: '120px',
          background: 'rgba(37,99,235,0.15)', borderRadius: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(37,99,235,0.3)'
        }}>
          <Zap size={48} color="#2563eb" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444'
          }}>01 — Tecnología</span>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#fafaf8', lineHeight: 0.9, margin: '16px 0 24px'
          }}>SMART<br />HOME</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#888', fontSize: '13px', fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            <span>Ver colección</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </Link>

      <Link href="/productos?cat=mascotas" style={{
        textDecoration: 'none', background: '#f2f1ef',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '48px', position: 'relative', overflow: 'hidden', minHeight: '400px',
      }}>
        <div style={{
          position: 'absolute', top: '48px', right: '48px',
          width: '120px', height: '120px',
          background: 'rgba(245,158,11,0.12)', borderRadius: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(245,158,11,0.25)'
        }}>
          <PawPrint size={48} color="#d97706" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760'
          }}>02 — Mascotas</span>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: '#080808', lineHeight: 0.9, margin: '16px 0 24px'
          }}>PET<br />SMART</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#6b6760', fontSize: '13px', fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            <span>Ver colección</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </Link>
    </section>
  )
}