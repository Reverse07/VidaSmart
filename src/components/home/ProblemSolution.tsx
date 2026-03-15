import { ChevronRight } from 'lucide-react'

const ITEMS = [
  { num: '01', problem: 'Cables desordenados en tu escritorio', solution: 'Organizador de cables inteligente', desc: 'Orden instantáneo. Compatible con todos tus dispositivos. Instálalo en 2 minutos.' },
  { num: '02', problem: 'Tu mascota sin agua en los paseos', solution: 'Bebedero portátil anti-derrame', desc: 'Siempre hidratado. Cabe en cualquier bolso. Un botón para servir el agua.' },
  { num: '03', problem: 'Luces que olvidas apagar', solution: 'Enchufe WiFi con control remoto', desc: 'Ahorra energía. Controla desde cualquier lugar. Compatible con Alexa.' },
  { num: '04', problem: 'Pelo de mascota por todas partes', solution: 'Cepillo auto-limpiante', desc: 'Un botón limpia el cepillo en 1 segundo. Sin ensuciar tus manos.' },
]

export default function ProblemSolution() {
  return (
    <section style={{ background: '#f2f1ef', padding: '120px 0' }}>
      <style>{`
        .feature-row { border-top: 1px solid #e8e6e1; transition: background 0.3s ease; }
        .feature-row:hover { background: #ebe9e4; }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '11px',
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6760'
            }}>El problema que resolvemos</span>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 6vw, 80px)',
              lineHeight: 0.9, margin: '20px 0 32px', color: '#080808'
            }}>TU VIDA,<br />SIMPLIFICADA.</div>
            <p style={{
              fontSize: '16px', fontWeight: 300, color: '#6b6760',
              lineHeight: 1.7, maxWidth: '360px',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Cada producto resuelve un problema real. Sin complicaciones, sin manuales largos, sin frustración.
            </p>
          </div>
          <div>
            {ITEMS.map(item => (
              <div key={item.num} className="feature-row" style={{ padding: '28px 0' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '13px', color: '#b0aca4', letterSpacing: '0.05em', flexShrink: 0
                  }}>{item.num}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '12px', color: '#b0aca4',
                      marginBottom: '8px', fontStyle: 'italic',
                      fontFamily: "'DM Sans', sans-serif"
                    }}>✗ {item.problem}</p>
                    <h3 style={{
                      fontSize: '18px', fontWeight: 700, marginBottom: '8px',
                      color: '#080808', fontFamily: "'DM Sans', sans-serif"
                    }}>✓ {item.solution}</h3>
                    <p style={{
                      fontSize: '14px', color: '#6b6760', lineHeight: 1.6,
                      fontFamily: "'DM Sans', sans-serif"
                    }}>{item.desc}</p>
                  </div>
                  <ChevronRight size={16} color="#b0aca4" style={{ flexShrink: 0, marginTop: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}