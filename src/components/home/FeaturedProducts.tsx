import Link from 'next/link'
import { Zap, PawPrint, Plus, ArrowRight } from 'lucide-react'

const PRODUCTOS = [
  { name: 'Enchufe WiFi Inteligente', price: 69, old: 99, cat: 'Tech', tag: 'Más vendido', bg: '#f0f4ff', icon: <Zap size={48} color="#2563eb" />, desc: 'Control desde tu celular', slug: 'enchufe-wifi-inteligente' },
  { name: 'Tira LED RGB Smart 3m', price: 99, old: 139, cat: 'Tech', tag: 'Nuevo', bg: '#f5f0ff', icon: <Zap size={48} color="#7c3aed" />, desc: 'Transforma tu espacio', slug: 'tira-led-rgb-smart' },
  { name: 'Bebedero Portátil', price: 49, old: 69, cat: 'Mascotas', tag: 'Popular', bg: '#fff7ed', icon: <PawPrint size={48} color="#d97706" />, desc: 'Hidratación en cualquier lugar', slug: 'bebedero-portatil' },
  { name: 'Cepillo Auto-Limpiante', price: 69, old: 89, cat: 'Mascotas', tag: 'Top rated', bg: '#f0fdf4', icon: <PawPrint size={48} color="#16a34a" />, desc: 'Limpieza en 1 segundo', slug: 'cepillo-auto-limpiante' },
]

export default function FeaturedProducts() {
  return (
    <section style={{ padding: '120px 0', background: '#fafaf8' }}>
      <style>{`
        .prod-card { position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .prod-card:hover { transform: translateY(-6px); }
        .prod-card .card-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .prod-card:hover .card-img { transform: scale(1.04); }
        .card-btn { opacity: 0; transform: translateY(8px); transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .prod-card:hover .card-btn { opacity: 1; transform: translateY(0); }
        .link-hover { position: relative; display: inline-flex; align-items: center; gap: 6px; }
        .link-hover::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #080808; transition: width 0.3s cubic-bezier(0.16,1,0.3,1); }
        .link-hover:hover::after { width: 100%; }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end', marginBottom: '64px',
          borderBottom: '1px solid #e8e6e1', paddingBottom: '32px'
        }}>
          <div>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760'
            }}>Más vendidos</span>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.9, marginTop: '12px'
            }}>PRODUCTOS<br />ESTRELLA</div>
          </div>
          <Link href="/productos" className="link-hover" style={{
            textDecoration: 'none', fontWeight: 500,
            fontSize: '14px', color: '#080808',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {PRODUCTOS.map(p => (
            <Link key={p.name} href={`/productos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="prod-card" style={{
                background: '#fafaf8', border: '1px solid #e8e6e1',
                borderRadius: '24px', overflow: 'hidden'
              }}>
                <div className="card-img" style={{
                  background: p.bg, aspectRatio: '1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '80px', height: '80px',
                    background: 'rgba(255,255,255,0.8)', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)'
                  }}>{p.icon}</div>
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: '#080808', color: '#fafaf8',
                    fontFamily: "'DM Mono', monospace", fontSize: '10px',
                    letterSpacing: '0.08em', padding: '4px 10px', borderRadius: '100px'
                  }}>{p.tag}</div>
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: '#2563eb', color: '#fafaf8',
                    fontFamily: "'DM Mono', monospace", fontSize: '10px',
                    padding: '4px 8px', borderRadius: '100px'
                  }}>-{Math.round((1 - p.price / p.old) * 100)}%</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '11px',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#6b6760', marginBottom: '6px'
                  }}>{p.cat}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>{p.name}</h3>
                  <p style={{ fontSize: '12px', color: '#6b6760', marginBottom: '16px', fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px' }}>S/{p.price}</span>
                      <span style={{ fontSize: '12px', color: '#b0aca4', textDecoration: 'line-through' }}>S/{p.old}</span>
                    </div>
                    <button className="card-btn" style={{
                      background: '#080808', color: '#fafaf8', border: 'none',
                      borderRadius: '100px', padding: '10px 18px',
                      fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: "'DM Sans', sans-serif"
                    }}>
                      <Plus size={14} /> Agregar
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}