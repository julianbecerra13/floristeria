import { categories } from "@/lib/products"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

export function CategorySection() {
  return (
    <section id="categorias" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Nuestras Categorias</h2>
            <p className="mt-2 text-gray-600">Encuentra el arreglo perfecto para cada ocasion</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.slug} animation="zoom-in" delay={index * 100}>
              <a href="#catalogo">
                <Card className="flex flex-col items-center justify-center py-6 px-2 hover:shadow-md hover:border-pink-300 transition-all cursor-pointer group">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.icono}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                    {cat.nombre}
                  </span>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
