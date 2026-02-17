"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronRight, Loader2, AlertTriangle, CheckCircle2, Tag } from "lucide-react"

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
  const [saving, setSaving] = useState(false)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [initialLoading, setInitialLoading] = useState(true)

  // Confirm delete
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/categories")
      setCategories(await res.json())
    } catch {
      showToast("Error al cargar categorías", "error")
    } finally {
      setInitialLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

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
    setSaving(true)
    try {
      const res = await fetch("/api/categories", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error()
      showToast(isNew ? "Categoría creada" : "Categoría actualizada")
      close()
      load()
    } catch {
      showToast("Error al guardar categoría", "error")
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/categories/${deleteTarget.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      showToast("Categoría eliminada")
      setDeleteTarget(null)
      load()
    } catch {
      showToast("Error al eliminar", "error")
    } finally {
      setDeleting(false)
    }
  }

  const autoSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

  // Skeleton for loading
  const SkeletonGroup = () => (
    <div className="animate-pulse">
      <div className="flex items-center gap-2 px-3 py-3 bg-gray-50">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-5 w-5 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2.5 pl-12">
          <div className="h-3.5 bg-gray-200 rounded flex-1 max-w-[200px]" />
          <div className="h-3.5 bg-gray-200 rounded w-20" />
        </div>
      ))}
    </div>
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
          <h1 className="text-xl font-bold">Categorías</h1>
          <p className="text-sm text-gray-500">
            {initialLoading ? "Cargando..." : `${groups.length} grupos, ${categories.length - groups.length} subcategorías`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openNew()} disabled={initialLoading}>
            <Plus className="h-4 w-4 mr-1" /> Grupo
          </Button>
          <Button size="sm" onClick={() => openNew(groups[0]?.slug)} disabled={initialLoading || groups.length === 0}>
            <Plus className="h-4 w-4 mr-1" /> Subcategoría
          </Button>
        </div>
      </div>

      {/* Tree view */}
      <div className="bg-white rounded-lg border overflow-hidden divide-y">
        {initialLoading ? (
          <>
            <SkeletonGroup />
            <SkeletonGroup />
            <SkeletonGroup />
          </>
        ) : groups.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <Tag className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 font-medium">No hay categorías aún</p>
            <Button size="sm" variant="outline" className="mt-3" onClick={() => openNew()}>
              <Plus className="h-4 w-4 mr-1" /> Crear primer grupo
            </Button>
          </div>
        ) : (
          groups.map((group) => {
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
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600" onClick={() => setDeleteTarget(group)}>
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
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:text-red-600" onClick={() => setDeleteTarget(cat)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                {!isCollapsed && subcats.length === 0 && (
                  <div className="px-3 py-2 pl-12 text-xs text-gray-300 italic">Sin subcategorías</div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Edit/Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !saving && close()}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-bold text-lg">
                {isNew
                  ? (editing.grupo ? "Nueva Subcategoría" : "Nuevo Grupo")
                  : "Editar Categoría"
                }
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={close} disabled={saving}>
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
              <Button variant="outline" size="sm" onClick={close} disabled={saving}>Cancelar</Button>
              <Button size="sm" onClick={save} disabled={saving || !editing.nombre || !editing.slug}>
                {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {saving ? "Guardando..." : isNew ? "Crear" : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Eliminar {deleteTarget.grupo === null ? "grupo" : "subcategoría"}
              </h3>
              <p className="text-sm text-gray-500">
                ¿Estás seguro de eliminar <strong>{deleteTarget.nombre}</strong>?
                {deleteTarget.grupo === null && (
                  <span className="block mt-1 text-red-500 text-xs font-medium">
                    Las subcategorías de este grupo no se eliminarán automáticamente.
                  </span>
                )}
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
    </div>
  )
}
