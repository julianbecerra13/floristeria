"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/image-upload"
import { CategoriesMultiselect } from "@/components/admin/categories-multiselect"
import { parseCategorias } from "@/lib/products"

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
  const [imagen, setImagen] = useState(product?.imagen ?? "")
  const [selectedCats, setSelectedCats] = useState<string[]>(parseCategorias(product?.categoria))
  const [catError, setCatError] = useState(false)

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedCats.length === 0) {
      setCatError(true)
      return
    }
    setCatError(false)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const body = {
      id: product?.id,
      nombre: formData.get("nombre"),
      precio: parseInt(formData.get("precio") as string),
      precioOriginal: formData.get("precioOriginal")
        ? parseInt(formData.get("precioOriginal") as string)
        : null,
      imagen,
      categorias: selectedCats,
      badge: formData.get("badge") || null,
      descripcion: formData.get("descripcion"),
    }

    const res = await fetch("/api/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      router.push("/admin/products")
      router.refresh()
    }
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
        <Label>Imagen del producto</Label>
        <ImageUpload value={imagen} onChange={setImagen} />
      </div>

      <div className="space-y-2">
        <Label>
          Categorías <span className="text-red-500">*</span>
        </Label>
        <CategoriesMultiselect
          value={selectedCats}
          onChange={(next) => {
            setSelectedCats(next)
            if (next.length > 0) setCatError(false)
          }}
          categories={categories}
        />
        {catError && (
          <p className="text-xs text-red-600">Selecciona al menos una categoría.</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="badge">Badge (opcional)</Label>
        <Input id="badge" name="badge" defaultValue={product?.badge ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea id="descripcion" name="descripcion" defaultValue={product?.descripcion} required />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading || !imagen}>
          {loading ? "Guardando..." : product ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
