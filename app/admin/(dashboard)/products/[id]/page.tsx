import { getProducts } from "@/lib/data"
import { ProductForm } from "@/components/admin/product-form"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const isNew = id === "new"

  let product = undefined
  if (!isNew) {
    const products = await getProducts()
    product = products.find((p) => p.id === parseInt(id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? "Nuevo Producto" : "Editar Producto"}
      </h1>
      <ProductForm product={product} />
    </div>
  )
}
