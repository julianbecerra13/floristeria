import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

interface Testimonial {
  id: number
  nombre: string
  texto: string
  estrellas: number
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonios" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
            <p className="mt-2 text-gray-600">Miles de personas confian en nosotros</p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.id} animation="fade-up" delay={index * 200}>
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.estrellas
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">{t.nombre}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
