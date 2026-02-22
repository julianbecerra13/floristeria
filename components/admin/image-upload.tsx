"use client"

import { useState, useRef } from "react"
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "@/lib/cloudinary"
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader2, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no puede pesar más de 5MB")
      return
    }

    setUploading(true)
    setProgress(0)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

    try {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100))
        }
      })

      const url = await new Promise<string>((resolve, reject) => {
        xhr.open("POST", CLOUDINARY_UPLOAD_URL)
        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText)
            resolve(data.secure_url)
          } else {
            reject(new Error("Error al subir imagen"))
          }
        }
        xhr.onerror = () => reject(new Error("Error de red"))
        xhr.send(formData)
      })

      onChange(url)
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      alert("Error al subir la imagen. Verifica tu conexión.")
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
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
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
              <span className="text-xs text-gray-500">{progress}%</span>
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
            <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> {progress}%</>
          ) : (
            <><ImagePlus className="h-3 w-3 mr-1" /> Cambiar imagen</>
          )}
        </Button>
      )}
    </div>
  )
}
