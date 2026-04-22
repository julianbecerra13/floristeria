import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { type CategoryGroup } from "@/lib/products"

type Palette = {
  bar: string
  overlay: string
  iconBg: string
  linkHover: string
  linkHoverText: string
  footerText: string
  footerBg: string
}

const palettes: Palette[] = [
  {
    bar: "from-pink-500 to-rose-600",
    overlay: "bg-pink-500/10",
    iconBg: "bg-pink-50",
    linkHover: "hover:bg-pink-50",
    linkHoverText: "hover:text-pink-600",
    footerText: "text-pink-600",
    footerBg: "bg-pink-50",
  },
  {
    bar: "from-violet-500 to-purple-600",
    overlay: "bg-violet-500/10",
    iconBg: "bg-violet-50",
    linkHover: "hover:bg-violet-50",
    linkHoverText: "hover:text-violet-600",
    footerText: "text-violet-600",
    footerBg: "bg-violet-50",
  },
  {
    bar: "from-slate-500 to-slate-700",
    overlay: "bg-slate-500/10",
    iconBg: "bg-slate-50",
    linkHover: "hover:bg-slate-100",
    linkHoverText: "hover:text-slate-700",
    footerText: "text-slate-600",
    footerBg: "bg-slate-50",
  },
  {
    bar: "from-amber-500 to-orange-600",
    overlay: "bg-amber-500/10",
    iconBg: "bg-amber-50",
    linkHover: "hover:bg-amber-50",
    linkHoverText: "hover:text-amber-600",
    footerText: "text-amber-600",
    footerBg: "bg-amber-50",
  },
  {
    bar: "from-emerald-500 to-green-600",
    overlay: "bg-emerald-500/10",
    iconBg: "bg-emerald-50",
    linkHover: "hover:bg-emerald-50",
    linkHoverText: "hover:text-emerald-600",
    footerText: "text-emerald-600",
    footerBg: "bg-emerald-50",
  },
  {
    bar: "from-sky-500 to-blue-600",
    overlay: "bg-sky-500/10",
    iconBg: "bg-sky-50",
    linkHover: "hover:bg-sky-50",
    linkHoverText: "hover:text-sky-600",
    footerText: "text-sky-600",
    footerBg: "bg-sky-50",
  },
]

function CategoryCard({ group, palette }: { group: CategoryGroup; palette: Palette }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 overflow-hidden transition-all duration-400">
      <div className={`h-1.5 bg-gradient-to-r ${palette.bar}`} />
      <div className={`absolute inset-0 ${palette.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      <div className="relative p-5">
        <Link href={`/categoria/${group.slug}`} className="flex items-center gap-3 mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${palette.iconBg} text-2xl group-hover:scale-110 transition-transform duration-300`}>
            {group.icono}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{group.nombre}</h3>
            <span className="text-xs text-gray-400">
              {group.subcategorias.length === 0
                ? "Ver todo"
                : `${group.subcategorias.length} ${group.subcategorias.length === 1 ? "opción" : "opciones"}`}
            </span>
          </div>
        </Link>
        {group.subcategorias.length > 0 && (
          <>
            <div className="h-px mb-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <ul className="space-y-0.5">
              {group.subcategorias.slice(0, 7).map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`/categoria/${sub.slug}`}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-gray-600 ${palette.linkHover} ${palette.linkHoverText} transition-all duration-200`}
                  >
                    <span>{sub.nombre}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <Link
          href={`/categoria/${group.slug}`}
          className={`mt-3 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-semibold ${palette.footerText} ${palette.footerBg} hover:gap-2 transition-all duration-300`}
        >
          Ver todo <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export function CategorySection({ categoryGroups }: { categoryGroups: CategoryGroup[] }) {
  if (categoryGroups.length === 0) {
    return (
      <section id="categorias" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1.5 text-sm font-medium text-pink-700 mb-3">
              Explora nuestro catálogo
            </span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Nuestras <span className="text-pink-600">Categorías</span>
            </h2>
            <div className="mt-10 rounded-2xl border border-dashed border-pink-200 bg-pink-50/40 px-6 py-12">
              <span className="text-5xl mb-4 block">🌸</span>
              <p className="text-gray-500 font-medium">Estamos preparando las categorías</p>
              <p className="text-sm text-gray-400 mt-1">Muy pronto podrás explorar nuestros arreglos por ocasión</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  const gridCols =
    categoryGroups.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : categoryGroups.length === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : categoryGroups.length === 2
          ? "sm:grid-cols-2"
          : "max-w-md mx-auto"

  return (
    <section id="categorias" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1.5 text-sm font-medium text-pink-700 mb-3">
              Explora nuestro catálogo
            </span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Nuestras <span className="text-pink-600">Categorías</span>
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Encuentra el arreglo perfecto para cada ocasión especial
            </p>
          </div>
        </ScrollReveal>

        <div className={`grid ${gridCols} gap-5`}>
          {categoryGroups.map((group, index) => (
            <ScrollReveal key={group.slug} animation="fade-up" delay={index * 120}>
              <CategoryCard group={group} palette={palettes[index % palettes.length]} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
