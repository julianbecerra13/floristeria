import { eq } from "drizzle-orm"
import { getDb } from "./db"
import * as schema from "./schema"
import {
  products as defaultProducts,
  categories as defaultCategories,
  categoryGroups as defaultCategoryGroups,
  testimonials as defaultTestimonials,
  parseCategorias,
  type Product,
  type CategoryGroup,
} from "./products"

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const db = getDb()
    if (!db) {
      return defaultProducts.find((p) => p.id === id) ?? null
    }

    const rows = await db.select().from(schema.products).where(eq(schema.products.id, id))
    const r = rows[0]
    if (!r) return null

    return {
      id: r.id,
      nombre: r.nombre,
      precio: r.precio,
      precioOriginal: r.precioOriginal ?? undefined,
      imagen: r.imagen,
      categoria: r.categoria,
      categorias: parseCategorias(r.categoria),
      badge: r.badge ?? undefined,
      descripcion: r.descripcion,
    }
  } catch {
    return defaultProducts.find((p) => p.id === id) ?? null
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const db = getDb()
    if (!db) return defaultProducts

    const rows = await db.select().from(schema.products)

    return rows.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      precio: r.precio,
      precioOriginal: r.precioOriginal ?? undefined,
      imagen: r.imagen,
      categoria: r.categoria,
      categorias: parseCategorias(r.categoria),
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

// Grupos completos con sus subcategorías, leídos desde la DB.
// Fallback a categorías hardcoded solo cuando no hay DATABASE_URL (modo dev sin DB).
// Si hay DB pero está vacía, devuelve [] para respetar lo que el admin configure.
export async function getCategoryGroupsWithSubs(): Promise<CategoryGroup[]> {
  try {
    const db = getDb()
    if (!db) return defaultCategoryGroups

    const rows = await db.select().from(schema.categories)
    if (rows.length === 0) return []

    const groups = rows.filter((r) => r.grupo === null)
    return groups.map((g) => ({
      nombre: g.nombre,
      slug: g.slug,
      icono: g.icono,
      subcategorias: rows
        .filter((r) => r.grupo === g.slug)
        .map((s) => ({ nombre: s.nombre, slug: s.slug })),
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
