export interface Product {
  id: number
  nombre: string
  precio: number
  precioOriginal?: number
  imagen: string
  categoria: string
  badge?: string
  descripcion: string
}

export interface CategoryGroup {
  nombre: string
  slug: string
  icono: string
  subcategorias: { nombre: string; slug: string }[]
}

export const WHATSAPP_NUMBER = "573157630286"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me interesa un arreglo floral")}`

export const categoryGroups: CategoryGroup[] = [
  {
    nombre: "Fechas Especiales",
    slug: "fechas-especiales",
    icono: "🎉",
    subcategorias: [
      { nombre: "Día de Amor y Amistad", slug: "amor-y-amistad" },
      { nombre: "Día de la Madre", slug: "dia-madre" },
      { nombre: "Día de la Mujer", slug: "dia-mujer" },
      { nombre: "Día del Padre", slug: "dia-padre" },
      { nombre: "San Valentín", slug: "san-valentin" },
      { nombre: "Feliz Aniversario", slug: "aniversario" },
      { nombre: "Cumple Meses", slug: "cumple-meses" },
      { nombre: "Cumpleaños", slug: "cumpleanos" },
      { nombre: "Quince Años", slug: "quince-anos" },
      { nombre: "Grado", slug: "grado" },
      { nombre: "Para Hombre", slug: "para-hombre" },
      { nombre: "Ramos Premium", slug: "ramos-premium" },
      { nombre: "Nacimiento", slug: "nacimiento" },
      { nombre: "Recuperación", slug: "recuperacion" },
      { nombre: "Solo Porque Sí", slug: "solo-porque-si" },
    ],
  },
  {
    nombre: "Arreglos Florales",
    slug: "arreglos-florales",
    icono: "💐",
    subcategorias: [
      { nombre: "Arreglos Manuales", slug: "arreglos-manuales" },
      { nombre: "Arreglos en Caja", slug: "arreglos-en-caja" },
      { nombre: "Flores y Chocolates", slug: "flores-y-chocolates" },
      { nombre: "Flores y Licores", slug: "flores-y-licores" },
      { nombre: "Flores y Globos", slug: "flores-y-globos" },
      { nombre: "Exóticos", slug: "exoticos" },
      { nombre: "Cajas Sorpresa", slug: "cajas-sorpresa" },
    ],
  },
  {
    nombre: "Arreglos Fúnebres",
    slug: "arreglos-funebres",
    icono: "🕊️",
    subcategorias: [
      { nombre: "Abanicos", slug: "abanicos" },
      { nombre: "Cube Cajones", slug: "cube-cajones" },
      { nombre: "Coronas", slug: "coronas" },
      { nombre: "Pedestales", slug: "pedestales" },
      { nombre: "Pequeños", slug: "pequenos" },
    ],
  },
  {
    nombre: "Adicionales",
    slug: "adicionales",
    icono: "🎁",
    subcategorias: [
      { nombre: "Peluches", slug: "peluches" },
      { nombre: "Chocolates", slug: "chocolates" },
      { nombre: "Licores", slug: "licores" },
      { nombre: "Globos", slug: "globos" },
      { nombre: "Tarjetas", slug: "tarjetas" },
    ],
  },
]

// Flat categories for backwards compatibility
export const categories = categoryGroups.flatMap((group) => [
  { nombre: group.nombre, slug: group.slug, icono: group.icono },
  ...group.subcategorias.map((sub) => ({
    nombre: sub.nombre,
    slug: sub.slug,
    icono: group.icono,
  })),
])

