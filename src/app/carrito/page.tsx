'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore()

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');`}</style>
        <ShoppingBag size={64} color="#e8e6e1" />
        <div style={{ fontFamily: 'Bebas Neue', fontSize: '48px', marginTop: '24px', color: '#b0aca4' }}>CARRITO VACÍO</div>
        <p style={{ color: '#6b6760', marginTop: '8px', marginBottom: '32px' }}>Agrega productos para continuar</p>
        <Link href="/productos" style={{ background: '#080808', color: '#fff', padding: '16px 32px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');`}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.9, marginBottom: '48px' }}>
          MI CARRITO <span style={{ color: '#b0aca4', fontSize: '0.5em' }}>({itemCount()} items)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>

          {/* ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '20px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Imagen */}
                <div style={{ width: '80px', height: '80px', background: '#f0f4ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '32px' }}>
                  ⚡
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{item.name}</h3>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', color: '#080808' }}>S/{item.price}</div>
                </div>

                {/* Cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f2f1ef', borderRadius: '100px', padding: '6px 16px' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #e8e6e1', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={12} />
                  </button>
                  <span style={{ fontFamily: 'DM Mono', fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #e8e6e1', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={12} />
                  </button>
                </div>

                {/* Total item */}
                <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', minWidth: '80px', textAlign: 'right' }}>
                  S/{item.price * item.quantity}
                </div>

                {/* Borrar */}
                <button onClick={() => removeItem(item.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#b0aca4', padding: '8px' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* RESUMEN */}
          <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '24px', padding: '32px', position: 'sticky', top: '100px' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', marginBottom: '24px' }}>RESUMEN</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6b6760' }}>
                <span>Subtotal ({itemCount()} items)</span>
                <span>S/{total()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6b6760' }}>
                <span>Envío Lima</span>
                <span style={{ color: total() >= 100 ? '#16a34a' : '#080808' }}>
                  {total() >= 100 ? 'GRATIS' : 'S/10'}
                </span>
              </div>
              {total() < 100 && (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '12px', fontSize: '12px', color: '#15803d' }}>
                  🎉 Agrega S/{100 - total()} más para envío gratis
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid #e8e6e1', paddingTop: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: 'Bebas Neue', fontSize: '36px' }}>
                S/{total() >= 100 ? total() : total() + 10}
              </span>
            </div>

            {/* Yape banner */}
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '20px' }}>📱</span>
              <div style={{ fontSize: '12px' }}>
                <div style={{ fontWeight: 700, color: '#15803d' }}>Paga con Yape</div>
                <div style={{ color: '#16a34a' }}>Ahorra S/5 en tu pedido</div>
              </div>
            </div>

            <Link href="/checkout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#080808', color: '#fff', padding: '18px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '15px', marginBottom: '12px' }}>
              Ir al checkout <ArrowRight size={16} />
            </Link>

            <Link href="/productos" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b6760', textDecoration: 'none', fontSize: '13px' }}>
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}