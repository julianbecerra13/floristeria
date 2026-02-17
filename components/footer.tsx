import { Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold text-pink-400">Floristeria</span>
              <span className="text-2xl font-bold text-green-400"> Gardenias</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              La mejor floristería online de Colombia. Envío de flores a domicilio
              con la calidad y frescura que mereces.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-pink-400" />
                +57 315 763 0286
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-pink-400" />
                floristeria.gardenias10@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-pink-400" />
                Lun - Sáb: 7:00 AM - 7:00 PM
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Políticas de Envío</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Bogotá, Colombia
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Floristeria Gardenias. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
