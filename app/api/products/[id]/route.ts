import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { products } from "@/lib/schema"

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const { id } = await params
  await db.delete(products).where(eq(products.id, parseInt(id)))
  return NextResponse.json({ ok: true })
}
