import { eq, isNull } from "drizzle-orm"
import { getDb } from "./db"
import * as schema from "./schema"
import {
  products as defaultProducts,
  categories as defaultCategories,
  testimonials as defaultTestimonials,
  type Product,
} from "./products"

export async function getProducts(): Promise<Product[]> {
  try {
    const db = getDb()
    if (!db) return defaultProducts

    const rows = await db.select().from(schema.products)
    if (rows.length === 0) return defaultProducts

    return rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      precio: r.precio,
      precioOriginal: r.precioOriginal ?? undefined,
      imagen: r.imagen,
      categoria: r.categoria,
      badge: r.badge ?? undefined,
      descripcion: r.descripcion,
    }))
  } catch {
    return defaultProducts
  }
}

export async function getCategories() {
  try {
    const db = getDb()
    if (!db) return defaultCategories

    const rows = await db.select().from(schema.categories)
    if (rows.length === 0) return defaultCategories

    return rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      slug: r.slug,
      icono: r.icono,
      grupo: r.grupo,
    }))
  } catch {
    return defaultCategories
  }
}

// Get only subcategories (for product dropdown)
export async function getSubcategories() {
  try {
    const db = getDb()
    if (!db) {
      return defaultCategories.filter((c) => !("grupo" in c) || (c as Record<string, unknown>).grupo !== null)
    }

    const rows = await db.select().from(schema.categories)
    if (rows.length === 0) return []

    return rows
      .filter((r) => r.grupo !== null)
      .map((r) => ({
        id: r.id,
        nombre: r.nombre,
        slug: r.slug,
        icono: r.icono,
        grupo: r.grupo,
      }))
  } catch {
    return []
  }
}

// Get only parent groups
export async function getCategoryGroups() {
  try {
    const db = getDb()
    if (!db) return []

    const rows = await db.select().from(schema.categories)
    return rows
      .filter((r) => r.grupo === null)
      .map((r) => ({
        id: r.id,
        nombre: r.nombre,
        slug: r.slug,
        icono: r.icono,
      }))
  } catch {
    return []
  }
}

export async function getTestimonials() {
  try {
    const db = getDb()
    if (!db) return defaultTestimonials

    const rows = await db.select().from(schema.testimonials)
    if (rows.length === 0) return defaultTestimonials

    return rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      texto: r.texto,
      estrellas: r.estrellas,
    }))
  } catch {
    return defaultTestimonials
  }
}

export async function getPageContent(key: string) {
  try {
    const db = getDb()
    if (!db) return null

    const rows = await db
      .select()
      .from(schema.pageContent)
      .where(eq(schema.pageContent.key, key))

    return rows[0]?.value ?? null
  } catch {
    return null
  }
}
