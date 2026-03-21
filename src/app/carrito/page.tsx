'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gamepad2, Zap, PawPrint } from 'lucide-react'

function ItemIcon({ slug, category }: { slug: string; category?: string }) {
  if (category === 'gaming') return <Gamepad2 size={24} color="#A78BFA" />
  if (category === 'mascotas') return <PawPrint size={24} color="#D97706" />
  return <Zap size={24} color="#2563EB" />
}

function getCategory(slug: string): string {
  const gamingSlugs = ['vsg', 'razer', 'logitech', 'hyperx', 'attack', 'vgn', 'steelseries', 'redragon-m', 'wlmouse', 'lamzu', 'angry', 'darmoshark', 'scyrox', 'ajazz', 'aula', 'mercury', 'mchose', 'ninjutso', 'irok', 'epomaker', 'james', 'rawm', 'eweadn', 'atk', 'gravastar', 'lingbao', 'redragon-k', 'redragon-horus', 'k618', 'k515', 'x68', 'f75', 'k98', 'carbon60', 'g-pro-x', 'ak820', 'mercury68', 'hero-68']
  if (gamingSlugs.some(s => slug.includes(s))) return 'gaming'
  const petSlugs = ['bebedero', 'cama', 'cepillo', 'juguete', 'mascota']
  if (petSlugs.some(s => slug.includes(s))) return 'mascotas'
  return 'tech'
}

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore()

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", background: '#FAFAF8' }}>
        <ShoppingBag size={64} color="#E2DED8" />
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', marginTop: '24px', color: '#C8C3BB' }}>CARRITO VACÍO</div>
        <p style={{ color: '#7A7269', marginTop: '8px', marginBottom: '32px', fontFamily: "'DM Sans', sans-serif" }}>Agrega productos para continuar</p>
        <Link href="/productos" style={{
          background: '#080808', color: '#fff', padding: '16px 32px',
          borderRadius: '100px', textDecoration: 'none', fontWeight: 700,
          fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
        }}>
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px' }}>

        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(48px, 6vw, 80px)',
          lineHeight: 0.9, marginBottom: '48px', color: '#080808',
        }}>
          MI CARRITO{' '}
          <span style={{ color: '#C8C3BB', fontSize: '0.5em' }}>({itemCount()} items)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>

          {/* ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map(item => {
              const cat = getCategory(item.slug ?? '')
              const isDark = cat === 'gaming'
              return (
                <div key={item.id} style={{
                  background: isDark ? '#0f0a1a' : '#fff',
                  border: `1px solid ${isDark ? 'rgba(139,92,246,0.2)' : '#E2DED8'}`,
                  borderRadius: '20px', padding: '20px',
                  display: 'flex', gap: '16px', alignItems: 'center',
                  transition: 'box-shadow 0.2s ease',
                }}>
                  {/* Imagen */}
                  <div style={{
                    width: '80px', height: '80px', flexShrink: 0,
                    background: isDark ? '#1a0f2e' : cat === 'mascotas' ? '#FFF7ED' : '#EFF6FF',
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    border: isDark ? '1px solid rgba(139,92,246,0.15)' : 'none',
                    position: 'relative',
                  }}>
                    {isDark && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle at 50% 40%, rgba(139,92,246,0.15), transparent 70%)',
                        pointerEvents: 'none',
                      }} />
                    )}
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{
                        width: '90%', height: '90%', objectFit: 'contain',
                        filter: isDark ? 'drop-shadow(0 4px 8px rgba(139,92,246,0.3))' : 'none',
                        position: 'relative', zIndex: 1,
                      }} />
                    ) : (
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <ItemIcon slug={item.slug ?? ''} category={cat} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '9px',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: isDark ? '#7C3AED' : '#A09890', marginBottom: '4px',
                    }}>{cat}</p>
                    <h3 style={{
                      fontSize: '14px', fontWeight: 600,
                      color: isDark ? '#F3F0FF' : '#080808',
                      marginBottom: '4px', fontFamily: "'DM Sans', sans-serif",
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{item.name}</h3>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px',
                      color: isDark ? '#C4B5FD' : '#080808',
                    }}>S/{item.price}</div>
                  </div>

                  {/* Cantidad */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: isDark ? 'rgba(139,92,246,0.08)' : '#F2F1EF',
                    borderRadius: '100px', padding: '5px 14px',
                    border: isDark ? '1px solid rgba(139,92,246,0.15)' : 'none',
                  }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      border: isDark ? '1px solid rgba(139,92,246,0.25)' : '1.5px solid #E2DED8',
                      background: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isDark ? '#A78BFA' : '#080808',
                    }}>
                      <Minus size={11} />
                    </button>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '13px',
                      minWidth: '18px', textAlign: 'center',
                      color: isDark ? '#F3F0FF' : '#080808',
                    }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      border: isDark ? '1px solid rgba(139,92,246,0.25)' : '1.5px solid #E2DED8',
                      background: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isDark ? '#A78BFA' : '#080808',
                    }}>
                      <Plus size={11} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px',
                    minWidth: '72px', textAlign: 'right',
                    color: isDark ? '#F3F0FF' : '#080808',
                  }}>
                    S/{(item.price * item.quantity).toFixed(0)}
                  </div>

                  {/* Borrar */}
                  <button onClick={() => removeItem(item.id)} style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: isDark ? '#4A3A6A' : '#C8C3BB', padding: '8px',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#EF4444' : '#EF4444'}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#4A3A6A' : '#C8C3BB'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )
            })}
          </div>

          {/* RESUMEN */}
          <div style={{
            background: '#fff', border: '1px solid #E2DED8',
            borderRadius: '24px', padding: '32px',
            position: 'sticky', top: '100px',
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '28px', marginBottom: '24px', color: '#080808',
            }}>RESUMEN</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#7A7269', fontFamily: "'DM Sans', sans-serif" }}>
                <span>Subtotal ({itemCount()} items)</span>
                <span>S/{total()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: '#7A7269' }}>Envío Lima</span>
                <span style={{ color: total() >= 100 ? '#16a34a' : '#080808', fontWeight: 600 }}>
                  {total() >= 100 ? 'GRATIS' : 'S/10'}
                </span>
              </div>
              {total() < 100 && (
                <div style={{
                  background: '#F0FDF4', border: '1px solid #86EFAC',
                  borderRadius: '12px', padding: '12px',
                  fontSize: '12px', color: '#15803D',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  🎉 Agrega S/{100 - total()} más para envío gratis
                </div>
              )}
            </div>

            <div style={{
              borderTop: '1px solid #E2DED8', paddingTop: '20px',
              marginBottom: '24px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <span style={{ fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Total</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: '#080808' }}>
                S/{total() >= 100 ? total() : total() + 10}
              </span>
            </div>

            {/* Yape */}
            <div style={{
              background: '#F0FDF4', border: '1px solid #86EFAC',
              borderRadius: '12px', padding: '12px 16px',
              display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px',
            }}>
              <span style={{ fontSize: '20px' }}>📱</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803D', fontFamily: "'DM Sans', sans-serif" }}>Paga con Yape</div>
                <div style={{ fontSize: '12px', color: '#16A34A', fontFamily: "'DM Sans', sans-serif" }}>Ahorra S/5 en tu pedido</div>
              </div>
            </div>

            <Link href="/checkout" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: '#080808', color: '#fff', padding: '18px', borderRadius: '100px',
              textDecoration: 'none', fontWeight: 700, fontSize: '15px', marginBottom: '12px',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#8B5CF6'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#080808'}
            >
              Ir al checkout <ArrowRight size={16} />
            </Link>

            <Link href="/productos" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7A7269', textDecoration: 'none', fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}