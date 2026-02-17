import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { testimonials } from "@/lib/schema"

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  const { id } = await params
  await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)))
  return NextResponse.json({ ok: true })
}
