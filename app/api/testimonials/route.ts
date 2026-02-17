import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { testimonials } from "@/lib/schema"

export async function GET() {
  const db = getDb()
  if (!db) return NextResponse.json([])

  const rows = await db.select().from(testimonials)
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const [row] = await db.insert(testimonials).values({
    nombre: body.nombre,
    texto: body.texto,
    estrellas: body.estrellas,
  }).returning()

  return NextResponse.json(row, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const [row] = await db.update(testimonials)
    .set({
      nombre: body.nombre,
      texto: body.texto,
      estrellas: body.estrellas,
    })
    .where(eq(testimonials.id, body.id))
    .returning()

  return NextResponse.json(row)
}
