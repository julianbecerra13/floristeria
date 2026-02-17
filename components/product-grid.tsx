import { type Product } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section id="catalogo" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Nuestro Catalogo</h2>
            <p className="mt-2 text-gray-600">Las flores mas frescas y hermosas, directo a tu puerta</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} animation="fade-up" delay={(index % 4) * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