export const products: Product[] = [
  // Fechas Especiales
  {
    id: 1,
    nombre: "Ramo Día de la Madre Premium",
    precio: 149900,
    precioOriginal: 189900,
    imagen: "/placeholder-roses.jpg",
    categoria: "dia-madre",
    badge: "Más Vendido",
    descripcion: "Hermoso ramo de rosas y lirios para mamá con envoltura premium",
  },
  {
    id: 2,
    nombre: "Ramo San Valentín Rosas Rojas x 24",
    precio: 139900,
    imagen: "/placeholder-valentine.jpg",
    categoria: "san-valentin",
    badge: "Popular",
    descripcion: "24 rosas rojas con gypsophila, el regalo perfecto para el amor",
  },
  {
    id: 3,
    nombre: "Arreglo Feliz Aniversario",
    precio: 119900,
    imagen: "/placeholder-anniversary.jpg",
    categoria: "aniversario",
    descripcion: "Arreglo mixto de rosas y astromelias para celebrar el amor",
  },
  {
    id: 4,
    nombre: "Bouquet Cumpleaños Colorido",
    precio: 99900,
    precioOriginal: 129900,
    imagen: "/placeholder-birthday.jpg",
    categoria: "cumpleanos",
    badge: "20% OFF",
    descripcion: "Ramo vibrante de flores mixtas para celebrar un cumpleaños especial",
  },
  // Arreglos Florales
  {
    id: 5,
    nombre: "Arreglo Manual Rosas y Girasoles",
    precio: 129900,
    imagen: "/placeholder-manual.jpg",
    categoria: "arreglos-manuales",
    badge: "Nuevo",
    descripcion: "Arreglo artesanal con rosas, girasoles y follaje verde",
  },
  {
    id: 6,
    nombre: "Caja de Rosas Rosadas Premium",
    precio: 179900,
    precioOriginal: 219900,
    imagen: "/placeholder-box-roses.jpg",
    categoria: "arreglos-en-caja",
    badge: "Premium",
    descripcion: "Elegante caja con 20 rosas rosadas y decoración especial",
  },
  {
    id: 7,
    nombre: "Rosas con Chocolates Ferrero",
    precio: 199900,
    imagen: "/placeholder-choco.jpg",
    categoria: "flores-y-chocolates",
    badge: "Más Vendido",
    descripcion: "12 rosas rojas acompañadas de caja de chocolates Ferrero Rocher",
  },
  {
    id: 8,
    nombre: "Rosas con Vino Tinto",
    precio: 229900,
    precioOriginal: 269900,
    imagen: "/placeholder-wine.jpg",
    categoria: "flores-y-licores",
    descripcion: "Ramo de rosas con botella de vino tinto premium y tarjeta",
  },
  {
    id: 9,
    nombre: "Ramo con Globos de Helio",
    precio: 159900,
    imagen: "/placeholder-balloons.jpg",
    categoria: "flores-y-globos",
    descripcion: "Ramo de flores mixtas con 3 globos de helio personalizados",
  },
  {
    id: 10,
    nombre: "Arreglo Exótico Tropical",
    precio: 169900,
    precioOriginal: 199900,
    imagen: "/placeholder-exotic.jpg",
    categoria: "exoticos",
    badge: "15% OFF",
    descripcion: "Heliconias, aves del paraíso y ginger en base de cerámica",
  },
  {
    id: 11,
    nombre: "Caja Sorpresa Romántica",
    precio: 249900,
    imagen: "/placeholder-surprise.jpg",
    categoria: "cajas-sorpresa",
    badge: "Edición Especial",
    descripcion: "Caja sorpresa con rosas, chocolates, peluche y tarjeta personalizada",
  },
  // Arreglos Fúnebres
  {
    id: 12,
    nombre: "Corona Fúnebre Clásica",
    precio: 189900,
    imagen: "/placeholder-corona.jpg",
    categoria: "coronas",
    descripcion: "Corona de flores blancas y follaje con cinta personalizada",
  },
  {
    id: 13,
    nombre: "Pedestal de Condolencias",
    precio: 259900,
    imagen: "/placeholder-pedestal.jpg",
    categoria: "pedestales",
    descripcion: "Arreglo pedestal con rosas blancas, lirios y claveles",
  },
  // Adicionales
  {
    id: 14,
    nombre: "Peluche Osito con Corazón",
    precio: 49900,
    imagen: "/placeholder-teddy.jpg",
    categoria: "peluches",
    descripcion: "Tierno osito de peluche con corazón, ideal para acompañar tus flores",
  },
  {
    id: 15,
    nombre: "Caja de Chocolates Premium",
    precio: 59900,
    imagen: "/placeholder-chocolates.jpg",
    categoria: "chocolates",
    descripcion: "Caja de chocolates finos importados, complemento perfecto",
  },
  {
    id: 16,
    nombre: "Globos Personalizados x 3",
    precio: 39900,
    imagen: "/placeholder-globos.jpg",
    categoria: "globos",
    descripcion: "3 globos de helio con mensaje personalizado para cualquier ocasión",
  },
]

export const testimonials = [
  {
    id: 1,
    nombre: "María García",
    texto: "Las flores llegaron hermosas y muy frescas. El servicio fue excelente y la entrega puntual. ¡Mi mamá quedó encantada con su regalo!",
    estrellas: 5,
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    texto: "Pedí un ramo para mi esposa y superó todas mis expectativas. La calidad de las rosas es increíble. Definitivamente volveré a comprar.",
    estrellas: 5,
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    texto: "Excelente servicio, flores frescas y hermosas. La caja de rosas que pedí llegó perfecta. Muy recomendado para regalos especiales.",
    estrellas: 4,
  },
]

export function formatPrice(precio: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio)
}

export function getCategoryEmoji(categoria: string): string {
  for (const group of categoryGroups) {
    if (group.slug === categoria) return group.icono
    for (const sub of group.subcategorias) {
      if (sub.slug === categoria) return group.icono
    }
  }
  return "💐"
}
