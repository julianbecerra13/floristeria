"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Product, formatPrice, getCategoryEmoji, WHATSAPP_NUMBER } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa: ${product.nombre} - ${formatPrice(product.precio)}`)}`
  const [imgError, setImgError] = useState(false)

  const hasRealImage =
    product.imagen &&
    !product.imagen.includes("placeholder") &&
    product.imagen.startsWith("http")

  return (
    <Card className="group overflow-hidden py-0 gap-0 transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-100 to-rose-50">
        {hasRealImage && !imgError ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-60">
            {getCategoryEmoji(product.categoria)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-pink-600 hover:bg-pink-600 text-white text-xs">
            {product.badge}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.nombre}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.descripcion}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-pink-600">{formatPrice(product.precio)}</span>
          {product.precioOriginal && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.precioOriginal)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Comprar por WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
