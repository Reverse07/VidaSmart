import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#f2f1ef', borderTop: '1px solid #e8e6e1', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');`}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '64px 48px 48px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px' }}>

        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '32px', marginBottom: '12px' }}>
            VIDA<span style={{ color: '#2563eb' }}>SMART</span>
          </div>
          <p style={{ fontSize: '13px', color: '#6b6760', lineHeight: 1.7, maxWidth: '280px', marginBottom: '24px' }}>
            Soluciones inteligentes para tu vida diaria y la de tu mascota. Envíos a todo el Perú.
          </p>
          <a href="https://wa.me/51XXXXXXXXX" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25d366', color: '#fff', padding: '10px 20px', borderRadius: '100px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            💬 WhatsApp
          </a>
        </div>

        {/* Tienda */}
        <div>
          <div style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0aca4', marginBottom: '16px' }}>Tienda</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Todos los productos', href: '/productos' },
              { label: 'Tecnología', href: '/productos?cat=tech' },
              { label: 'Mascotas', href: '/productos?cat=mascotas' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ textDecoration: 'none', fontSize: '13px', color: '#6b6760' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#080808'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6b6760'}
              >{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Ayuda */}
        <div>
          <div style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0aca4', marginBottom: '16px' }}>Ayuda</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Envíos y tiempos', href: '#' },
              { label: 'Devoluciones', href: '#' },
              { label: 'Preguntas frecuentes', href: '#' },
            ].map(l => (
              <Link key={l.label} href={l.href} style={{ textDecoration: 'none', fontSize: '13px', color: '#6b6760' }}>{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div>
          <div style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0aca4', marginBottom: '16px' }}>Contacto</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#6b6760' }}>
            <span>📱 +51 XXX XXX XXX</span>
            <span>📧 hola@vidasmart.pe</span>
            <span>📍 Lima, Perú</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 48px', borderTop: '1px solid #e8e6e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: '#b0aca4' }}>
          © 2026 VidaSmart · Lima, Perú
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Términos', 'Privacidad', 'Cookies'].map(t => (
            <Link key={t} href="#" style={{ fontFamily: 'DM Mono', fontSize: '11px', color: '#b0aca4', textDecoration: 'none' }}>{t}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['💳', '📱', '🏦'].map((icon, i) => (
            <div key={i} style={{ width: '36px', height: '24px', background: '#fff', border: '1px solid #e8e6e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}