import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { categories } from "@/lib/schema"

export async function GET() {
  const db = getDb()
  if (!db) return NextResponse.json([])

  const rows = await db.select().from(categories)
  return NextResponse.json(rows)
}

export async function POST(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const [row] = await db.insert(categories).values({
    nombre: body.nombre,
    slug: body.slug,
    icono: body.icono,
    grupo: body.grupo ?? null,
  }).returning()

  return NextResponse.json(row, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const [row] = await db.update(categories)
    .set({
      nombre: body.nombre,
      slug: body.slug,
      icono: body.icono,
      grupo: body.grupo ?? null,
    })
    .where(eq(categories.id, body.id))
    .returning()

  return NextResponse.json(row)
}
