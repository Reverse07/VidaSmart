import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const { items, email, orden_id } = await req.json()

    const preference = new Preference(client)

    const response = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.slug,
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

    return NextResponse.json({ init_point: response.init_point })
  } catch (error) {
    console.error('MP Error:', error)
    return NextResponse.json({ error: 'Error creando preferencia' }, { status: 500 })
  }
}