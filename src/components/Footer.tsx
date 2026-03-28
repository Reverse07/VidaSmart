'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Zap, PawPrint, Gamepad2, MapPin, Mail, Phone, MessageCircle } from 'lucide-react'

const NAV = {
  tienda: [
    { label: 'Todos los productos', href: '/productos' },
    { label: 'PC Gaming',           href: '/productos?cat=gaming' },
    { label: 'Tecnología',          href: '/productos?cat=tech' },
    { label: 'Mascotas',            href: '/productos?cat=mascotas' },
    { label: 'Más vendidos',        href: '/productos' },
  ],
  ayuda: [
    { label: 'Envíos y tiempos',      href: '#' },
    { label: 'Devoluciones',          href: '#' },
    { label: 'Preguntas frecuentes',  href: '#' },
    { label: 'Seguimiento de pedido', href: '#' },
  ],
}

// MÉTODOS DE PAGO CON LOGOS REALES
const PAYMENT_METHODS = [
  { label: 'Yape', image: '/img/yapeLogo.png', width: 48, height: 20 },
  { label: 'Plin', image: '/img/yapeLogo.png', width: 48, height: 20 },
  { label: 'Mercado Pago', image: '/img/mercadoPagoLogo.png', width: 56, height: 20 },
  { label: 'Visa', emoji: '💳' },
  { label: 'Mastercard', emoji: '💳' },
]

