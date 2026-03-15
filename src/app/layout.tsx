import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'VidaSmart — Tecnología y productos para mascotas en Perú',
    template: '%s | VidaSmart'
  },
  description: 'Tienda online de gadgets inteligentes y accesorios para mascotas. Envíos a todo Perú. Paga con Yape, Mercado Pago o tarjeta.',
  keywords: ['gadgets peru', 'tecnologia inteligente', 'accesorios mascotas peru', 'smart home peru', 'tienda online peru'],
  openGraph: {
    title: 'VidaSmart — Tecnología y productos para mascotas en Perú',
    description: 'Gadgets inteligentes y accesorios para mascotas. Envíos a todo Perú.',
    url: 'https://vida-smart.vercel.app',
    siteName: 'VidaSmart',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VidaSmart — Tecnología y mascotas en Perú',
    description: 'Gadgets inteligentes y accesorios para mascotas. Envíos a todo Perú.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://vida-smart.vercel.app',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}