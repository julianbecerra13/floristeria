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
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={(index % 4) * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <span className="text-5xl mb-4 block">🌸</span>
            <p className="text-gray-500 font-medium">Estamos actualizando nuestro catálogo</p>
            <p className="text-sm text-gray-400 mt-1">Muy pronto podrás ver todas nuestras flores y arreglos</p>
            <a
              href="https://wa.me/573157630286?text=Hola, me gustaría conocer los productos disponibles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
