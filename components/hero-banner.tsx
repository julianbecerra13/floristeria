import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWEwYjgiIG9wYWNpdHk9IjAuMDgiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <ScrollReveal animation="fade" delay={200}>
            <span className="inline-block rounded-full bg-pink-200/60 px-4 py-1.5 text-sm font-medium text-pink-700 mb-4">
              Envio gratis en Bogota
            </span>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={400}>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Envio de{" "}
              <span className="text-pink-600">flores</span>
              {" "}a domicilio
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={600}>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl max-w-lg">
              Sorprende a esa persona especial con los arreglos florales mas
              hermosos de Colombia. Entrega el mismo dia.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={800}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-white text-base px-8">
                <a href="#catalogo">Ver Catalogo</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-pink-300 text-pink-700 hover:bg-pink-50 text-base px-8">
                <a href="#" className="flex items-center gap-2">
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      {/* Decorative flowers */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-rose-200/40 blur-3xl" />
    </section>
  )
}
