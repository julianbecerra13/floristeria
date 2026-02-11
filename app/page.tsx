import { HeroBanner } from "@/components/hero-banner";
import { CategorySection } from "@/components/category-section";
import { ProductGrid } from "@/components/product-grid";
import { BestSellers } from "@/components/best-sellers";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CategorySection />
      <BestSellers />
      <ProductGrid />
      <Testimonials />
    </main>
  );
}
