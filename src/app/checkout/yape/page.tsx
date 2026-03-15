'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

function YapePage() {
  const searchParams = useSearchParams()
  const total = searchParams.get('total')

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', padding: '48px', textAlign: 'center' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');`}</style>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>📱</div>
      <div style={{ fontFamily: 'Bebas Neue', fontSize: '48px', marginBottom: '8px' }}>PAGAR CON YAPE</div>
      <p style={{ color: '#6b6760', marginBottom: '32px', maxWidth: '400px' }}>
        Transfiere <strong>S/{Number(total) - 5}</strong> al siguiente número y envíanos el comprobante por WhatsApp.
      </p>
      <div style={{ width: '200px', height: '200px', background: '#f2f1ef', border: '2px dashed #e8e6e1', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px' }}>📲</div>
        <div style={{ fontFamily: 'DM Mono', fontSize: '11px', color: '#6b6760', marginTop: '8px' }}>QR YAPE</div>
        <div style={{ fontFamily: 'DM Mono', fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>+51 XXX XXX XXX</div>
      </div>
      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '16px', padding: '20px 28px', marginBottom: '32px', maxWidth: '400px' }}>
        <div style={{ fontSize: '13px', color: '#15803d', lineHeight: 1.7 }}>
          1. Abre Yape y transfiere al número<br />
          2. Monto: <strong>S/{Number(total) - 5}</strong><br />
          3. Envía el comprobante al WhatsApp<br />
          4. Confirmamos en menos de 1 hora ✅
        </div>
      </div>
      <a href="https://wa.me/51XXXXXXXXX?text=Hola, acabo de pagar por Yape mi pedido VidaSmart"
        target="_blank" rel="noopener noreferrer"
        style={{ background: '#25d366', color: '#fff', padding: '16px 32px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '15px', marginBottom: '16px', display: 'block' }}>
        💬 Enviar comprobante por WhatsApp
      </a>
      <Link href="/" style={{ color: '#6b6760', textDecoration: 'none', fontSize: '13px' }}>
        Volver al inicio
      </Link>
    </div>
  )
}

export default function YapePageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Cargando...</div>}>
      <YapePage />
    </Suspense>
  )
}