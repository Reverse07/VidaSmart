import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { supabaseAdmin } from '@/lib/supabase'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const { items, email, nombre, telefono, direccion, ciudad, referencia } = await req.json()

    const orden_id = `VS-${Date.now()}`
    const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
    const shipping = subtotal >= 100 ? 0 : 10
    const total = subtotal + shipping

    // 1 — Crear o encontrar cliente
    let customer_id: string | null = null
    const { data: existingCustomer } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('email', email)
      .single()

    if (existingCustomer) {
      customer_id = existingCustomer.id
    } else {
      const { data: newCustomer } = await supabaseAdmin
        .from('customers')
        .insert({ email, full_name: nombre, phone: telefono, address_line: direccion, city: ciudad })
        .select('id')
        .single()
      customer_id = newCustomer?.id ?? null
    }

    // 2 — Crear orden en Supabase
    const { data: order } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orden_id,
        customer_id,
        status: 'pending',
        subtotal: subtotal * 100,
        shipping_cost: shipping * 100,
        total: total * 100,
        payment_method: 'mercadopago',
        shipping_address: { direccion, ciudad, referencia, telefono },
      })
      .select('id')
      .single()

    // 3 — Crear items de la orden
    if (order) {
      await supabaseAdmin.from('order_items').insert(
        items.map((item: any) => ({
          order_id: order.id,
          product_id: null,
          quantity: item.quantity,
          unit_price: item.price * 100,
          total_price: item.price * item.quantity * 100,
        }))
      )
    }

    // 4 — Crear preferencia MP
    const preference = new Preference(client)
    const response = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.slug ?? item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'PEN',
        })),
        payer: { email },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?orden=${orden_id}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending`,
        },
        auto_return: 'approved',
        external_reference: orden_id,
        statement_descriptor: 'VIDASMART',
      }
    })

    return NextResponse.json({ init_point: response.init_point, orden_id })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error procesando orden' }, { status: 500 })
  }
}