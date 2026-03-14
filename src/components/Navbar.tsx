'use client'

import Link from 'next/link'
import { ShoppingCart, Menu } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const itemCount = useCartStore(state => state.itemCount)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="font-bold text-xl text-indigo-600">
          VidaSmart
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/productos" className="hover:text-indigo-600 transition-colors">
            Productos
          </Link>
          <Link href="/productos?cat=tech" className="hover:text-indigo-600 transition-colors">
            Tecnología
          </Link>
          <Link href="/productos?cat=mascotas" className="hover:text-indigo-600 transition-colors">
            Mascotas
          </Link>
        </div>

        <Link href="/carrito" className="relative p-2">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {itemCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {itemCount()}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}