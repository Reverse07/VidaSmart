export default function SuccessPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', textAlign: 'center', padding: '48px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&display=swap');`}</style>
      <div style={{ fontSize: '80px', marginBottom: '24px' }}>🎉</div>
      <div style={{ fontFamily: 'Bebas Neue', fontSize: '56px', color: '#16a34a', marginBottom: '8px' }}>¡PAGO EXITOSO!</div>
      <p style={{ color: '#6b6760', maxWidth: '400px', marginBottom: '32px', lineHeight: 1.6 }}>
        Tu pedido fue confirmado. Te contactaremos por WhatsApp con el tracking de tu envío.
      </p>
      <a href="/" style={{ background: '#080808', color: '#fff', padding: '16px 32px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700 }}>
        Volver al inicio
      </a>
    </div>
  )
}