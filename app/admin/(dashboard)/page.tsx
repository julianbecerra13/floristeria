import { Suspense } from "react"
import { getProducts, getCategories, getTestimonials } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Tag, MessageSquare } from "lucide-react"
import Link from "next/link"

async function StatsCards() {
  const [products, categories, testimonials] = await Promise.all([
    getProducts(),
    getCategories(),
    getTestimonials(),
  ])

  const stats = [
    { label: "Productos", value: products.length, icon: Package, color: "text-pink-600", bg: "bg-pink-50", href: "/admin/products" },
    { label: "Categorías", value: categories.length, icon: Tag, color: "text-green-600", bg: "bg-green-50", href: "/admin/categories" },
    { label: "Testimonios", value: testimonials.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/content" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.label}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-1">Ver todos &rarr;</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-9 w-9 bg-gray-200 rounded-lg" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-16 bg-gray-100 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Suspense fallback={<StatsLoading />}>
        <StatsCards />
      </Suspense>
    </div>
  )
}
