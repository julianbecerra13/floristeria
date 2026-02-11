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

export const products: Product[] = [
  {
    id: 1,
    nombre: "Ramo de Rosas Rojas x 24",
    precio: 129900,
    precioOriginal: 159900,
    imagen: "/placeholder-roses.jpg",
    categoria: "rosas",
    badge: "Más Vendido",
    descripcion: "Hermoso ramo de 24 rosas rojas premium con follaje decorativo",
  },
  {
    id: 2,
    nombre: "Girasoles Radiantes x 12",
    precio: 89900,
    imagen: "/placeholder-sunflowers.jpg",
    categoria: "girasoles",
    descripcion: "Ramo de 12 girasoles frescos que iluminan cualquier espacio",
  },
  {
    id: 3,
    nombre: "Caja de Rosas Rosadas",
    precio: 179900,
    precioOriginal: 219900,
    imagen: "/placeholder-box-roses.jpg",
    categoria: "cajas",
    badge: "20% OFF",
    descripcion: "Elegante caja con 20 rosas rosadas y decoración premium",
  },
  {
    id: 4,
    nombre: "Bouquet Tropical Paradise",
    precio: 109900,
    imagen: "/placeholder-tropical.jpg",
    categoria: "tropicales",
    descripcion: "Mezcla exótica de heliconias, aves del paraíso y follaje tropical",
  },
  {
    id: 5,
    nombre: "Ramo de Lirios Blancos",
    precio: 99900,
    imagen: "/placeholder-lilies.jpg",
    categoria: "lirios",
    badge: "Nuevo",
    descripcion: "Elegante ramo de lirios blancos con eucalipto",
  },
  {
    id: 6,
    nombre: "Rosas Mixtas Arcoíris x 18",
    precio: 139900,
    imagen: "/placeholder-rainbow.jpg",
    categoria: "rosas",
    descripcion: "18 rosas de colores variados: rojo, rosa, amarillo y blanco",
  },
  {
    id: 7,
    nombre: "Caja Luxury con Chocolates",
    precio: 249900,
    precioOriginal: 289900,
    imagen: "/placeholder-luxury.jpg",
    categoria: "cajas",
    badge: "Premium",
    descripcion: "Caja de rosas rojas con chocolates Ferrero y tarjeta personalizada",
  },
  {
    id: 8,
    nombre: "Ramo Silvestre Campestre",
    precio: 79900,
    imagen: "/placeholder-wildflowers.jpg",
    categoria: "ramos",
    descripcion: "Ramo natural con margaritas, claveles y flores silvestres",
  },
  {
    id: 9,
    nombre: "Girasoles con Rosas x 6",
    precio: 119900,
    precioOriginal: 139900,
    imagen: "/placeholder-sun-roses.jpg",
    categoria: "girasoles",
    badge: "Popular",
    descripcion: "Combinación perfecta de 6 girasoles con rosas rojas",
  },
  {
    id: 10,
    nombre: "Orquídea Phalaenopsis",
    precio: 159900,
    imagen: "/placeholder-orchid.jpg",
    categoria: "tropicales",
    descripcion: "Orquídea premium en matera decorativa, dura semanas",
  },
  {
    id: 11,
    nombre: "Ramo Romántico Deluxe",
    precio: 189900,
    precioOriginal: 229900,
    imagen: "/placeholder-romantic.jpg",
    categoria: "ramos",
    badge: "Más Vendido",
    descripcion: "50 rosas rojas con gypsophila y envoltura premium",
  },
  {
    id: 12,
    nombre: "Mini Ramo de Tulipanes",
    precio: 69900,
    imagen: "/placeholder-tulips.jpg",
    categoria: "ramos",
    descripcion: "Delicado ramo de 10 tulipanes holandeses de colores",
  },
  {
    id: 13,
    nombre: "Caja Corazón de Rosas",
    precio: 199900,
    imagen: "/placeholder-heart.jpg",
    categoria: "cajas",
    badge: "Edición Especial",
    descripcion: "Caja en forma de corazón con 30 rosas rojas",
  },
  {
    id: 14,
    nombre: "Lirios y Astromelias",
    precio: 94900,
    precioOriginal: 114900,
    imagen: "/placeholder-mixed.jpg",
    categoria: "lirios",
    descripcion: "Arreglo mixto de lirios orientales y astromelias coloridas",
  },
  {
    id: 15,
    nombre: "Rosas Blancas Elegance x 24",
    precio: 134900,
    imagen: "/placeholder-white-roses.jpg",
    categoria: "rosas",
    descripcion: "24 rosas blancas con follaje verde y lazo de satín",
  },
  {
    id: 16,
    nombre: "Arreglo Tropical Exótico",
    precio: 144900,
    precioOriginal: 174900,
    imagen: "/placeholder-exotic.jpg",
    categoria: "tropicales",
    badge: "15% OFF",
    descripcion: "Heliconia, ginger, ave del paraíso en base de cerámica",
  },
]

export const categories = [
  { nombre: "Rosas", slug: "rosas", icono: "🌹" },
  { nombre: "Girasoles", slug: "girasoles", icono: "🌻" },
  { nombre: "Tropicales", slug: "tropicales", icono: "🌺" },
  { nombre: "Lirios", slug: "lirios", icono: "🪷" },
  { nombre: "Cajas", slug: "cajas", icono: "🎁" },
  { nombre: "Ramos", slug: "ramos", icono: "💐" },
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
