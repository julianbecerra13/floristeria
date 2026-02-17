"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProductFormProps {
  product?: {
    id: number
    nombre: string
    precio: number
    precioOriginal?: number | null
    imagen: string
    categoria: string
    badge?: string | null
    descripcion: string
  }
}

interface Category {
  id: number
  nombre: string
  slug: string
  icono: string
  grupo: string | null
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
  }, [])

  const groups = categories.filter((c) => c.grupo === null)
  const getSubcats = (groupSlug: string) => categories.filter((c) => c.grupo === groupSlug)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const body = {
      id: product?.id,
      nombre: formData.get("nombre"),
      precio: parseInt(formData.get("precio") as string),
      precioOriginal: formData.get("precioOriginal")
        ? parseInt(formData.get("precioOriginal") as string)
        : null,
      imagen: formData.get("imagen"),
      categoria: formData.get("categoria"),
      badge: formData.get("badge") || null,
      descripcion: formData.get("descripcion"),
    }

    await fetch("/api/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    router.push("/admin/products")
    router.refresh()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" defaultValue={product?.nombre} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="precio">Precio</Label>
          <Input id="precio" name="precio" type="number" defaultValue={product?.precio} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="precioOriginal">Precio Original (opcional)</Label>
          <Input id="precioOriginal" name="precioOriginal" type="number" defaultValue={product?.precioOriginal ?? ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagen">URL Imagen</Label>
        <Input id="imagen" name="imagen" defaultValue={product?.imagen} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría</Label>
          <select
            id="categoria"
            name="categoria"
            defaultValue={product?.categoria ?? ""}
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Seleccionar categoría...</option>
            {groups.map((group) => (
              <optgroup key={group.slug} label={`${group.icono} ${group.nombre}`}>
                {getSubcats(group.slug).map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.nombre}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="badge">Badge (opcional)</Label>
          <Input id="badge" name="badge" defaultValue={product?.badge ?? ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea id="descripcion" name="descripcion" defaultValue={product?.descripcion} required />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : product ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
