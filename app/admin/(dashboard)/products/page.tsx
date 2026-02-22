"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, X, Search, Loader2, AlertTriangle, CheckCircle2, Package } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"

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
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState("")
  const [initialLoading, setInitialLoading] = useState(true)

  // Selection
  const [selected, setSelected] = useState<Set<number>>(new Set())

  // Confirm delete modal
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleteBulk, setDeleteBulk] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = useCallback(async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ])
      setProducts(await pRes.json())
      setCategories(await cRes.json())
    } catch {
      showToast("Error al cargar datos", "error")
    } finally {
      setInitialLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const groups = categories.filter((c) => c.grupo === null)
  const getSubcats = (slug: string) => categories.filter((c) => c.grupo === slug)
  const getCatName = (slug: string) => categories.find((c) => c.slug === slug)?.nombre ?? slug

  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  )

  // Selection helpers
  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((p) => p.id)))
    }
  }

  const allSelected = filtered.length > 0 && selected.size === filtered.length
  const someSelected = selected.size > 0

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
    setSaving(true)
    try {
      const res = await fetch("/api/products", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error()
      showToast(isNew ? "Producto creado" : "Producto actualizado")
      close()
      load()
    } catch {
      showToast("Error al guardar producto", "error")
    } finally {
      setSaving(false)
    }
  }

  // Delete single
  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      showToast("Producto eliminado")
      setDeleteTarget(null)
      setSelected((prev) => { const next = new Set(prev); next.delete(deleteTarget.id); return next })
      load()
    } catch {
      showToast("Error al eliminar", "error")
    } finally {
      setDeleting(false)
    }
  }

  // Delete bulk
  const confirmBulkDelete = async () => {
    setDeleting(true)
    try {
      const ids = Array.from(selected)
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      })
      if (!res.ok) throw new Error()
      showToast(`${ids.length} producto${ids.length > 1 ? "s" : ""} eliminado${ids.length > 1 ? "s" : ""}`)
      setSelected(new Set())
      setDeleteBulk(false)
      load()
    } catch {
      showToast("Error al eliminar productos", "error")
    } finally {
      setDeleting(false)
    }
  }

  // Skeleton rows for loading
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3 w-10"><div className="h-4 w-4 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-3/4" /></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16" /></td>
      <td className="px-4 py-3 hidden md:table-cell"><div className="h-4 bg-gray-200 rounded w-24" /></td>
      <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 bg-gray-200 rounded w-16" /></td>
      <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12 ml-auto" /></td>
    </tr>
  )

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all animate-in slide-in-from-top-2 ${
          toast.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Productos</h1>
          <p className="text-sm text-gray-500">
            {initialLoading ? "Cargando..." : `${products.length} productos`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {someSelected && (
            <>
              {selected.size === 1 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const p = products.find((p) => p.id === Array.from(selected)[0])
                    if (p) openEdit(p)
                  }}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setDeleteBulk(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Eliminar ({selected.size})
              </Button>
            </>
          )}
          <Button size="sm" onClick={openNew} disabled={initialLoading}>
            <Plus className="h-4 w-4 mr-1" /> Nuevo
          </Button>
        </div>
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

      {/* Selection bar */}
      {someSelected && (
        <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-pink-50 border border-pink-200 rounded-lg text-sm">
          <span className="font-medium text-pink-800">
            {selected.size} producto{selected.size > 1 ? "s" : ""} seleccionado{selected.size > 1 ? "s" : ""}
          </span>
          <button onClick={() => setSelected(new Set())} className="text-pink-600 hover:text-pink-800 underline text-xs">
            Deseleccionar todo
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-2.5 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  disabled={initialLoading || filtered.length === 0}
                  className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                />
              </th>
              <th className="px-4 py-2.5">Producto</th>
              <th className="px-4 py-2.5 w-28">Precio</th>
              <th className="px-4 py-2.5 w-40 hidden md:table-cell">Categoría</th>
              <th className="px-4 py-2.5 w-24 hidden sm:table-cell">Badge</th>
              <th className="px-4 py-2.5 w-20 text-right">Acc.</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {initialLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 font-medium">
                    {search ? "No se encontraron productos" : "No hay productos aún"}
                  </p>
                  {!search && (
                    <Button size="sm" variant="outline" className="mt-3" onClick={openNew}>
                      <Plus className="h-4 w-4 mr-1" /> Crear primer producto
                    </Button>
                  )}
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className={`transition-colors ${selected.has(p.id) ? "bg-pink-50/60" : "hover:bg-gray-50"}`}
                >
                  <td className="px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                    />
                  </td>
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
                    {!someSelected && (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700" onClick={() => setDeleteTarget(p)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={close}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
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
                <Label className="text-xs">Imagen del producto</Label>
                <ImageUpload
                  value={editing.imagen}
                  onChange={(url) => setEditing({ ...editing, imagen: url })}
                />
              </div>
              <div>
                <Label className="text-xs">Descripción</Label>
                <Textarea value={editing.descripcion} onChange={(e) => setEditing({ ...editing, descripcion: e.target.value })} rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t bg-gray-50 rounded-b-xl">
              <Button variant="outline" size="sm" onClick={close} disabled={saving}>Cancelar</Button>
              <Button size="sm" onClick={save} disabled={saving || !editing.nombre || !editing.categoria}>
                {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {saving ? "Guardando..." : isNew ? "Crear" : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Eliminar producto</h3>
              <p className="text-sm text-gray-500">
                ¿Estás seguro de eliminar <strong>{deleteTarget.nombre}</strong>? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-6">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancelar
              </Button>
              <Button variant="destructive" className="flex-1" onClick={confirmDelete} disabled={deleting}>
                {deleting && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {deleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Bulk Confirmation Modal */}
      {deleteBulk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !deleting && setDeleteBulk(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Eliminar productos</h3>
              <p className="text-sm text-gray-500">
                ¿Estás seguro de eliminar <strong>{selected.size} producto{selected.size > 1 ? "s" : ""}</strong>? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-2 px-6 pb-6">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteBulk(false)} disabled={deleting}>
                Cancelar
              </Button>
              <Button variant="destructive" className="flex-1" onClick={confirmBulkDelete} disabled={deleting}>
                {deleting && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {deleting ? "Eliminando..." : `Eliminar (${selected.size})`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
