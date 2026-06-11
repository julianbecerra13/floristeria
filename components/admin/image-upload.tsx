"use client"

import { useState, useRef } from "react"
import { optimizeImage } from "@/lib/cloudinary"
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader2, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

// Redimensiona y convierte a WebP en el navegador antes de subir, para que la
// imagen pese poco (menos almacenamiento/transferencia y carga más rápida).
async function compressImage(file: File, maxDim = 1600, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  let { width, height } = bitmap

  if (width > maxDim || height > maxDim) {
    const scale = Math.min(maxDim / width, maxDim / height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("No se pudo procesar la imagen")
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/webp", quality)
  )
  if (!blob) throw new Error("No se pudo comprimir la imagen")
  return blob
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes")
      return
    }

    if (file.size > 15 * 1024 * 1024) {
      alert("La imagen no puede pesar más de 15MB")
      return
    }

    setUploading(true)

    try {
      const compressed = await compressImage(file)

      const formData = new FormData()
      formData.append("file", compressed, `${Date.now()}.webp`)

      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Error al subir imagen")
      }

      const { url } = await res.json()
      onChange(url)
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      alert("Error al subir la imagen. Intenta de nuevo.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const isValidImage = value && !value.includes("placeholder") && value.startsWith("http")

  return (
    <div className="space-y-2">
      {isValidImage ? (
        <div className="relative w-full aspect-square max-w-[200px] rounded-lg overflow-hidden border bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={optimizeImage(value, 400)} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className="w-full aspect-square max-w-[200px] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/50 transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-pink-500 animate-spin mb-2" />
              <span className="text-xs text-gray-500">Subiendo...</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">Subir imagen</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {isValidImage && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Subiendo...</>
          ) : (
            <><ImagePlus className="h-3 w-3 mr-1" /> Cambiar imagen</>
          )}
        </Button>
      )}
    </div>
  )
}
