"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function DeleteCategoryButton({ id }: { id: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("¿Eliminar esta categoría?")) return
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="h-3 w-3" />
    </Button>
  )
}
