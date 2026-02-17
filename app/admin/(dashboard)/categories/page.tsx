"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronRight } from "lucide-react"

interface Category {
  id: number
  nombre: string
  slug: string
  icono: string
  grupo: string | null
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editing, setEditing] = useState<Category | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const load = () => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories)
  }

  useEffect(() => { load() }, [])

  const groups = categories.filter((c) => c.grupo === null)
  const getSubcats = (slug: string) => categories.filter((c) => c.grupo === slug)

  const toggle = (slug: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const openNew = (grupo?: string) => {
    const parentGroup = grupo ? groups.find((g) => g.slug === grupo) : null
    setEditing({
      id: 0,
      nombre: "",
      slug: "",
      icono: parentGroup?.icono ?? "",
      grupo: grupo ?? null,
    })
    setIsNew(true)
  }

  const openEdit = (c: Category) => {
    setEditing({ ...c })
    setIsNew(false)
  }

  const close = () => { setEditing(null); setIsNew(false) }

  const save = async () => {
    if (!editing) return
    setLoading(true)
    await fetch("/api/categories", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    })
    setLoading(false)
    close()
    load()
  }

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar esta categoría?")) return
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    load()
  }

  const autoSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Categorías</h1>
          <p className="text-sm text-gray-500">{groups.length} grupos, {categories.length - groups.length} subcategorías</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openNew()}>
            <Plus className="h-4 w-4 mr-1" /> Grupo
          </Button>
          <Button size="sm" onClick={() => openNew(groups[0]?.slug)}>
            <Plus className="h-4 w-4 mr-1" /> Subcategoría
          </Button>
        </div>
      </div>

      {/* Tree view */}
      <div className="bg-white rounded-lg border overflow-hidden divide-y">
        {groups.map((group) => {
          const subcats = getSubcats(group.slug)
          const isCollapsed = collapsed.has(group.slug)

          return (
            <div key={group.id}>
              {/* Group header */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                <button onClick={() => toggle(group.slug)} className="p-0.5 rounded hover:bg-gray-200">
                  {isCollapsed
                    ? <ChevronRight className="h-4 w-4 text-gray-400" />
                    : <ChevronDown className="h-4 w-4 text-gray-400" />
                  }
                </button>
                <span className="text-lg">{group.icono}</span>
                <span className="font-semibold text-sm text-gray-900 flex-1">{group.nombre}</span>
                <span className="text-xs text-gray-400 mr-2">{subcats.length}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openNew(group.slug)}>
                  <Plus className="h-3.5 w-3.5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(group)}>
                  <Pencil className="h-3.5 w-3.5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600" onClick={() => remove(group.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Subcategories */}
              {!isCollapsed && subcats.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2 px-3 py-2 pl-12 hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-700 flex-1">{cat.nombre}</span>
                  <span className="text-xs text-gray-300 font-mono mr-2">{cat.slug}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEdit(cat)}>
                    <Pencil className="h-3 w-3 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:text-red-600" onClick={() => remove(cat.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {!isCollapsed && subcats.length === 0 && (
                <div className="px-3 py-2 pl-12 text-xs text-gray-300 italic">Sin subcategorías</div>
              )}
            </div>
          )
        })}

        {groups.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400">No hay categorías</div>
        )}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={close}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-bold text-lg">
                {isNew
                  ? (editing.grupo ? "Nueva Subcategoría" : "Nuevo Grupo")
                  : "Editar Categoría"
                }
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={close}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input
                  value={editing.nombre}
                  onChange={(e) => setEditing({
                    ...editing,
                    nombre: e.target.value,
                    slug: isNew ? autoSlug(e.target.value) : editing.slug,
                  })}
                  className="h-9"
                  placeholder="Ej: Día de la Madre"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Slug</Label>
                  <Input
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="h-9 font-mono text-xs"
                    placeholder="dia-de-la-madre"
                  />
                </div>
                <div>
                  <Label className="text-xs">Icono</Label>
                  <Input
                    value={editing.icono}
                    onChange={(e) => setEditing({ ...editing, icono: e.target.value })}
                    className="h-9"
                    placeholder="Emoji"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Grupo padre</Label>
                <select
                  value={editing.grupo ?? ""}
                  onChange={(e) => setEditing({ ...editing, grupo: e.target.value || null })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Sin grupo (es grupo principal)</option>
                  {groups.filter((g) => g.id !== editing.id).map((g) => (
                    <option key={g.slug} value={g.slug}>{g.icono} {g.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={close}>Cancelar</Button>
              <Button size="sm" onClick={save} disabled={loading || !editing.nombre || !editing.slug}>
                {loading ? "Guardando..." : isNew ? "Crear" : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
