'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, Zap, PawPrint, ChevronRight, Gamepad2, Mouse, Keyboard, Headset, Monitor, Sofa, SquareMousePointer } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const WHATSAPP_NUMBER = '51992550179'

const gamingSubcategories = [
  { label: 'Mice', href: '/productos?cat=gaming&subcat=mice', icon: <Mouse size={12} /> },
  { label: 'Teclados', href: '/productos?cat=gaming&subcat=teclados', icon: <Keyboard size={12} /> },
  { label: 'Headsets', href: '/productos?cat=gaming&subcat=headsets', icon: <Headset size={12} /> },
  { label: 'Mousepads', href: '/productos?cat=gaming&subcat=mousepads', icon: <SquareMousePointer size={12} /> },
  { label: 'Sillas', href: '/productos?cat=gaming&subcat=sillas', icon: <Sofa size={12} /> },
  { label: 'Monitores', href: '/productos?cat=gaming&subcat=monitores', icon: <Monitor size={12} /> },
]

const categories = [
  {
    key: 'gaming',
    label: 'Gaming',
    href: '/productos?cat=gaming',
    icon: <Gamepad2 size={14} />,
    items: gamingSubcategories,
  },
  {
    key: 'tech',
    label: 'Tecnología',
    href: '/productos?cat=tech',
    icon: <Zap size={14} />,
    items: ['Enchufes WiFi', 'Tiras LED Smart', 'Soportes Laptop', 'Organizadores'],
  },
  {
    key: 'mascotas',
    label: 'Mascotas',
    href: '/productos?cat=mascotas',
    icon: <PawPrint size={14} />,
    items: ['Bebederos', 'Camas térmicas', 'Cepillos', 'Juguetes'],
  },
]

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
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const openDropdown = (key: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setActiveDropdown(key)
  }

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  const getCartIcon = (slug: string) => {
    if (slug?.includes('razer') || slug?.includes('logitech') || slug?.includes('attack')) return '🎮'
    if (slug?.includes('bebedero') || slug?.includes('cama')) return '🐾'
    return '⚡'
  }

  return (
    <>
      <style>{`
        /* Reset y estilos base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Navbar links */
        .nav-link {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a4a4a;
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: color 0.2s ease;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: #000000;
        }
        .nav-link.active {
          color: #2563eb;
        }

        /* Dropdown */
        .dropdown {
          position: absolute;
          top: calc(100% + 0.75rem);
          left: 50%;
          transform: translateX(-50%);
          min-width: 260px;
          background: #ffffff;
          border-radius: 1rem;
          padding: 0.75rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border: 1px solid #eaeaea;
          z-index: 200;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.813rem;
          color: #4a4a4a;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .dropdown-item:hover {
          background: #f5f5f5;
          color: #000000;
        }

        /* Cart */
        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          color: #2c2c2c;
          transition: background 0.2s ease;
        }
        .cart-btn:hover {
          background: #f5f5f5;
        }

        .badge {
          position: absolute;
          top: -0.125rem;
          right: -0.125rem;
          background: #2563eb;
          color: #ffffff;
          font-size: 0.688rem;
          font-weight: 600;
          min-width: 1.125rem;
          height: 1.125rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', monospace;
        }

        .cart-preview {
          position: absolute;
          top: calc(100% + 0.75rem);
          right: 0;
          width: 300px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 1rem;
          padding: 1.25rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          z-index: 200;
        }

        /* Mobile menu */
        .mobile-menu {
          border-top: 1px solid #eaeaea;
          background: #ffffff;
          padding: 1rem;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.938rem;
          font-weight: 500;
          color: #2c2c2c;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .mobile-link:hover {
          background: #f5f5f5;
        }

        /* Announcement bar marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Announcement Bar */}
      <div style={{
        background: '#111111',
        color: '#ffffff',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontSize: '0.75rem',
        fontFamily: "'Inter', monospace",
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          animation: 'marquee 30s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {/* Items */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/img/yapeLogo.png" alt="Yape" width={16} height={16} />
            <span>Yape / Plin</span>
          </span>
          <span style={{ color: '#333' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/img/mercadoPagoLogo.png" alt="Mercado Pago" width={16} height={16} />
            <span>Mercado Pago</span>
          </span>
          <span style={{ color: '#333' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/img/whatsappLogo.png" alt="WhatsApp" width={16} height={16} />
            <span>+51 992 550 179</span>
          </span>
          <span style={{ color: '#333' }}>•</span>
          <span>📦 Envíos a todo Perú</span>
          <span style={{ color: '#333' }}>•</span>
          <span>🎮 Gaming gear</span>
          <span style={{ color: '#333' }}>•</span>
          <span>⚡ Smart Home</span>
          <span style={{ color: '#333' }}>•</span>
          <span>🐾 Pet care</span>
          {/* Duplicado para efecto infinito */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/img/yapeLogo.png" alt="Yape" width={16} height={16} />
            <span>Yape / Plin</span>
          </span>
          <span style={{ color: '#333' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/img/mercadoPagoLogo.png" alt="Mercado Pago" width={16} height={16} />
            <span>Mercado Pago</span>
          </span>
          <span style={{ color: '#333' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image src="/img/whatsappLogo.png" alt="WhatsApp" width={16} height={16} />
            <span>+51 992 550 179</span>
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? '#eaeaea' : 'transparent'}`,
        transition: 'all 0.25s ease',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.5rem',
                fontWeight: 620,
                color: '#111111',
                letterSpacing: '-0.02em',
              }}>VIDA</span>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.5rem',
                fontWeight: 620,
                color: '#2563eb',
                letterSpacing: '-0.02em',
              }}>SMART</span>
              <span style={{
                marginLeft: '0.5rem',
                background: '#f0f0f0',
                padding: '2px 6px',
                borderRadius: '20px',
                fontSize: '0.625rem',
                fontWeight: 500,
                color: '#666',
                fontFamily: "'Inter', sans-serif",
              }}>PE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flex: 1,
            justifyContent: 'center',
          }}>
            <Link href="/productos" className={`nav-link ${pathname === '/productos' ? 'active' : ''}`}>
              Todos
            </Link>

            {categories.map(cat => (
              <div
                key={cat.key}
                style={{ position: 'relative' }}
                onMouseEnter={() => openDropdown(cat.key)}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={cat.href}
                  className={`nav-link ${pathname?.includes(`cat=${cat.key}`) ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <span style={{ opacity: 0.7 }}>{cat.icon}</span>
                  {cat.label}
                  <ChevronRight size={12} style={{
                    transform: activeDropdown === cat.key ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    opacity: 0.5,
                  }} />
                </Link>

                {activeDropdown === cat.key && (
                  <div className="dropdown">
                    {cat.key === 'gaming' ? (
                      cat.items.map((item: any) => (
                        <Link key={item.label} href={item.href} className="dropdown-item">
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8B5CF6' }} />
                          {item.icon}
                          {item.label}
                        </Link>
                      ))
                    ) : (
                      (cat.items as string[]).map(item => (
                        <Link key={item} href={cat.href} className="dropdown-item">
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2563eb' }} />
                          {item}
                        </Link>
                      ))
                    )}
                    <div style={{
                      marginTop: '0.5rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid #eaeaea',
                    }}>
                      <Link href={cat.href} className="dropdown-item" style={{ justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.688rem', fontWeight: 500, color: '#666' }}>VER TODO</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>

            {/* Cart */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => itemCount() > 0 && setCartPreview(true)}
              onMouseLeave={() => setCartPreview(false)}
            >
              <Link href="/carrito" className="cart-btn">
                <ShoppingCart size={18} />
                {itemCount() > 0 && (
                  <div className="badge">
                    {itemCount() > 9 ? '9+' : itemCount()}
                  </div>
                )}
              </Link>

              {cartPreview && itemCount() > 0 && (
                <div className="cart-preview">
                  <p style={{ fontSize: '0.688rem', fontWeight: 500, color: '#999', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    {itemCount()} {itemCount() === 1 ? 'producto' : 'productos'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1rem' }}>
                    {items.slice(0, 3).map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          background: '#f5f5f5',
                          borderRadius: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                        }}>
                          {getCartIcon(item.slug)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '0.813rem', fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: '0.688rem', color: '#999' }}>
                            {item.quantity} x S/{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <p style={{ fontSize: '0.688rem', color: '#999' }}>+{items.length - 3} más</p>
                    )}
                  </div>
                  <Link href="/carrito" style={{
                    display: 'block',
                    textAlign: 'center',
                    background: '#111',
                    color: '#fff',
                    padding: '0.625rem',
                    borderRadius: '2rem',
                    textDecoration: 'none',
                    fontSize: '0.813rem',
                    fontWeight: 500,
                    transition: 'background 0.2s',
                  }}>
                    Ver carrito
                  </Link>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/productos" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: '#111',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontSize: '0.813rem',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              transition: 'background 0.2s',
            }}>
              Comprar
              <ChevronRight size={12} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                border: 'none',
                background: menuOpen ? '#f5f5f5' : 'transparent',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2c2c2c',
              }}
              className="mobile-toggle"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link href="/productos" className="mobile-link">
              Todos los productos
              <ChevronRight size={14} />
            </Link>
            
            <div>
              <Link href="/productos?cat=gaming" className="mobile-link" style={{ color: '#8B5CF6' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Gamepad2 size={14} />
                  PC Gaming
                </span>
                <ChevronRight size={14} />
              </Link>
              <div style={{ marginLeft: '2rem' }}>
                {gamingSubcategories.map(sub => (
                  <Link key={sub.label} href={sub.href} className="mobile-link" style={{ padding: '0.5rem 1rem', fontSize: '0.813rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {sub.icon}
                      {sub.label}
                    </span>
                    <ChevronRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/productos?cat=tech" className="mobile-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={14} />
                Tecnología
              </span>
              <ChevronRight size={14} />
            </Link>
            
            <Link href="/productos?cat=mascotas" className="mobile-link">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PawPrint size={14} />
                Mascotas
              </span>
              <ChevronRight size={14} />
            </Link>
            
            <div style={{ height: '1px', background: '#eaeaea', margin: '0.5rem 0' }} />
            
            <Link href="/carrito" className="mobile-link" style={{ color: '#2563eb' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingCart size={14} />
                Carrito {itemCount() > 0 && `(${itemCount()})`}
              </span>
              <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}