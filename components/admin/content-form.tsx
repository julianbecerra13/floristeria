"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Loader2, AlertTriangle, CheckCircle2, Star, MessageSquare } from "lucide-react"

interface Testimonial {
  id?: number
  nombre: string
  texto: string
  estrellas: number
}

export function ContentForm() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [heroBadge, setHeroBadge] = useState("")
  const [heroImage, setHeroImage] = useState("")
  const [savingHero, setSavingHero] = useState(false)
  const [savingId, setSavingId] = useState<number | string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadData = useCallback(async () => {
    try {
      const [tRes, hRes] = await Promise.all([
        fetch("/api/testimonials"),
        fetch("/api/page-content?key=hero"),
      ])
      setTestimonials(await tRes.json())
      const heroData = await hRes.json()
      if (heroData?.value) {
        const v = heroData.value as Record<string, string>
        setHeroTitle(v.title || "")
        setHeroSubtitle(v.subtitle || "")
        setHeroBadge(v.badge || "")
        setHeroImage(v.image || "")
      }
    } catch {
      showToast("Error al cargar datos", "error")
    } finally {
      setInitialLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const saveHero = async () => {
    setSavingHero(true)
    try {
      const res = await fetch("/api/page-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "hero",
          value: { title: heroTitle, subtitle: heroSubtitle, badge: heroBadge, image: heroImage },
        }),
      })
      if (!res.ok) throw new Error()
      showToast("Hero guardado correctamente")
    } catch {
      showToast("Error al guardar hero", "error")
    } finally {
      setSavingHero(false)
    }
  }

  const saveTestimonial = async (t: Testimonial, index: number) => {
    const key = t.id ?? `new-${index}`
    setSavingId(key)
    try {
      const method = t.id ? "PUT" : "POST"
      const res = await fetch("/api/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      })
      if (!res.ok) throw new Error()
      const saved = await res.json()
      setTestimonials((prev) =>
        prev.map((p, j) => (j === index ? saved : p))
      )
      showToast(t.id ? "Testimonio actualizado" : "Testimonio creado")
    } catch {
      showToast("Error al guardar testimonio", "error")
    } finally {
      setSavingId(null)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget?.id) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/testimonials/${deleteTarget.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id))
      showToast("Testimonio eliminado")
      setDeleteTarget(null)
    } catch {
      showToast("Error al eliminar", "error")
    } finally {
      setDeleting(false)
    }
  }

  const removeUnsaved = (index: number) => {
    setTestimonials((prev) => prev.filter((_, j) => j !== index))
  }

  const addTestimonial = () => {
    setTestimonials((prev) => [
      ...prev,
      { nombre: "", texto: "", estrellas: 5 },
    ])
  }

  const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )

  // Skeleton
  const SkeletonCard = () => (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-5 w-32 bg-gray-200 rounded" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-9 bg-gray-200 rounded" />
        <div className="h-9 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-9 w-28 bg-gray-200 rounded" />
      </CardContent>
    </Card>
  )

  if (initialLoading) {
    return (
      <div className="space-y-8 max-w-2xl">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 ${
          toast.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          {toast.message}
        </div>
      )}

      {/* Hero Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hero Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Badge</Label>
            <Input value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} placeholder="Ej: Envío gratis en Bogotá" className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Título</Label>
            <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Título principal" className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Subtítulo</Label>
            <Textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} placeholder="Descripción del hero" rows={2} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Imagen del Banner (URL)</Label>
            <Input value={heroImage} onChange={(e) => setHeroImage(e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" className="h-9" />
            {heroImage && (
              <div className="mt-2 relative h-32 rounded-lg overflow-hidden border">
                <img src={heroImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <Button onClick={saveHero} disabled={savingHero} size="sm">
            {savingHero && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
            {savingHero ? "Guardando..." : "Guardar Hero"}
          </Button>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Testimonios</CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">{testimonials.length} testimonios</p>
          </div>
          <Button variant="outline" size="sm" onClick={addTestimonial}>
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {testimonials.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 font-medium">No hay testimonios</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={addTestimonial}>
                <Plus className="h-4 w-4 mr-1" /> Crear primer testimonio
              </Button>
            </div>
          )}

          {testimonials.map((t, i) => {
            const key = t.id ?? `new-${i}`
            const isSaving = savingId === key
            return (
              <div key={key} className="border rounded-lg p-4 space-y-3 bg-gray-50/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {t.id ? (
                      <span className="text-xs text-gray-400 font-mono">#{t.id}</span>
                    ) : (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">Nuevo</span>
                    )}
                  </div>
                  <StarRating
                    value={t.estrellas}
                    onChange={(v) =>
                      setTestimonials((prev) =>
                        prev.map((p, j) => (j === i ? { ...p, estrellas: v } : p))
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Nombre</Label>
                    <Input
                      value={t.nombre}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((p, j) => (j === i ? { ...p, nombre: e.target.value } : p))
                        )
                      }
                      className="h-9"
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Texto</Label>
                    <Textarea
                      value={t.texto}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((p, j) => (j === i ? { ...p, texto: e.target.value } : p))
                        )
                      }
                      rows={2}
                      placeholder="Reseña del cliente..."
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => saveTestimonial(t, i)}
                    disabled={isSaving || !t.nombre || !t.texto}
                  >
                    {isSaving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                    {isSaving ? "Guardando..." : "Guardar"}
                  </Button>
                  {t.id ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-700 hover:border-red-300"
                      onClick={() => setDeleteTarget(t)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Eliminar
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => removeUnsaved(i)}>
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Eliminar testimonio</h3>
              <p className="text-sm text-gray-500">
                ¿Estás seguro de eliminar el testimonio de <strong>{deleteTarget.nombre}</strong>? Esta acción no se puede deshacer.
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
