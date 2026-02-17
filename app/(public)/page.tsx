import { HeroBanner } from "@/components/hero-banner"
import { CategorySection } from "@/components/category-section"
import { ProductGrid } from "@/components/product-grid"
import { BestSellers } from "@/components/best-sellers"
import { Testimonials } from "@/components/testimonials"
import { getProducts, getTestimonials, getPageContent } from "@/lib/data"
import { categoryGroups } from "@/lib/products"

export default async function Home() {
  const [products, testimonials, heroContent] = await Promise.all([
    getProducts(),
    getTestimonials(),
    getPageContent("hero"),
  ])

  return (
    <main>
      <HeroBanner content={heroContent as Record<string, string> | null} />
      <CategorySection categoryGroups={categoryGroups} />
      <BestSellers products={products} />
      <ProductGrid products={products} />
      <Testimonials testimonials={testimonials} />
    </main>
  )
}
