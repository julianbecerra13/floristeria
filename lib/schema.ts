import { pgTable, serial, text, integer, jsonb } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  precio: integer("precio").notNull(),
  precioOriginal: integer("precio_original"),
  imagen: text("imagen").notNull(),
  categoria: text("categoria").notNull(),
  badge: text("badge"),
  descripcion: text("descripcion").notNull(),
})

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  slug: text("slug").notNull().unique(),
  icono: text("icono").notNull(),
  grupo: text("grupo"),
})

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  texto: text("texto").notNull(),
  estrellas: integer("estrellas").notNull(),
})

export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
})
