import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <div className="font-bold text-indigo-600 text-lg mb-3">VidaSmart</div>
          <p className="text-gray-500 text-xs leading-relaxed">
            Soluciones inteligentes para tu día a día y el de tu mascota. Envíos a todo el Perú.
          </p>
        </div>

        <div>
          <div className="font-semibold text-gray-800 mb-3">Tienda</div>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/productos" className="hover:text-indigo-600">Todos los productos</Link></li>
            <li><Link href="/productos?cat=tech" className="hover:text-indigo-600">Tecnología</Link></li>
            <li><Link href="/productos?cat=mascotas" className="hover:text-indigo-600">Mascotas</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-gray-800 mb-3">Ayuda</div>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/envios" className="hover:text-indigo-600">Envíos y tiempos</Link></li>
            <li><Link href="/devoluciones" className="hover:text-indigo-600">Devoluciones</Link></li>
            <li><Link href="/contacto" className="hover:text-indigo-600">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-gray-800 mb-3">Contacto</div>
          <ul className="space-y-2 text-gray-500 text-xs">
            <li>📱 WhatsApp: +51 XXX XXX XXX</li>
            <li>📧 hola@vidasmart.pe</li>
            <li>📍 Lima, Perú</li>
          </ul>
        </div>

      </div>
      <div className="border-t border-gray-100 text-center text-xs text-gray-400 py-4">
        © 2026 VidaSmart — Todos los derechos reservados
      </div>
    </footer>
  )
}