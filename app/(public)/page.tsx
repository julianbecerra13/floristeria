export const dynamic = "force-dynamic"

import { HeroBanner } from "@/components/hero-banner"
import { CategorySection } from "@/components/category-section"
import { ProductGrid } from "@/components/product-grid"
import { BestSellers } from "@/components/best-sellers"
import { Testimonials } from "@/components/testimonials"
import { LocationSection } from "@/components/location-section"
import { getProducts, getTestimonials, getPageContent, getCategoryGroupsWithSubs } from "@/lib/data"

export default async function Home() {
  const [products, testimonials, heroContent, categoryGroups] = await Promise.all([
    getProducts(),
    getTestimonials(),
    getPageContent("hero"),
    getCategoryGroupsWithSubs(),
  ])

  return (
    <main>
      <HeroBanner content={heroContent as Record<string, string> | null} />
      <CategorySection categoryGroups={categoryGroups} />
      <BestSellers products={products} />
      <ProductGrid products={products} />
      <LocationSection />
      <Testimonials testimonials={testimonials} />
    </main>
  )
}
