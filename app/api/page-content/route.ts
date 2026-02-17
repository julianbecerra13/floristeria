import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { pageContent } from "@/lib/schema"

export async function GET(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({})

  const key = request.nextUrl.searchParams.get("key")
  if (key) {
    const rows = await db.select().from(pageContent).where(eq(pageContent.key, key))
    return NextResponse.json(rows[0] ?? null)
  }

  const rows = await db.select().from(pageContent)
  return NextResponse.json(rows)
}

export async function PUT(request: NextRequest) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const body = await request.json()
  const existing = await db.select().from(pageContent).where(eq(pageContent.key, body.key))

  let row
  if (existing.length > 0) {
    ;[row] = await db.update(pageContent)
      .set({ value: body.value })
      .where(eq(pageContent.key, body.key))
      .returning()
  } else {
    ;[row] = await db.insert(pageContent).values({
      key: body.key,
      value: body.value,
    }).returning()
  }

  return NextResponse.json(row)
}
