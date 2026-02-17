import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import * as schema from "@/lib/schema"
import {
  products as defaultProducts,
  categoryGroups,
  testimonials as defaultTestimonials,
} from "@/lib/products"

export async function POST() {
  const db = getDb()
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 500 })

  // Clear existing data
  await db.delete(schema.products)
  await db.delete(schema.categories)
  await db.delete(schema.testimonials)

  // Seed products
  await db.insert(schema.products).values(
    defaultProducts.map((p) => ({
      nombre: p.nombre,
      precio: p.precio,
      precioOriginal: p.precioOriginal ?? null,
      imagen: p.imagen,
      categoria: p.categoria,
      badge: p.badge ?? null,
      descripcion: p.descripcion,
    }))
  )

  // Seed categories (groups + subcategories)
  const categoryRows: { nombre: string; slug: string; icono: string; grupo: string | null }[] = []
  for (const group of categoryGroups) {
    // Insert the group itself
    categoryRows.push({
      nombre: group.nombre,
      slug: group.slug,
      icono: group.icono,
      grupo: null,
    })
    // Insert subcategories
    for (const sub of group.subcategorias) {
      categoryRows.push({
        nombre: sub.nombre,
        slug: sub.slug,
        icono: group.icono,
        grupo: group.slug,
      })
    }
  }
  await db.insert(schema.categories).values(categoryRows)

  // Seed testimonials
  await db.insert(schema.testimonials).values(
    defaultTestimonials.map((t) => ({
      nombre: t.nombre,
      texto: t.texto,
      estrellas: t.estrellas,
    }))
  )

  return NextResponse.json({ ok: true, message: "Datos iniciales cargados" })
}
