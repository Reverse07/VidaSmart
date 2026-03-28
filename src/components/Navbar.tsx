'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, Zap, PawPrint, ChevronRight, Gamepad2, Mouse, Keyboard, Headset, Monitor, Sofa, SquareMousePointer } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const itemCount = useCartStore(state => state.itemCount)
  const items = useCartStore(state => state.items)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartPreview, setCartPreview] = useState(false)
  const pathname = usePathname()
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setActiveDropdown(null) }, [pathname])

  const openDropdown = (key: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setActiveDropdown(key)
  }
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  const gamingSubcategories = [
    { label: 'Mice', href: '/productos?cat=gaming&subcat=mice', icon: <Mouse size={12} />, color: '#8B5CF6' },
    { label: 'Teclados', href: '/productos?cat=gaming&subcat=teclados', icon: <Keyboard size={12} />, color: '#A78BFA' },
    { label: 'Headsets', href: '/productos?cat=gaming&subcat=headsets', icon: <Headset size={12} />, color: '#C084FC' },
    { label: 'Mousepads', href: '/productos?cat=gaming&subcat=mousepads', icon: <SquareMousePointer size={12} />, color: '#D946EF' },
    { label: 'Sillas', href: '/productos?cat=gaming&subcat=sillas', icon: <Sofa size={12} />, color: '#EC489A' },
    { label: 'Monitores', href: '/productos?cat=gaming&subcat=monitores', icon: <Monitor size={12} />, color: '#F43F5E' },
  ]

  const categories = [
    {
      key: 'gaming',
      label: 'Gaming',
      href: '/productos?cat=gaming',
      icon: <Gamepad2 size={14} />,
      color: '#1a0f2e',
      textColor: '#A78BFA',
      accent: '#8B5CF6',
      items: gamingSubcategories,
    },
    {
      key: 'tech',
      label: 'Tecnología',
      href: '/productos?cat=tech',
      icon: <Zap size={14} />,
      color: '#EFF6FF',
      textColor: '#2563EB',
      accent: '#2563EB',
      items: ['Enchufes WiFi', 'Tiras LED Smart', 'Soportes Laptop', 'Organizadores'],
    },
    {
      key: 'mascotas',
      label: 'Mascotas',
      href: '/productos?cat=mascotas',
      icon: <PawPrint size={14} />,
      color: '#FFF7ED',
      textColor: '#D97706',
      accent: '#D97706',
      items: ['Bebederos', 'Camas térmicas', 'Cepillos', 'Juguetes'],
    },
  ]

  const getCartIcon = (slug: string) => {
    if (slug?.includes('razer') || slug?.includes('logitech') || slug?.includes('attack') || slug?.includes('vgn') || slug?.includes('hyperx')) return '🎮'
    if (slug?.includes('bebedero') || slug?.includes('cama') || slug?.includes('cepillo') || slug?.includes('juguete')) return '🐾'
    return '⚡'
  }

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          color: #7A7269;
          padding: 8px 12px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link:hover { color: #080808; background: #F7F6F4; }
        .nav-link.active { color: #080808; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 12px; right: 12px;
          height: 1.5px;
          background: #2563EB;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link.active::after, .nav-link:hover::after { transform: scaleX(1); }
        .nav-link-gaming::after { background: #8B5CF6 !important; }

        .dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 280px;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
          animation: dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both;
          z-index: 200;
        }
        .dropdown-light {
          background: #FAFAF8;
          border: 1px solid #E2DED8;
        }
        .dropdown-dark {
          background: #0f0a1a;
          border: 1px solid rgba(139,92,246,0.25);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.15s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .dropdown-item-light { color: #5C554E; }
        .dropdown-item-light:hover { background: #F7F6F4; color: #080808; padding-left: 16px; }
        .dropdown-item-dark { color: #9F7AEA; }
        .dropdown-item-dark:hover { background: rgba(139,92,246,0.1); color: #C4B5FD; padding-left: 16px; }

        .cart-btn {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px;
          border-radius: 50%;
          text-decoration: none;
          color: #080808;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .cart-btn:hover { background: #F7F6F4; transform: scale(1.05); }
        .badge {
          position: absolute;
          top: 2px; right: 2px;
          background: #2563EB;
          color: #fff;
          font-size: 9px; font-weight: 700;
          min-width: 16px; height: 16px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px;
          border: 2px solid #FAFAF8;
          font-family: 'DM Mono', monospace;
          animation: badgePop 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes badgePop {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        .cart-preview {
          position: absolute;
          top: calc(100% + 12px); right: 0;
          width: 320px;
          background: #FAFAF8;
          border: 1px solid #E2DED8;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.10);
          animation: dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both;
          z-index: 200;
        }

        .mobile-menu {
          border-top: 1px solid #E2DED8;
          background: #FAFAF8;
          padding: 16px 20px 28px;
          display: flex; flex-direction: column; gap: 2px;
          animation: slideDown 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px; border-radius: 12px;
          font-size: 15px; font-weight: 500;
          color: #3E3A35; text-decoration: none;
          transition: background 0.15s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-link:hover { background: #F7F6F4; }
        .mobile-subcategory {
          padding-left: 48px;
          font-size: 14px;
          color: #7C3AED;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .announce-payment-icons { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>

      {/* ANNOUNCEMENT BAR - CON LOGOS REALES */}
      <div style={{
        background: '#080808', color: '#fff',
        height: '40px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden', position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '32px',
          animation: 'marqueeAnnounce 28s linear infinite',
          whiteSpace: 'nowrap',
          padding: '0 24px',
        }}>
          {/* Primera tanda */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '20px', height: '20px', position: 'relative', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image 
                src="/img/yapeLogo.png" 
                alt="Yape" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain' }}
              />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
              Yape / Plin
            </span>
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '20px', height: '20px', position: 'relative', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image 
                src="/img/mercadoPagoLogo.png" 
                alt="Mercado Pago" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain' }}
              />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
              Mercado Pago
            </span>
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '20px', height: '20px', position: 'relative', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image 
                src="/img/whatsappLogo.jpg" 
                alt="WhatsApp" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain', borderRadius: '2px' }}
              />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
              +51 992 550 179
            </span>
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            📦 Envíos a todo Perú
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            🎮 Gaming gear
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            ⚡ Smart Home
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            🐾 Pet care
          </span>

          {/* Segunda tanda (para marquee) */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '20px', height: '20px', position: 'relative', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image 
                src="/img/yapeLogo.png" 
                alt="Yape" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain' }}
              />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
              Yape / Plin
            </span>
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '20px', height: '20px', position: 'relative', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image 
                src="/img/mercadoPagoLogo.png" 
                alt="Mercado Pago" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain' }}
              />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
              Mercado Pago
            </span>
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '20px', height: '20px', position: 'relative', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image 
                src="/img/whatsappLogo.jpg" 
                alt="WhatsApp" 
                width={18} 
                height={18}
                style={{ objectFit: 'contain', borderRadius: '2px' }}
              />
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
              +51 999 999 999
            </span>
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            📦 Envíos a todo Perú
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            🎮 Gaming gear
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            ⚡ Smart Home
          </span>
          
          <span style={{ color: '#333', fontSize: '12px' }}>✦</span>
          
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.03em' }}>
            🐾 Pet care
          </span>
        </div>
        
        <style>{`
          @keyframes marqueeAnnounce {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* MAIN NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(250,250,248,0.96)' : 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? '#E2DED8' : 'transparent'}`,
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 48px',
          height: '68px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '24px',
        }}>

          {/* LOGO */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', letterSpacing: '-0.01em', color: '#080808', lineHeight: 1 }}>VIDA</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', letterSpacing: '-0.01em', color: '#2563EB', lineHeight: 1 }}>SMART</span>
              <div style={{
                marginLeft: '8px', background: '#EFF6FF', border: '1px solid #DBEAFE',
                borderRadius: '6px', padding: '2px 8px',
                fontFamily: "'DM Mono', monospace", fontSize: '9px',
                letterSpacing: '0.06em', color: '#2563EB', fontWeight: 500,
              }}>PERÚ</div>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="desktop-nav" style={{
            display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'center',
          }}>
            <Link href="/productos" className={`nav-link ${pathname === '/productos' ? 'active' : ''}`}>
              Todos
            </Link>

            {categories.map(cat => (
              <div key={cat.key} style={{ position: 'relative' }}
                onMouseEnter={() => openDropdown(cat.key)}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={cat.href}
                  className={`nav-link ${cat.key === 'gaming' ? 'nav-link-gaming' : ''} ${pathname?.includes(`cat=${cat.key}`) ? 'active' : ''}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: cat.key === 'gaming' && activeDropdown === 'gaming' ? '#8B5CF6' : undefined,
                  }}
                >
                  {cat.key === 'gaming' && (
                    <span style={{ color: '#8B5CF6', opacity: 0.8 }}>
                      <Gamepad2 size={13} />
                    </span>
                  )}
                  {cat.label}
                  <span style={{
                    display: 'inline-block',
                    transform: activeDropdown === cat.key ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease', opacity: 0.5,
                  }}>
                    <ChevronRight size={11} />
                  </span>
                </Link>

                {activeDropdown === cat.key && (
                  <div
                    className={`dropdown ${cat.key === 'gaming' ? 'dropdown-dark' : 'dropdown-light'}`}
                    onMouseEnter={() => openDropdown(cat.key)}
                    onMouseLeave={closeDropdown}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px',
                      background: cat.key === 'gaming' ? 'rgba(139,92,246,0.1)' : cat.color,
                      border: cat.key === 'gaming' ? '1px solid rgba(139,92,246,0.2)' : 'none',
                      borderRadius: '14px', marginBottom: '12px',
                    }}>
                      <span style={{ color: cat.textColor }}>{cat.icon}</span>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px',
                        letterSpacing: '0.02em',
                        color: cat.key === 'gaming' ? '#C4B5FD' : '#080808',
                      }}>{cat.label.toUpperCase()}</span>
                    </div>

                    {cat.key === 'gaming' ? (
                      <>
                        {cat.items.map((item: any) => (
                          <Link key={item.label} href={item.href}
                            className={`dropdown-item ${cat.key === 'gaming' ? 'dropdown-item-dark' : 'dropdown-item-light'}`}
                          >
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: item.color, flexShrink: 0,
                            }} />
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {item.icon}
                              {item.label}
                            </span>
                          </Link>
                        ))}
                        <div style={{
                          marginTop: '12px', paddingTop: '12px',
                          borderTop: `1px solid ${cat.key === 'gaming' ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
                        }}>
                          <Link href={cat.href} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '9px 12px', borderRadius: '10px',
                            fontSize: '12px', fontWeight: 600,
                            color: cat.accent, textDecoration: 'none',
                            fontFamily: "'DM Mono', monospace",
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                            transition: 'background 0.15s',
                          }}>
                            Ver toda la colección
                            <ChevronRight size={12} />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        {(cat.items as string[]).map(item => (
                          <Link key={item} href={cat.href}
                            className={`dropdown-item ${cat.key === 'gaming' ? 'dropdown-item-dark' : 'dropdown-item-light'}`}
                          >
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: cat.accent, flexShrink: 0,
                            }} />
                            {item}
                          </Link>
                        ))}
                        <div style={{
                          marginTop: '12px', paddingTop: '12px',
                          borderTop: `1px solid ${cat.key === 'gaming' ? 'rgba(139,92,246,0.15)' : '#E2DED8'}`,
                        }}>
                          <Link href={cat.href} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '9px 12px', borderRadius: '10px',
                            fontSize: '12px', fontWeight: 600,
                            color: cat.accent, textDecoration: 'none',
                            fontFamily: "'DM Mono', monospace",
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                            transition: 'background 0.15s',
                          }}>
                            Ver toda la colección
                            <ChevronRight size={12} />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>

            {/* CART */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => { if (itemCount() > 0) setCartPreview(true) }}
              onMouseLeave={() => setCartPreview(false)}
            >
              <Link href="/carrito" className="cart-btn">
                <ShoppingCart size={19} strokeWidth={1.7} />
                {itemCount() > 0 && (
                  <div className="badge" key={itemCount()}>
                    {itemCount() > 9 ? '9+' : itemCount()}
                  </div>
                )}
              </Link>

              {cartPreview && itemCount() > 0 && (
                <div className="cart-preview">
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '10px',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#A09890', marginBottom: '12px',
                  }}>{itemCount()} {itemCount() === 1 ? 'producto' : 'productos'}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    {items.slice(0, 3).map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{
                          width: '40px', height: '40px', background: '#F7F6F4',
                          borderRadius: '10px', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '18px', flexShrink: 0,
                        }}>
                          {getCartIcon(item.slug)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontSize: '12px', fontWeight: 600, color: '#080808',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{item.name}</p>
                          <p style={{ fontSize: '11px', color: '#A09890' }}>
                            x{item.quantity} · S/{(item.price * item.quantity).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <p style={{ fontSize: '11px', color: '#A09890', fontFamily: "'DM Mono', monospace" }}>
                        +{items.length - 3} más...
                      </p>
                    )}
                  </div>

                  <Link href="/carrito" style={{
                    display: 'block', textAlign: 'center',
                    background: '#080808', color: '#fff',
                    padding: '12px', borderRadius: '100px',
                    textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                  }}>
                    Ver carrito →
                  </Link>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link href="/productos" className="desktop-nav" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#080808', color: '#fff',
              padding: '8px 20px', borderRadius: '100px',
              textDecoration: 'none', fontSize: '13px', fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
              marginLeft: '4px',
            }}>
              Comprar
              <ChevronRight size={13} />
            </Link>

            {/* Mobile toggle */}
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{
              width: '40px', height: '40px', borderRadius: '50%', border: 'none',
              background: menuOpen ? '#F7F6F4' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#080808', cursor: 'pointer',
              transition: 'background 0.2s',
            }} aria-label="Menú">
              {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link href="/productos" className="mobile-link">
              Todos los productos
              <ChevronRight size={14} style={{ color: '#C8C3BB' }} />
            </Link>
            
            <div>
              <Link href="/productos?cat=gaming" className="mobile-link" style={{ color: '#7C3AED' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '28px', height: '28px', background: '#1a0f2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Gamepad2 size={13} color="#A78BFA" />
                  </span>
                  PC Gaming
                </span>
                <ChevronRight size={14} style={{ color: '#C8C3BB' }} />
              </Link>
              <div style={{ marginLeft: '48px', marginTop: '4px', marginBottom: '4px' }}>
                {gamingSubcategories.map(sub => (
                  <Link key={sub.label} href={sub.href} className="mobile-link mobile-subcategory" style={{ 
                    padding: '10px 16px', 
                    fontSize: '13px',
                    color: sub.color,
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {sub.icon}
                      {sub.label}
                    </span>
                    <ChevronRight size={12} style={{ color: '#C8C3BB' }} />
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/productos?cat=tech" className="mobile-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '28px', height: '28px', background: '#EFF6FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={13} color="#2563EB" />
                </span>
                Tecnología
              </span>
              <ChevronRight size={14} style={{ color: '#C8C3BB' }} />
            </Link>
            <Link href="/productos?cat=mascotas" className="mobile-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '28px', height: '28px', background: '#FFF7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PawPrint size={13} color="#D97706" />
                </span>
                Mascotas
              </span>
              <ChevronRight size={14} style={{ color: '#C8C3BB' }} />
            </Link>
            <div style={{ height: '1px', background: '#E2DED8', margin: '8px 0' }} />
            <Link href="/carrito" className="mobile-link" style={{ color: '#2563EB' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={16} />
                Carrito {itemCount() > 0 && `(${itemCount()})`}
              </span>
              <ChevronRight size={14} style={{ color: '#C8C3BB' }} />
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}