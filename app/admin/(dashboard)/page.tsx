import { getProducts, getCategories, getTestimonials } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Tag, MessageSquare } from "lucide-react"

export default async function AdminDashboard() {
  const [products, categories, testimonials] = await Promise.all([
    getProducts(),
    getCategories(),
    getTestimonials(),
  ])

  const stats = [
    { label: "Productos", value: products.length, icon: Package, color: "text-pink-600" },
    { label: "Categorías", value: categories.length, icon: Tag, color: "text-green-600" },
    { label: "Testimonios", value: testimonials.length, icon: MessageSquare, color: "text-blue-600" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
