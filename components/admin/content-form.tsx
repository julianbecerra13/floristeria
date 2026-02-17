"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"

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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setTestimonials)

    fetch("/api/page-content?key=hero")
      .then((r) => r.json())
      .then((data) => {
        if (data?.value) {
          const v = data.value as Record<string, string>
          setHeroTitle(v.title || "")
          setHeroSubtitle(v.subtitle || "")
          setHeroBadge(v.badge || "")
          setHeroImage(v.image || "")
        }
      })
  }, [])

  const saveHero = async () => {
    setLoading(true)
    await fetch("/api/page-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "hero",
        value: { title: heroTitle, subtitle: heroSubtitle, badge: heroBadge, image: heroImage },
      }),
    })
    setMessage("Hero guardado")
    setLoading(false)
    setTimeout(() => setMessage(""), 3000)
  }

  const saveTestimonial = async (t: Testimonial) => {
    setLoading(true)
    const method = t.id ? "PUT" : "POST"
    const res = await fetch("/api/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    })
    const saved = await res.json()
    setTestimonials((prev) =>
      t.id
        ? prev.map((p) => (p.id === t.id ? saved : p))
        : [...prev, saved]
    )
    setMessage("Testimonio guardado")
    setLoading(false)
    setTimeout(() => setMessage(""), 3000)
  }

  const deleteTestimonial = async (id: number) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  const addTestimonial = () => {
    setTestimonials((prev) => [
      ...prev,
      { nombre: "", texto: "", estrellas: 5 },
    ])
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {message && (
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm">
          {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Hero Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Badge</Label>
            <Input value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} placeholder="Ej: Envío gratis en Bogotá" />
          </div>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Título principal" />
          </div>
          <div className="space-y-2">
            <Label>Subtítulo</Label>
            <Textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} placeholder="Descripción del hero" />
          </div>
          <div className="space-y-2">
            <Label>Imagen del Banner (URL)</Label>
            <Input value={heroImage} onChange={(e) => setHeroImage(e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" />
            {heroImage && (
              <div className="mt-2 relative h-32 rounded-lg overflow-hidden border">
                <img src={heroImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <Button onClick={saveHero} disabled={loading}>
            Guardar Hero
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Testimonios</CardTitle>
          <Button variant="outline" size="sm" onClick={addTestimonial}>
            <Plus className="h-4 w-4 mr-1" /> Agregar
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {testimonials.map((t, i) => (
            <div key={t.id ?? `new-${i}`} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>Nombre</Label>
                      <Input
                        value={t.nombre}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((p, j) => (j === i ? { ...p, nombre: e.target.value } : p))
                          )
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Estrellas</Label>
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={t.estrellas}
                        onChange={(e) =>
                          setTestimonials((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, estrellas: parseInt(e.target.value) } : p
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Texto</Label>
                    <Textarea
                      value={t.texto}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((p, j) => (j === i ? { ...p, texto: e.target.value } : p))
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => saveTestimonial(t)} disabled={loading}>
                  Guardar
                </Button>
                {t.id && (
                  <Button size="sm" variant="destructive" onClick={() => deleteTestimonial(t.id!)}>
                    <Trash2 className="h-3 w-3 mr-1" /> Eliminar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
