import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"

export function BestSellers() {
  const bestSellers = products.filter((p) => p.badge === "Más Vendido").slice(0, 4)

  // If we don't have enough "Más Vendido" tagged products, fill with first products
  const displayed = bestSellers.length >= 4
    ? bestSellers
    : [...bestSellers, ...products.filter((p) => p.badge !== "Más Vendido")].slice(0, 4)

  return (
    <section id="mas-vendidos" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-pink-100 px-4 py-1.5 text-sm font-medium text-pink-700 mb-3">
              Lo mas popular
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Mas Vendidos</h2>
            <p className="mt-2 text-gray-600">Los favoritos de nuestros clientes</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayed.map((product, index) => (
            <ScrollReveal key={product.id} animation="fade-up" delay={index * 150}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
