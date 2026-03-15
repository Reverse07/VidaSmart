import { Star } from 'lucide-react'

const REVIEWS = [
  { name: 'Valeria M.', city: 'Lima', review: 'El enchufe WiFi cambió mi rutina completamente. Ahora controlo todo desde el celular. Llegó en 3 días y el empaque era increíble.', product: 'Enchufe WiFi Inteligente', rating: 5 },
  { name: 'Carlos R.', city: 'Miraflores', review: 'Mi perro Toby ama el bebedero portátil. Ya no me preocupo por el agua en los paseos. Producto de primera calidad.', product: 'Bebedero Portátil', rating: 5 },
  { name: 'Andrea P.', city: 'San Isidro', review: 'Las tiras LED transformaron mi cuarto. La app funciona perfecto y los colores son vibrantes. 100% recomendado.', product: 'Tira LED RGB Smart', rating: 5 },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '120px 0', background: '#fafaf8' }}>
      <style>{`
        .testimonial-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .testimonial-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: '64px'
        }}>
          <div>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760'
            }}>Clientes reales</span>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.9, marginTop: '12px'
            }}>+500 VIDAS<br />SIMPLIFICADAS</div>
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />)}
            <span style={{ marginLeft: '8px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>4.9</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {REVIEWS.map(t => (
            <div key={t.name} className="testimonial-card" style={{
              background: '#f2f1ef', borderRadius: '24px',
              padding: '32px', border: '1px solid #e8e6e1'
            }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p style={{
                fontSize: '16px', fontWeight: 300, lineHeight: 1.7,
                color: '#080808', marginBottom: '28px',
                fontFamily: "'DM Sans', sans-serif"
              }}>"{t.review}"</p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                borderTop: '1px solid #e8e6e1', paddingTop: '20px'
              }}>
                <div style={{
                  width: '40px', height: '40px', background: '#080808',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fafaf8', fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px'
                }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{t.name}</div>
                  <div style={{
                    fontSize: '12px', color: '#6b6760',
                    fontFamily: "'DM Mono', monospace"
                  }}>{t.city} · {t.product}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}