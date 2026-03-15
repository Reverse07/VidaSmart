import Link from 'next/link'
import { Zap, Check, ArrowRight } from 'lucide-react'

export default function FeaturedProduct() {
  return (
    <section style={{ background: '#080808', padding: '120px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
            borderRadius: '32px', aspectRatio: '1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            border: '1px solid #1e3a8a44'
          }}>
            <div style={{
              position: 'absolute', width: '300px', height: '300px',
              background: 'radial-gradient(circle, #2563eb22, transparent)', borderRadius: '50%'
            }} />
            <div style={{
              width: '160px', height: '160px',
              background: 'rgba(37,99,235,0.15)', borderRadius: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(37,99,235,0.4)', position: 'relative'
            }}>
              <Zap size={72} color="#2563eb" />
              <div style={{
                position: 'absolute', top: '-8px', right: '-8px',
                width: '24px', height: '24px', background: '#22c55e',
                borderRadius: '50%', border: '3px solid #080808',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} />
              </div>
            </div>
            <div style={{
              position: 'absolute', bottom: '32px', left: '32px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', padding: '12px 20px',
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: '10px',
                color: '#666', marginBottom: '4px'
              }}>AHORRO MENSUAL</div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#22c55e'
              }}>S/ 40</div>
            </div>
          </div>

          <div>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444'
            }}>Producto estrella · Tech</span>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 6vw, 80px)',
              lineHeight: 0.9, color: '#fafaf8', margin: '20px 0 32px'
            }}>ENCHUFE<br />WiFi<br />INTELIGENTE</div>
            <ul style={{ listStyle: 'none', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Control desde cualquier celular',
                'Compatible con Alexa y Google Home',
                'Programa horarios automáticos',
                'Monitorea el consumo eléctrico en tiempo real',
              ].map(b => (
                <li key={b} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontSize: '15px', color: '#888', fontFamily: "'DM Sans', sans-serif"
                }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'rgba(37,99,235,0.2)', border: '1px solid #2563eb44',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Check size={10} color="#2563eb" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '40px' }}>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '72px',
                color: '#fafaf8', lineHeight: 1
              }}>S/69</span>
              <span style={{ color: '#444', textDecoration: 'line-through', fontSize: '20px' }}>S/99</span>
              <span style={{
                background: '#2563eb', color: '#fafaf8',
                fontFamily: "'DM Mono', monospace", fontSize: '11px',
                padding: '4px 10px', borderRadius: '100px'
              }}>AHORRAS S/30</span>
            </div>
            <Link href="/productos/enchufe-wifi-inteligente" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#fafaf8', color: '#080808',
              padding: '18px 40px', borderRadius: '100px',
              fontWeight: 700, fontSize: '15px', textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Comprar ahora <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}