'use client'

import { Shield, RotateCcw, Headphones, Truck } from 'lucide-react'

const ITEMS = [
  { icon: <Shield size={22} />, title: 'Pagos 100% Seguros', desc: 'Yape · Mercado Pago · Tarjeta' },
  { icon: <RotateCcw size={22} />, title: 'Garantía 30 días', desc: 'Devolución sin preguntas' },
  { icon: <Headphones size={22} />, title: 'Soporte WhatsApp', desc: 'Respuesta en menos de 1 hora' },
  { icon: <Truck size={22} />, title: 'Envíos a todo Perú', desc: 'Lima 2-3 días · Provincia 5-7' },
]

export default function TrustBar() {
  return (
    <section style={{ borderTop: '1px solid #e8e6e1', borderBottom: '1px solid #e8e6e1' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {ITEMS.map((t, i) => (
          <div key={t.title}
            style={{
              padding: '40px 36px', display: 'flex', alignItems: 'center', gap: '16px',
              borderRight: i < 3 ? '1px solid #e8e6e1' : 'none',
              transition: 'background 0.2s ease', cursor: 'default'
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f2f1ef')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{
              width: '48px', height: '48px', background: '#080808',
              borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fafaf8', flexShrink: 0
            }}>{t.icon}</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" }}>{t.title}</div>
              <div style={{ fontSize: '12px', color: '#6b6760', fontFamily: "'DM Mono', monospace" }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}