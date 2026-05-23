// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = "djo9aczfq"
export const CLOUDINARY_UPLOAD_PRESET = "ml_default"
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

// Inserta transformaciones de entrega en una URL de Cloudinary para reducir el peso
// servido (formato y calidad automáticos, ancho limitado). Devuelve la URL intacta si
// no es una URL de entrega de Cloudinary (placeholders, rutas locales, etc.).
export function optimizeImage(url: string, width?: number): string {
  if (!url) return url

  const marker = "/image/upload/"
  const idx = url.indexOf(marker)
  if (idx === -1) return url

  const insertAt = idx + marker.length
  // Si ya tiene transformaciones aplicadas, no duplicar.
  if (url.slice(insertAt).startsWith("f_auto")) return url

  const transforms = ["f_auto", "q_auto", "c_limit"]
  if (width) transforms.push(`w_${width}`)

  return `${url.slice(0, insertAt)}${transforms.join(",")}/${url.slice(insertAt)}`
}
