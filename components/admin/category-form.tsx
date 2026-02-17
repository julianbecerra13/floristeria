"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CategoryFormProps {
  category?: {
    id: number
    nombre: string
    slug: string
    icono: string
    grupo?: string | null
  }
}

interface ParentGroup {
  slug: string
  nombre: string
  icono: string
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState<ParentGroup[]>([])

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: { slug: string; nombre: string; icono: string; grupo: string | null }[]) => {
        setGroups(data.filter((c) => c.grupo === null))
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const body = {
      id: category?.id,
      nombre: formData.get("nombre"),
      slug: formData.get("slug"),
      icono: formData.get("icono"),
      grupo: formData.get("grupo") || null,
    }

    await fetch("/api/categories", {
      method: category ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    router.push("/admin/categories")
    router.refresh()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" defaultValue={category?.nombre} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" defaultValue={category?.slug} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icono">Icono (emoji)</Label>
          <Input id="icono" name="icono" defaultValue={category?.icono} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grupo">Grupo padre (opcional)</Label>
          <select
            id="grupo"
            name="grupo"
            defaultValue={category?.grupo ?? ""}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Sin grupo (es grupo principal)</option>
            {groups.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.icono} {g.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : category ? "Actualizar" : "Crear"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
