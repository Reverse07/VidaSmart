'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Zap, PawPrint, Gamepad2, MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react'

const NAV = {
  tienda: [
    { label: 'Todos los productos', href: '/productos' },
    { label: 'PC Gaming', href: '/productos?cat=gaming' },
    { label: 'Tecnología', href: '/productos?cat=tech' },
    { label: 'Mascotas', href: '/productos?cat=mascotas' },
    { label: 'Más vendidos', href: '/productos' },
  ],
  ayuda: [
    { label: 'Envíos y tiempos', href: '#' },
    { label: 'Devoluciones', href: '#' },
    { label: 'Preguntas frecuentes', href: '#' },
    { label: 'Seguimiento de pedido', href: '#' },
  ],
  legal: [
    { label: 'Términos y condiciones', href: '#' },
    { label: 'Política de privacidad', href: '#' },
    { label: 'Libro de reclamaciones', href: '#' },
  ],
}

// Métodos de pago con logos reales
const PAYMENT_METHODS = [
  { label: 'Yape', image: '/img/yapeLogo.png', width: 56, height: 24 },
  { label: 'Mercado Pago', image: '/img/mercadoPagoLogo.png', width: 64, height: 24 },
  { label: 'WhatsApp', icon: '💬', isEmoji: true },
]

const WHATSAPP_NUMBER = '51992550179'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20VidaSmart%2C%20me%20interesa%20un%20producto`

// SVG Icon de WhatsApp
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1, rootMargin: '0px' }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && !subscribed) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <>
      <style>{`
        .footer-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .footer-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 0.875rem;
          font-weight: 450;
          color: #5a5a5a;
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s ease;
          border-bottom: 1px solid transparent;
        }
        .footer-link:hover {
          color: #000000;
          border-bottom-color: #e5e5e5;
        }
        
        .footer-heading {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9a9a9a;
          margin-bottom: 1.25rem;
        }
        
        .newsletter-input-group {
          display: flex;
          gap: 0;
          border: 1px solid #e8e8e8;
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .newsletter-input-group:focus-within {
          border-color: #000000;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.03);
        }
        
        .payment-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #ffffff;
          border: 1px solid #ececec;
          border-radius: 40px;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 450;
          color: #3a3a3a;
        }
        .payment-badge:hover {
          border-color: #d0d0d0;
          background: #fafafa;
          transform: translateY(-1px);
        }
        
        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: 1px solid #ececec;
          background: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #5a5a5a;
          transition: all 0.2s;
        }
        .social-icon:hover {
          border-color: #c0c0c0;
          background: #f5f5f5;
          color: #000000;
          transform: translateY(-2px);
        }
        
        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 40px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 550;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .whatsapp-button:hover {
          transform: scale(1.02);
          background: #20bd59;
          box-shadow: 0 4px 12px rgba(37,211,102,0.25);
        }
        
        .footer-divider {
          border-top: 1px solid #eaeaea;
        }

        /* WhatsApp Floating Button */
        .floating-wa {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 1000;
          background: #25D366;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          text-decoration: none;
        }
        .floating-wa:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(37,211,102,0.35);
        }
        
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .floating-wa {
            bottom: 20px;
            right: 20px;
            width: 52px;
            height: 52px;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center;
            gap: 1rem !important;
          }
          .payment-strip {
            justify-content: center !important;
          }
          .floating-wa {
            bottom: 16px;
            right: 16px;
            width: 48px;
            height: 48px;
          }
        }
      `}</style>

      {/* WhatsApp Floating Button - con SVG vectorial */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>

      <footer ref={footerRef} style={{ background: '#fafaf8', borderTop: '1px solid #efefef' }}>
        
        {/* Newsletter section */}
        <div style={{ borderBottom: '1px solid #efefef', background: '#ffffff' }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '48px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.5rem',
                fontWeight: 550,
                color: '#111111',
                lineHeight: 1.2,
                marginBottom: '6px',
                letterSpacing: '-0.02em',
              }}>
                Ofertas directas
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#6b6b6b',
                margin: 0,
              }}>
                Recibe promociones exclusivas antes que nadie
              </p>
            </div>
            
            {subscribed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Inter', monospace",
                fontSize: '0.875rem',
                color: '#2b6e3c',
                background: '#f0f9f0',
                padding: '10px 20px',
                borderRadius: '40px',
              }}>
                <span>✓</span> ¡Listo! Revisa tu bandeja
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ minWidth: '280px', flex: '0 1 380px' }}>
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      padding: '12px 18px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      background: 'transparent',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#333333')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#111111')}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Main footer grid */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 48px 48px' }}>
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
            gap: '3rem',
          }}>
            
            {/* Brand column */}
            <div className={`footer-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '0ms' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 620,
                    color: '#111111',
                    letterSpacing: '-0.02em',
                  }}>VIDA</span>
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 620,
                    color: '#2563eb',
                    letterSpacing: '-0.02em',
                  }}>SMART</span>
                  <span style={{
                    marginLeft: '8px',
                    background: '#f0f0f0',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: '#5a5a5a',
                    fontFamily: "'Inter', sans-serif",
                  }}>PE</span>
                </div>
              </Link>
              
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: '#5a5a5a',
                maxWidth: '260px',
                marginBottom: '28px',
              }}>
                Tecnología para gamers, hogar inteligente y el bienestar de tu mascota.
              </p>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <Link href="/productos?cat=gaming" style={{
                  background: '#f5f5f5',
                  padding: '5px 14px',
                  borderRadius: '30px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#4b4b4b',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <Gamepad2 size={12} /> Gaming
                </Link>
                <Link href="/productos?cat=tech" style={{
                  background: '#f5f5f5',
                  padding: '5px 14px',
                  borderRadius: '30px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#4b4b4b',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <Zap size={12} /> Smart Home
                </Link>
                <Link href="/productos?cat=mascotas" style={{
                  background: '#f5f5f5',
                  padding: '5px 14px',
                  borderRadius: '30px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#4b4b4b',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <PawPrint size={12} /> Mascotas
                </Link>
              </div>
              
              {/* WhatsApp Button - con SVG vectorial */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                <WhatsAppIcon size={18} />
                Atención por WhatsApp
              </a>
            </div>
            
            {/* Tienda */}
            <div className={`footer-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '50ms' }}>
              <div className="footer-heading">Tienda</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {NAV.tienda.map(item => (
                  <Link key={item.label} href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Soporte */}
            <div className={`footer-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '100ms' }}>
              <div className="footer-heading">Soporte</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {NAV.ayuda.map(item => (
                  <Link key={item.label} href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                ))}
                {NAV.legal.map(item => (
                  <Link key={item.label} href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Contacto */}
            <div className={`footer-reveal ${visible ? 'in' : ''}`} style={{ transitionDelay: '150ms' }}>
              <div className="footer-heading">Contacto</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <a
                  href="tel:+51992550179"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#5a5a5a',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#5a5a5a')}
                >
                  <Phone size={14} style={{ color: '#9a9a9a' }} />
                  +51 992 550 179
                </a>
                <a
                  href="mailto:tmldiego0@hotmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#5a5a5a',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#5a5a5a')}
                >
                  <Mail size={14} style={{ color: '#9a9a9a' }} />
                  hola@vidasmart.pe
                </a>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#5a5a5a',
                }}>
                  <MapPin size={14} style={{ color: '#9a9a9a' }} />
                  Lima, Perú
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
                <a href="#" className="social-icon" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar con métodos de pago */}
        <div className="footer-divider">
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 48px' }}>
            <div className="footer-bottom" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: '#9a9a9a',
              }}>
                © 2026 VidaSmart · Todos los derechos reservados
              </span>
              
              <div className="payment-strip" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {PAYMENT_METHODS.map(method => (
                  <div key={method.label} className="payment-badge">
                    {method.image ? (
                      <div style={{
                        position: 'relative',
                        width: method.width,
                        height: method.height,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Image
                          src={method.image}
                          alt={method.label}
                          width={method.width}
                          height={method.height}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <span style={{ fontSize: '1rem' }}>{method.icon}</span>
                    )}
                    <span>{method.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}