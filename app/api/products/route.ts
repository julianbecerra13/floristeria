import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { products } from "@/lib/schema"
import { getProducts } from "@/lib/data"

export async function GET() {
  const data = await getProducts()
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const [row] = await db.insert(products).values({
    nombre: body.nombre,
    precio: body.precio,
    precioOriginal: body.precioOriginal || null,
    imagen: body.imagen,
    categoria: body.categoria,
    badge: body.badge || null,
    descripcion: body.descripcion,
  }).returning()

  return NextResponse.json(row, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const [row] = await db.update(products)
    .set({
      nombre: body.nombre,
      precio: body.precio,
      precioOriginal: body.precioOriginal || null,
      imagen: body.imagen,
      categoria: body.categoria,
      badge: body.badge || null,
      descripcion: body.descripcion,
    })
    .where(eq(products.id, body.id))
    .returning()

  return NextResponse.json(row)
}
