export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { getProductById, getProducts } from "@/lib/data"
import {
  formatPrice,
  getCategoryEmoji,
  categoryGroups,
  WHATSAPP_NUMBER,
} from "@/lib/products"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface PageProps {
  params: Promise<{ id: string }>
}

function getCategoryName(slug: string): string {
  for (const group of categoryGroups) {
    if (group.slug === slug) return group.nombre
    for (const sub of group.subcategorias) {
      if (sub.slug === slug) return sub.nombre
    }
  }
  return slug
}

function getCategoryGroup(slug: string): string | null {
  for (const group of categoryGroups) {
    if (group.slug === slug) return group.slug
    for (const sub of group.subcategorias) {
      if (sub.slug === slug) return group.slug
    }
  }
  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(Number(id))

  if (!product) {
    return { title: "Producto no encontrado" }
  }

  return {
    title: `${product.nombre} - Floristeria Gardenias`,
    description: product.descripcion,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProductById(Number(id))

  if (!product) {
    notFound()
  }

  const allProducts = await getProducts()
  const emoji = getCategoryEmoji(product.categoria)
  const categoryName = getCategoryName(product.categoria)
  const productGroup = getCategoryGroup(product.categoria)

  // Recommendations: same category first, then same group, exclude current
  const sameCategory = allProducts.filter(
    (p) => p.id !== product.id && p.categoria === product.categoria
  )
  const sameGroup = allProducts.filter(
    (p) =>
      p.id !== product.id &&
      p.categoria !== product.categoria &&
      getCategoryGroup(p.categoria) === productGroup
  )
  const others = allProducts.filter(
    (p) =>
      p.id !== product.id &&
      getCategoryGroup(p.categoria) !== productGroup
  )
  const recommendations = [...sameCategory, ...sameGroup, ...others].slice(0, 4)

  const whatsappText = encodeURIComponent(
    `Hola, me interesa: ${product.nombre} - ${formatPrice(product.precio)}`
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`

  const hasRealImage =
    product.imagen &&
    !product.imagen.includes("placeholder") &&
    product.imagen.startsWith("http")

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-pink-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/#catalogo" className="hover:text-pink-600 transition-colors">
            Catálogo
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.nombre}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/#catalogo"
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        {/* Product Detail */}
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-50">
            {hasRealImage ? (
              <img
                src={product.imagen}
                alt={product.nombre}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-60">
                {emoji}
              </div>
            )}
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-pink-600 hover:bg-pink-600 text-white">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              {emoji} {categoryName}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-pink-600">
                {formatPrice(product.precio)}
              </span>
              {product.precioOriginal && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.precioOriginal)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.descripcion}
            </p>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-700"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Comprar por WhatsApp
            </a>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-16">
            <ScrollReveal animation="fade-up">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                También te puede interesar
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((rec, index) => (
                <ScrollReveal key={rec.id} animation="fade-up" delay={index * 150}>
                  <ProductCard product={rec} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
