'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [payMethod, setPayMethod] = useState<'mp' | 'yape'>('mp')
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    direccion: '', ciudad: 'Lima', referencia: ''
  })

  const shipping = total() >= 100 ? 0 : 10
  const totalFinal = total() + shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleMP = async () => {
    setLoading(true)
    try {
      const orden_id = `VS-${Date.now()}`
      const res = await fetch('/api/crear-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email: form.email, orden_id })
      })
      const data = await res.json()
      if (data.init_point) {
        clearCart()
        window.location.href = data.init_point
      }
    } catch (err) {
      console.error(err)
      alert('Error procesando pago. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleYape = async () => {
    setLoading(true)
    setTimeout(() => {
      clearCart()
      router.push('/checkout/yape?total=' + totalFinal)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif' }}>
        <p style={{ color: '#6b6760', marginBottom: '24px' }}>No tienes productos en el carrito</p>
        <Link href="/productos" style={{ background: '#080808', color: '#fff', padding: '16px 32px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700 }}>Ver productos</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400&display=swap');
        input, select { outline: none; }
        input:focus, select:focus { border-color: #080808 !important; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.9, marginBottom: '48px' }}>CHECKOUT</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>

          {/* FORMULARIO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Datos personales */}
            <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '24px', padding: '32px' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', marginBottom: '24px' }}>DATOS DE CONTACTO</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { name: 'nombre', label: 'Nombre completo', placeholder: 'Juan Pérez', col: '1 / -1' },
                  { name: 'email', label: 'Correo electrónico', placeholder: 'juan@email.com' },
                  { name: 'telefono', label: 'Teléfono / WhatsApp', placeholder: '+51 999 999 999' },
                ].map(f => (
                  <div key={f.name} style={{ gridColumn: f.col }}>
                    <label style={{ display: 'block', fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6760', marginBottom: '8px' }}>{f.label}</label>
                    <input name={f.name} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                      style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e8e6e1', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', background: '#fafaf8', transition: 'border-color 0.2s' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dirección */}
            <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '24px', padding: '32px' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', marginBottom: '24px' }}>DIRECCIÓN DE ENVÍO</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6760', marginBottom: '8px' }}>Ciudad</label>
                  <select name="ciudad" value={form.ciudad} onChange={handleChange}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e8e6e1', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', background: '#fafaf8' }}>
                    {['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Cusco', 'Iquitos', 'Huancayo', 'Otra'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {[
                  { name: 'direccion', label: 'Dirección completa', placeholder: 'Av. Ejemplo 123, Miraflores' },
                  { name: 'referencia', label: 'Referencia (opcional)', placeholder: 'Frente al parque, piso 3...' },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: 'block', fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6760', marginBottom: '8px' }}>{f.label}</label>
                    <input name={f.name} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                      style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e8e6e1', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', background: '#fafaf8' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Método de pago */}
            <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '24px', padding: '32px' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', marginBottom: '24px' }}>MÉTODO DE PAGO</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 'mp', emoji: '💳', title: 'Mercado Pago', desc: 'Tarjeta crédito/débito, cuotas sin interés' },
                  { id: 'yape', emoji: '📱', title: 'Yape', desc: 'Transfiere al QR y ahorra S/5' },
                ].map(m => (
                  <div key={m.id} onClick={() => setPayMethod(m.id as any)}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '16px', border: `2px solid ${payMethod === m.id ? '#080808' : '#e8e6e1'}`, cursor: 'pointer', background: payMethod === m.id ? '#f2f1ef' : 'transparent', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '28px' }}>{m.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{m.title}</div>
                      <div style={{ fontSize: '12px', color: '#6b6760' }}>{m.desc}</div>
                    </div>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${payMethod === m.id ? '#080808' : '#e8e6e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {payMethod === m.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#080808' }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RESUMEN ORDEN */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: '#fff', border: '1px solid #e8e6e1', borderRadius: '24px', padding: '32px', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', marginBottom: '20px' }}>TU ORDEN</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#6b6760' }}>{item.name} x{item.quantity}</span>
                    <span style={{ fontWeight: 600 }}>S/{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e8e6e1', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b6760' }}>
                  <span>Subtotal</span><span>S/{total()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b6760' }}>
                  <span>Envío</span>
                  <span style={{ color: shipping === 0 ? '#16a34a' : undefined }}>{shipping === 0 ? 'GRATIS' : `S/${shipping}`}</span>
                </div>
                {payMethod === 'yape' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16a34a' }}>
                    <span>Descuento Yape</span><span>-S/5</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #e8e6e1' }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'Bebas Neue', fontSize: '28px' }}>
                    S/{payMethod === 'yape' ? totalFinal - 5 : totalFinal}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={payMethod === 'mp' ? handleMP : handleYape}
              disabled={loading || !form.nombre || !form.email || !form.direccion}
              style={{ width: '100%', background: loading ? '#b0aca4' : '#080808', color: '#fff', border: 'none', borderRadius: '100px', padding: '20px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'DM Sans, sans-serif', transition: 'background 0.3s' }}>
              {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Procesando...</> :
                payMethod === 'mp' ? '💳 Pagar con Mercado Pago' : '📱 Continuar con Yape'}
            </button>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

            <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0aca4', marginTop: '12px', fontFamily: 'DM Mono' }}>
              🔒 Pago 100% seguro y encriptado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}