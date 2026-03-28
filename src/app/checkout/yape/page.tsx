'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const WHATSAPP_NUMBER = '51992550179'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20VidaSmart%2C%20acabo%20de%20pagar%20por%20Yape%20mi%20pedido%20con%20el%20comprobante%20adjunto`

function YapePage() {
  const searchParams = useSearchParams()
  const total = searchParams.get('total')
  const amountToPay = total ? Number(total) - 5 : 0

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
      padding: '48px 24px',
      textAlign: 'center',
      background: '#fafaf8'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');
      `}</style>

      {/* Logo Yape */}
      <div style={{
        width: '80px',
        height: '48px',
        position: 'relative',
        marginBottom: '24px',
      }}>
        <Image
          src="/img/yapeLogo.png"
          alt="Yape"
          width={80}
          height={32}
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div style={{
        fontFamily: 'Bebas Neue',
        fontSize: 'clamp(48px, 8vw, 64px)',
        marginBottom: '12px',
        color: '#080808',
        letterSpacing: '-0.01em',
      }}>
        PAGAR CON YAPE
      </div>

      <p style={{
        color: '#6b6760',
        marginBottom: '32px',
        maxWidth: '420px',
        fontSize: '15px',
        lineHeight: 1.6,
        fontFamily: 'DM Sans, sans-serif',
      }}>
        Transfiere <strong style={{ color: '#15803d', fontSize: '18px' }}>S/{amountToPay}</strong> escaneando el QR o al siguiente número, y envíanos el comprobante por WhatsApp.
      </p>

      {/* QR CODE REAL */}
      <div style={{
        width: '260px',
        height: '260px',
        background: '#ffffff',
        border: '2px solid #e8e6e1',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        padding: '16px',
      }}>
        <Image
          src="/img/QRYapeLuis.png"
          alt="QR Yape"
          width={220}
          height={220}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Número Yape */}
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: '16px',
        padding: '16px 28px',
        marginBottom: '24px',
        fontFamily: 'DM Mono',
      }}>
        <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
          TAMBIÉN POR TRANSFERENCIA
        </span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#15803d', letterSpacing: '1px' }}>
          +51 992 550 179
        </span>
      </div>

      {/* Instrucciones */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e8e6e1',
        borderRadius: '20px',
        padding: '24px 32px',
        marginBottom: '32px',
        maxWidth: '420px',
        textAlign: 'left',
      }}>
        <div style={{
          fontFamily: 'DM Mono',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: '#15803d',
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          CÓMO PAGAR
        </div>
        {[
          { step: '1', text: 'Escanea el QR o transfiere al número +51 992 550 179' },
          { step: '2', text: `Monto exacto: S/${amountToPay}` },
          { step: '3', text: 'Envía el comprobante de pago al WhatsApp' },
          { step: '4', text: 'Confirmamos tu pedido en menos de 1 hora ✅' },
        ].map(instruction => (
          <div key={instruction.step} style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '14px',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#f0fdf4',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: '#15803d',
              flexShrink: 0,
            }}>
              {instruction.step}
            </div>
            <span style={{ fontSize: '13px', color: '#4a4a4a', lineHeight: 1.5 }}>
              {instruction.text}
            </span>
          </div>
        ))}
      </div>

      {/* Botón WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          background: '#25D366',
          color: '#fff',
          padding: '16px 36px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '15px',
          marginBottom: '20px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.02)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Enviar comprobante por WhatsApp
      </a>

      <Link href="/" style={{
        color: '#9ca3af',
        textDecoration: 'none',
        fontSize: '13px',
        fontFamily: 'DM Mono',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#080808')}
      onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
      >
        ← Volver al inicio
      </Link>

      {/* Mensaje de confirmación */}
      <p style={{
        fontSize: '11px',
        color: '#cbd5e1',
        marginTop: '32px',
        fontFamily: 'DM Mono',
      }}>
        Una vez enviado el comprobante, recibirás confirmación en 1 hora
      </p>
    </div>
  )
}

export default function YapePageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center', fontFamily: 'DM Sans' }}>Cargando...</div>}>
      <YapePage />
    </Suspense>
  )
}