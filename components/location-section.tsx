import { MapPin, Clock, Phone, Navigation } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function LocationSection() {
  const mapQuery = encodeURIComponent("San Telmo 1, Piedecuesta, Santander, Colombia")
  const mapSrc = `https://www.google.com/maps?q=6.9971013,-73.0575324&z=16&output=embed`

  return (
    <section id="ubicacion" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1.5 text-sm font-medium text-pink-700 mb-3">
              Encuéntranos
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Ubicación</h2>
            <p className="mt-2 text-gray-600">Visítanos y elige las flores más frescas en persona</p>
          </div>
        </ScrollReveal>

        {/* Info cards row */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100">
                <MapPin className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Dirección</h3>
                <p className="text-sm text-gray-600 leading-snug mt-0.5">
                  San Telmo 1 - Mz B - Casa 4<br />
                  Piedecuesta, Santander
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Horario</h3>
                <p className="text-sm text-gray-600 leading-snug mt-0.5">
                  Lun - Sáb: 7:00 AM - 7:00 PM<br />
                  Domingos: Cerrado
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Contacto</h3>
                <p className="text-sm text-gray-600 mt-0.5">+57 315 763 0286</p>
                <a
                  href="https://wa.me/573157630286"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-green-600 hover:text-green-700"
                >
                  Escríbenos por WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src={mapSrc}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Floristería Gardenias - Piedecuesta, Santander"
              className="w-full"
            />
            {/* Overlay link to open in Google Maps */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=6.9971013,-73.0575324`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-lg border hover:bg-gray-50 transition-colors"
            >
              <Navigation className="h-4 w-4 text-pink-600" />
              Cómo llegar
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
