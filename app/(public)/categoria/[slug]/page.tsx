export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { getProducts, getCategoryGroupsWithSubs } from "@/lib/data"
import { WHATSAPP_NUMBER } from "@/lib/products"

interface PageProps {
  params: Promise<{ slug: string }>
}

type ResolvedCategory = {
  type: "group" | "sub"
  nombre: string
  icono: string
  slugs: string[]
}

async function resolveCategory(slug: string): Promise<ResolvedCategory | null> {
  const groups = await getCategoryGroupsWithSubs()
  for (const group of groups) {
    if (group.slug === slug) {
      return {
        type: "group",
        nombre: group.nombre,
        icono: group.icono,
        slugs: [group.slug, ...group.subcategorias.map((s) => s.slug)],
      }
    }
    for (const sub of group.subcategorias) {
      if (sub.slug === slug) {
        return {
          type: "sub",
          nombre: sub.nombre,
          icono: group.icono,
          slugs: [sub.slug],
        }
      }
    }
  }
  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cat = await resolveCategory(slug)
  if (!cat) return { title: "Categoría no encontrada" }
  return {
    title: `${cat.nombre} - Floristería Gardenias`,
    description: `Arreglos florales de la categoría ${cat.nombre}`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const cat = await resolveCategory(slug)
  if (!cat) notFound()

  const allProducts = await getProducts()
  const slugSet = new Set(cat.slugs)
  const products = allProducts.filter((p) =>
    p.categorias.some((c) => slugSet.has(c))
  )

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola, me gustaría conocer los arreglos de ${cat.nombre}`
  )}`

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-pink-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/#categorias" className="hover:text-pink-600 transition-colors">
            Categorías
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{cat.nombre}</span>
        </nav>

        {/* Back */}
        <Link
          href="/#categorias"
          className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Ver todas las categorías
        </Link>

        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-50 text-5xl mb-4">
              {cat.icono}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{cat.nombre}</h1>
            <p className="mt-2 text-gray-500">
              {products.length === 0
                ? "Sin productos por ahora"
                : `${products.length} ${products.length === 1 ? "producto disponible" : "productos disponibles"}`}
            </p>
          </div>
        </ScrollReveal>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span className="text-5xl mb-4 block">🌸</span>
            <p className="text-gray-500 font-medium">Aún no hay productos en {cat.nombre}</p>
            <p className="text-sm text-gray-400 mt-1">Escríbenos y te mostramos lo que tenemos disponible</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={(index % 4) * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
