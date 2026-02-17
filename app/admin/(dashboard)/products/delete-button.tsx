"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function DeleteProductButton({ id }: { id: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("¿Eliminar este producto?")) return
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="h-3 w-3" />
    </Button>
  )
}