export default function Footer() {
  const [visible, setVisible]       = useState(false)
  const [email, setEmail]           = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const footerRef                   = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <>
      <style>{`
        .ft-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ft-reveal.ft-in { opacity: 1; transform: translateY(0); }
        .ft-d1 { transition-delay: 0.05s; }
        .ft-d2 { transition-delay: 0.12s; }
        .ft-d3 { transition-delay: 0.19s; }
        .ft-d4 { transition-delay: 0.26s; }
        .ft-d5 { transition-delay: 0.33s; }

        .ft-link {
          display: flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: #7A7269; text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease, gap 0.2s ease;
          width: fit-content;
        }
        .ft-link::before {
          content: ''; width: 0px; height: 1px;
          background: #8B5CF6;
          transition: width 0.25s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }
        .ft-link:hover { color: #080808; gap: 8px; }
        .ft-link:hover::before { width: 12px; }

        .ft-email-wrap {
          display: flex; gap: 0;
          border: 1.5px solid #E2DED8; border-radius: 100px;
          overflow: hidden; background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .ft-email-wrap:focus-within {
          border-color: #8B5CF6;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.08);
        }
        .ft-email-input {
          flex: 1; border: none; outline: none;
          padding: 12px 20px;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: #080808; background: transparent;
        }
        .ft-email-input::placeholder { color: #C8C3BB; }
        .ft-email-btn {
          background: #080808; color: #fff; border: none;
          padding: 12px 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s ease;
          border-radius: 0 100px 100px 0; flex-shrink: 0;
        }
        .ft-email-btn:hover { background: #8B5CF6; }

        .ft-payment {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; background: #fff;
          border: 1px solid #E2DED8; border-radius: 10px;
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.04em; color: #7A7269;
          transition: all 0.2s ease;
        }
        .ft-payment:hover {
          border-color: #C8C3BB;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }
        .ft-payment-image {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .ft-social {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid #E2DED8; background: transparent;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; cursor: pointer;
          transition: all 0.2s ease; text-decoration: none;
          color: #7A7269;
        }
        .ft-social:hover {
          border-color: #C8C3BB; background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          color: #080808;
        }

        .ft-wa {
          display: inline-flex; align-items: center; gap: 10px;
          background: #25D366; color: #fff;
          padding: 10px 22px; border-radius: 100px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          border: none; cursor: pointer;
        }
        .ft-wa:hover { transform: scale(1.02); box-shadow: 0 8px 24px rgba(37,211,102,0.3); }

        .ft-bottom-link {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: #C8C3BB; text-decoration: none; letter-spacing: 0.06em;
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: #7A7269; }

        @media (max-width: 900px) { .ft-main-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) {
          .ft-main-grid { grid-template-columns: 1fr !important; }
          .ft-bottom { flex-direction: column !important; gap: 16px !important; text-align: center; }
          .ft-payment-methods { justify-content: center !important; }
        }
      `}</style>

      <footer ref={footerRef} style={{ background: '#F5F3EF', borderTop: '1px solid #E2DED8' }}>

        {/* NEWSLETTER STRIP */}
        <div style={{ borderBottom: '1px solid #E2DED8', background: '#fff' }}>
          <div style={{
            maxWidth: '1400px', margin: '0 auto', padding: '40px 48px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '28px', color: '#080808', lineHeight: 1, marginBottom: '6px',
              }}>OFERTAS EXCLUSIVAS</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#7A7269' }}>
                Sé el primero en saber de descuentos y nuevos productos
              </p>
            </div>
            {subscribed ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: "'DM Mono', monospace", fontSize: '12px',
                color: '#16A34A', letterSpacing: '0.06em',
              }}>
                <span>✓</span> ¡Suscrito! Te avisaremos pronto.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', minWidth: '320px', flex: '0 1 400px' }}>
                <div className="ft-email-wrap" style={{ flex: 1 }}>
                  <input
                    className="ft-email-input" type="email"
                    placeholder="tu@email.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <button type="submit" className="ft-email-btn">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* MAIN GRID */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '64px 48px 48px' }}>
          <div className="ft-main-grid" style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: '48px',
          }}>

            {/* Brand */}
            <div className={`ft-reveal ft-d1 ${visible ? 'ft-in' : ''}`}>
              <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '30px', color: '#080808', lineHeight: 1 }}>VIDA</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '30px', color: '#2563EB', lineHeight: 1 }}>SMART</span>
                  <div style={{
                    marginLeft: '6px', background: '#EFF6FF', border: '1px solid #DBEAFE',
                    borderRadius: '4px', padding: '2px 6px',
                    fontFamily: "'DM Mono', monospace", fontSize: '9px',
                    letterSpacing: '0.08em', color: '#2563EB',
                  }}>PERÚ</div>
                </div>
              </Link>

              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#7A7269',
                lineHeight: 1.75, maxWidth: '260px', marginBottom: '28px',
              }}>
                Gaming, tecnología inteligente y accesorios para mascotas. Envíos a todo el Perú desde Lima.
              </p>

              {/* Category pills */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                <Link href="/productos?cat=gaming" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: '#1a0f2e', border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: '100px', padding: '5px 12px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                  fontWeight: 500, color: '#A78BFA', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}>
                  <Gamepad2 size={11} /> Gaming
                </Link>
                <Link href="/productos?cat=tech" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: '#EFF6FF', border: '1px solid #DBEAFE',
                  borderRadius: '100px', padding: '5px 12px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                  fontWeight: 500, color: '#2563EB', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}>
                  <Zap size={11} /> Tech
                </Link>
                <Link href="/productos?cat=mascotas" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: '#FFF7ED', border: '1px solid #FED7AA',
                  borderRadius: '100px', padding: '5px 12px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                  fontWeight: 500, color: '#D97706', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}>
                  <PawPrint size={11} /> Mascotas
                </Link>
              </div>

              <a href="https://wa.me/51XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="ft-wa">
                <MessageCircle size={18} strokeWidth={1.8} />
                Escríbenos por WhatsApp
              </a>
            </div>

            {/* Tienda */}
            <div className={`ft-reveal ft-d2 ${visible ? 'ft-in' : ''}`}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: '10px',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#C8C3BB', marginBottom: '20px',
              }}>Tienda</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {NAV.tienda.map(l => (
                  <Link key={l.label} href={l.href} className="ft-link">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Ayuda */}
            <div className={`ft-reveal ft-d3 ${visible ? 'ft-in' : ''}`}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: '10px',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#C8C3BB', marginBottom: '20px',
              }}>Ayuda</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {NAV.ayuda.map(l => (
                  <Link key={l.label} href={l.href} className="ft-link">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Contacto */}
            <div className={`ft-reveal ft-d4 ${visible ? 'ft-in' : ''}`}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: '10px',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#C8C3BB', marginBottom: '20px',
              }}>Contacto</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[
                  { icon: <Phone size={13} />, text: '+51 999 999 999', href: 'tel:+51999999999' },
                  { icon: <Mail size={13} />,  text: 'hola@vidasmart.pe', href: 'mailto:hola@vidasmart.pe' },
                  { icon: <MapPin size={13} />, text: 'Lima, Perú', href: '#' },
                ].map(c => (
                  <a key={c.text} href={c.href} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px', color: '#7A7269', transition: 'color 0.2s ease',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#080808'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7A7269'}
                  >
                    <span style={{ color: '#C8C3BB', flexShrink: 0 }}>{c.icon}</span>
                    {c.text}
                  </a>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="#" className="ft-social" aria-label="Instagram">
                  <span>📸</span>
                </a>
                <a href="#" className="ft-social" aria-label="TikTok">
                  <span>🎵</span>
                </a>
                <a href="#" className="ft-social" aria-label="Facebook">
                  <span>👥</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: '1px solid #E2DED8' }}>
          <div className={`ft-reveal ft-d5 ${visible ? 'ft-in' : ''} ft-bottom`} style={{
            maxWidth: '1400px', margin: '0 auto', padding: '20px 48px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '11px',
              color: '#C8C3BB', letterSpacing: '0.06em',
            }}>© 2026 VidaSmart · Lima, Perú</span>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {['Términos', 'Privacidad', 'Cookies'].map(t => (
                <Link key={t} href="#" className="ft-bottom-link">{t}</Link>
              ))}
            </div>
            
            {/* Payment methods con logos reales */}
            <div className="ft-payment-methods" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {PAYMENT_METHODS.map(p => (
                <div key={p.label} className="ft-payment">
                  {p.image ? (
                    <div className="ft-payment-image">
                      <Image 
                        src={p.image} 
                        alt={p.label} 
                        width={p.width} 
                        height={p.height}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <span>{p.emoji}</span>
                  )}
                  <span style={{ marginLeft: p.image ? '4px' : '0' }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}