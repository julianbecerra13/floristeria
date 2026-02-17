import { ChevronRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { type CategoryGroup } from "@/lib/products"

function FechasCard({ group }: { group: CategoryGroup }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden transition-all duration-400">
      <div className="h-1.5 bg-gradient-to-r from-pink-500 to-rose-600" />
      <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl group-hover:scale-110 transition-transform duration-300">
            {group.icono}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{group.nombre}</h3>
            <span className="text-xs text-gray-400">{group.subcategorias.length} opciones</span>
          </div>
        </div>
        <div className="h-px mb-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <ul className="space-y-0.5">
          {group.subcategorias.map((sub) => (
            <li key={sub.slug}>
              <a href="#catalogo" className="flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200">
                <span>{sub.nombre}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-0 translate-x-0 transition-all duration-200" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#catalogo" className="mt-3 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-semibold text-pink-600 bg-pink-50 hover:gap-2 transition-all duration-300">
          Ver todo <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function ArreglosFloralesCard({ group }: { group: CategoryGroup }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden transition-all duration-400">
      <div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-600" />
      <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl group-hover:scale-110 transition-transform duration-300">
            {group.icono}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{group.nombre}</h3>
            <span className="text-xs text-gray-400">{group.subcategorias.length} opciones</span>
          </div>
        </div>
        <div className="h-px mb-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <ul className="space-y-0.5">
          {group.subcategorias.map((sub) => (
            <li key={sub.slug}>
              <a href="#catalogo" className="flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200">
                <span>{sub.nombre}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-0 translate-x-0 transition-all duration-200" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#catalogo" className="mt-3 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-semibold text-violet-600 bg-violet-50 hover:gap-2 transition-all duration-300">
          Ver todo <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function FunebresCard({ group }: { group: CategoryGroup }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden transition-all duration-400">
      <div className="h-1.5 bg-gradient-to-r from-slate-500 to-slate-700" />
      <div className="absolute inset-0 bg-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl group-hover:scale-110 transition-transform duration-300">
            {group.icono}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{group.nombre}</h3>
            <span className="text-xs text-gray-400">{group.subcategorias.length} opciones</span>
          </div>
        </div>
        <div className="h-px mb-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <ul className="space-y-0.5">
          {group.subcategorias.map((sub) => (
            <li key={sub.slug}>
              <a href="#catalogo" className="flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-gray-600 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200">
                <span>{sub.nombre}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-0 translate-x-0 transition-all duration-200" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#catalogo" className="mt-3 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-50 hover:gap-2 transition-all duration-300">
          Ver todo <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function AdicionalesCard({ group }: { group: CategoryGroup }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden transition-all duration-400">
      <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-600" />
      <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl group-hover:scale-110 transition-transform duration-300">
            {group.icono}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{group.nombre}</h3>
            <span className="text-xs text-gray-400">{group.subcategorias.length} opciones</span>
          </div>
        </div>
        <div className="h-px mb-3 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <ul className="space-y-0.5">
          {group.subcategorias.map((sub) => (
            <li key={sub.slug}>
              <a href="#catalogo" className="flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200">
                <span>{sub.nombre}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-0 translate-x-0 transition-all duration-200" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#catalogo" className="mt-3 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-semibold text-amber-600 bg-amber-50 hover:gap-2 transition-all duration-300">
          Ver todo <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

const cardMap: Record<string, React.ComponentType<{ group: CategoryGroup }>> = {
  "fechas-especiales": FechasCard,
  "arreglos-florales": ArreglosFloralesCard,
  "arreglos-funebres": FunebresCard,
  "adicionales": AdicionalesCard,
}

export function CategorySection({ categoryGroups }: { categoryGroups: CategoryGroup[] }) {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoryGroups.map((group, index) => {
            const CardComponent = cardMap[group.slug] || AdicionalesCard
            return (
              <ScrollReveal key={group.slug} animation="fade-up" delay={index * 120}>
                <CardComponent group={group} />
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
