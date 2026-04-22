import Image from "next/image"
import { CheckCircle2, Truck, Sparkles, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { WHATSAPP_URL } from "@/lib/products"

interface HeroContent {
  badge?: string
  title?: string
  subtitle?: string
  image?: string
}

const DEFAULT_BADGE = "Envíos a toda el área metropolitana de Santander"
const DEFAULT_TITLE = "Envío de flores a domicilio"
const DEFAULT_SUBTITLE =
  "Sorprende a esa persona especial con los arreglos florales más hermosos de Santander. Entrega el mismo día en Bucaramanga, Piedecuesta, Floridablanca y Girón."

function HighlightedTitle({ title }: { title: string }) {
  const keywords = ["flores", "rosas", "amor"]
  for (const word of keywords) {
    const idx = title.toLowerCase().indexOf(word)
    if (idx !== -1) {
      const before = title.slice(0, idx)
      const match = title.slice(idx, idx + word.length)
      const after = title.slice(idx + word.length)
      return (
        <>
          {before}
          <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            {match}
          </span>
          {after}
        </>
      )
    }
  }
  return <>{title}</>
}

function FloatingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute top-12 left-[8%] w-10 h-10 text-pink-300/60 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 6 5 6 8c0 2 1 3 2 4-3 0-6 2-6 5 0 2 2 3 4 3 1 0 2 0 3-1-1 1-1 2-1 3 0 2 2 4 4 4s4-2 4-4c0-1 0-2-1-3 1 1 2 1 3 1 2 0 4-1 4-3 0-3-3-5-6-5 1-1 2-2 2-4 0-3-2-6-6-6z" />
      </svg>
      <svg className="absolute top-40 right-[12%] w-8 h-8 text-rose-300/50 animate-float-medium" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 6 5 6 8c0 2 1 3 2 4-3 0-6 2-6 5 0 2 2 3 4 3 1 0 2 0 3-1-1 1-1 2-1 3 0 2 2 4 4 4s4-2 4-4c0-1 0-2-1-3 1 1 2 1 3 1 2 0 4-1 4-3 0-3-3-5-6-5 1-1 2-2 2-4 0-3-2-6-6-6z" />
      </svg>
      <svg className="absolute bottom-24 left-[18%] w-6 h-6 text-pink-400/40 animate-float-fast" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 6 5 6 8c0 2 1 3 2 4-3 0-6 2-6 5 0 2 2 3 4 3 1 0 2 0 3-1-1 1-1 2-1 3 0 2 2 4 4 4s4-2 4-4c0-1 0-2-1-3 1 1 2 1 3 1 2 0 4-1 4-3 0-3-3-5-6-5 1-1 2-2 2-4 0-3-2-6-6-6z" />
      </svg>
      <svg className="absolute bottom-12 right-[8%] w-12 h-12 text-rose-300/50 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8 2 6 5 6 8c0 2 1 3 2 4-3 0-6 2-6 5 0 2 2 3 4 3 1 0 2 0 3-1-1 1-1 2-1 3 0 2 2 4 4 4s4-2 4-4c0-1 0-2-1-3 1 1 2 1 3 1 2 0 4-1 4-3 0-3-3-5-6-5 1-1 2-2 2-4 0-3-2-6-6-6z" />
      </svg>
    </div>
  )
}

function RoseIllustration() {
  return (
    <div className="relative w-80 h-80 xl:w-96 xl:h-96">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 blur-2xl opacity-70" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-pink-100 to-rose-200 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
        <svg viewBox="0 0 200 200" className="w-4/5 h-4/5">
          <defs>
            <radialGradient id="rosePetal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#be185d" />
            </radialGradient>
          </defs>
          <g transform="translate(100 110)">
            <circle r="60" fill="#fce7f3" />
            <circle r="52" fill="#fbcfe8" />
            <circle r="42" fill="#f9a8d4" />
            <circle r="32" fill="#f472b6" />
            <circle r="22" fill="#ec4899" />
            <circle r="12" fill="#db2777" />
            <circle r="5" fill="#831843" />
          </g>
          <g fill="#84cc16" transform="translate(100 115)">
            <path d="M35 40 Q60 25 70 -5 Q55 10 35 35 Z" opacity="0.85" />
            <path d="M-35 40 Q-60 25 -70 -5 Q-55 10 -35 35 Z" opacity="0.85" />
            <path d="M0 55 Q10 72 5 88 Q-5 72 0 55 Z" opacity="0.7" />
          </g>
        </svg>
      </div>
      <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 animate-float-medium">
        <Sparkles className="h-4 w-4 text-pink-500" />
        <span className="text-xs font-semibold text-gray-700">100% frescas</span>
      </div>
      <div className="absolute -bottom-2 -left-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 animate-float-slow">
        <Truck className="h-4 w-4 text-green-600" />
        <span className="text-xs font-semibold text-gray-700">Mismo día</span>
      </div>
    </div>
  )
}

export function HeroBanner({ content }: { content?: HeroContent | null }) {
  const badge = content?.badge || DEFAULT_BADGE
  const title = content?.title || DEFAULT_TITLE
  const subtitle = content?.subtitle || DEFAULT_SUBTITLE
  const image = content?.image || ""

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Soft color blobs */}
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute top-1/3 right-[-6rem] h-96 w-96 rounded-full bg-rose-300/30 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOWEwYjgiIG9wYWNpdHk9IjAuMTIiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />

      <FloatingPetals />

      {/* Background image overlay */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="max-w-2xl flex-1 text-center lg:text-left">
            <ScrollReveal animation="fade" delay={100}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/60 px-4 py-1.5 text-sm font-medium text-pink-700 shadow-sm mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
                </span>
                {badge}
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                <HighlightedTitle title={title} />
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={550}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-base px-7 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transition-all hover:-translate-y-0.5"
                >
                  <a href="#catalogo" className="flex items-center gap-2">
                    Ver Catálogo
                    <Sparkles className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-pink-300 bg-white/70 backdrop-blur-sm text-pink-700 hover:bg-pink-50 hover:border-pink-400 text-base px-7 transition-all hover:-translate-y-0.5"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>
            </ScrollReveal>

            {/* Trust signals */}
            <ScrollReveal animation="fade-up" delay={700}>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Entrega el mismo día</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Flores 100% frescas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Pago seguro por WhatsApp</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual on desktop */}
          <div className="hidden lg:block">
            <ScrollReveal animation="fade-left" delay={400}>
              {image ? (
                <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={image}
                    alt="Flores Floristería Gardenias"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 animate-float-medium">
                    <Sparkles className="h-4 w-4 text-pink-500" />
                    <span className="text-xs font-semibold text-gray-700">100% frescas</span>
                  </div>
                  <div className="absolute -bottom-2 -left-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 animate-float-slow">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-semibold text-gray-700">Mismo día</span>
                  </div>
                </div>
              ) : (
                <RoseIllustration />
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
