"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, X, Search } from "lucide-react"

interface Product {
  id: number
  nombre: string
  precio: number
  precioOriginal?: number | null
  imagen: string
  categoria: string
  badge?: string | null
  descripcion: string
}

interface Category {
  id: number
  nombre: string
  slug: string
  icono: string
  grupo: string | null
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n)

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const load = () => {
    fetch("/api/products").then((r) => r.json()).then(setProducts)
    fetch("/api/categories").then((r) => r.json()).then(setCategories)
  }

  useEffect(() => { load() }, [])

  const groups = categories.filter((c) => c.grupo === null)
  const getSubcats = (slug: string) => categories.filter((c) => c.grupo === slug)
  const getCatName = (slug: string) => categories.find((c) => c.slug === slug)?.nombre ?? slug

  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  )

  const openNew = () => {
    setEditing({ id: 0, nombre: "", precio: 0, imagen: "/placeholder.jpg", categoria: "", descripcion: "" })
    setIsNew(true)
  }

  const openEdit = (p: Product) => {
    setEditing({ ...p })
    setIsNew(false)
  }

  const close = () => { setEditing(null); setIsNew(false) }

  const save = async () => {
    if (!editing) return
    setLoading(true)
    await fetch("/api/products", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    })
    setLoading(false)
    close()
    load()
  }

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Productos</h1>
          <p className="text-sm text-gray-500">{products.length} productos</p>
        </div>
        <Button size="sm" onClick={openNew}>
          <Plus className="h-4 w-4 mr-1" /> Nuevo
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por nombre o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-2.5">Producto</th>
              <th className="px-4 py-2.5 w-28">Precio</th>
              <th className="px-4 py-2.5 w-40 hidden md:table-cell">Categoría</th>
              <th className="px-4 py-2.5 w-24 hidden sm:table-cell">Badge</th>
              <th className="px-4 py-2.5 w-20 text-right">Acc.</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-gray-900 truncate max-w-xs">{p.nombre}</p>
                  <p className="text-xs text-gray-400 truncate max-w-xs md:hidden">{getCatName(p.categoria)}</p>
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-gray-900">{fmt(p.precio)}</span>
                  {p.precioOriginal && (
                    <span className="block text-xs text-gray-400 line-through">{fmt(p.precioOriginal)}</span>
                  )}
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell">
                  <span className="text-gray-600 text-xs">{getCatName(p.categoria)}</span>
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell">
                  {p.badge && <Badge variant="secondary" className="text-xs">{p.badge}</Badge>}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700" onClick={() => remove(p.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No se encontraron productos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={close}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-bold text-lg">{isNew ? "Nuevo Producto" : "Editar Producto"}</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={close}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <Label className="text-xs">Nombre</Label>
                <Input value={editing.nombre} onChange={(e) => setEditing({ ...editing, nombre: e.target.value })} className="h-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Precio</Label>
                  <Input type="number" value={editing.precio || ""} onChange={(e) => setEditing({ ...editing, precio: parseInt(e.target.value) || 0 })} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs">Precio Original</Label>
                  <Input type="number" value={editing.precioOriginal ?? ""} onChange={(e) => setEditing({ ...editing, precioOriginal: e.target.value ? parseInt(e.target.value) : null })} className="h-9" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Categoría</Label>
                  <select
                    value={editing.categoria}
                    onChange={(e) => setEditing({ ...editing, categoria: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Seleccionar...</option>
                    {groups.map((g) => (
                      <optgroup key={g.slug} label={`${g.icono} ${g.nombre}`}>
                        {getSubcats(g.slug).map((s) => (
                          <option key={s.slug} value={s.slug}>{s.nombre}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Badge</Label>
                  <Input value={editing.badge ?? ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })} className="h-9" placeholder="Ej: Más Vendido" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Imagen URL</Label>
                <Input value={editing.imagen} onChange={(e) => setEditing({ ...editing, imagen: e.target.value })} className="h-9" />
              </div>
              <div>
                <Label className="text-xs">Descripción</Label>
                <Textarea value={editing.descripcion} onChange={(e) => setEditing({ ...editing, descripcion: e.target.value })} rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={close}>Cancelar</Button>
              <Button size="sm" onClick={save} disabled={loading || !editing.nombre || !editing.categoria}>
                {loading ? "Guardando..." : isNew ? "Crear" : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
