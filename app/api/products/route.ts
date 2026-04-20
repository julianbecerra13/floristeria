import { NextRequest, NextResponse } from "next/server"
import { eq, inArray } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { products } from "@/lib/schema"
import { getProducts } from "@/lib/data"
import { serializeCategorias } from "@/lib/products"

export async function GET() {
  const data = await getProducts()
  return NextResponse.json(data)
}

function resolveCategorias(body: { categorias?: unknown; categoria?: unknown }): string[] {
  if (Array.isArray(body.categorias)) {
    return body.categorias.filter((c): c is string => typeof c === "string" && c.trim() !== "")
  }
  if (typeof body.categoria === "string" && body.categoria.trim() !== "") {
    return [body.categoria]
  }
  return []
}

export async function POST(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const categorias = resolveCategorias(body)
  if (categorias.length === 0) {
    return NextResponse.json({ error: "Debe seleccionar al menos una categoría" }, { status: 400 })
  }

  const [row] = await db.insert(products).values({
    nombre: body.nombre,
    precio: body.precio,
    precioOriginal: body.precioOriginal || null,
    imagen: body.imagen,
    categoria: serializeCategorias(categorias),
    badge: body.badge || null,
    descripcion: body.descripcion,
  }).returning()

  return NextResponse.json(row, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const categorias = resolveCategorias(body)
  if (categorias.length === 0) {
    return NextResponse.json({ error: "Debe seleccionar al menos una categoría" }, { status: 400 })
  }

  const [row] = await db.update(products)
    .set({
      nombre: body.nombre,
      precio: body.precio,
      precioOriginal: body.precioOriginal || null,
      imagen: body.imagen,
      categoria: serializeCategorias(categorias),
      badge: body.badge || null,
      descripcion: body.descripcion,
    })
    .where(eq(products.id, body.id))
    .returning()

  return NextResponse.json(row)
}

export async function DELETE(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const ids: number[] = body.ids
  if (!ids || ids.length === 0) return NextResponse.json({ error: "No se enviaron IDs" }, { status: 400 })

  await db.delete(products).where(inArray(products.id, ids))
  return NextResponse.json({ ok: true, deleted: ids.length })
}
