import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Almacenamiento de imágenes no configurado" },
      { status: 500 }
    )
  }

  const formData = await request.formData()
  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se envió archivo" }, { status: 400 })
  }

  const blob = await put(`productos/${file.name || "imagen.webp"}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || "image/webp",
  })

  return NextResponse.json({ url: blob.url })
}
