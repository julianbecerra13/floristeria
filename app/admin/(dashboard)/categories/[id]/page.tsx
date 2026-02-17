import { getCategories } from "@/lib/data"
import { CategoryForm } from "@/components/admin/category-form"

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const isNew = id === "new"

  let category = undefined
  if (!isNew) {
    const categories = await getCategories()
    const found = categories.find((c) => c.id === parseInt(id))
    if (found) {
      category = {
        id: found.id as number,
        nombre: found.nombre,
        slug: found.slug,
        icono: found.icono,
        grupo: found.grupo ?? null,
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? "Nueva Categoría" : "Editar Categoría"}
      </h1>
      <CategoryForm category={category} />
    </div>
  )
}
