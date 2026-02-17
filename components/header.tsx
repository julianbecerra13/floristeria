"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, MessageCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { categoryGroups, WHATSAPP_URL } from "@/lib/products"

export function Header() {
  const [catOpen, setCatOpen] = useState(false)
  const [mobileCatOpen, setMobileCatOpen] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCatOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetTitle className="text-xl font-bold text-pink-600">DaleRosas</SheetTitle>
            <nav className="mt-6 flex flex-col gap-2">
              <a
                href="/"
                className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
              >
                Inicio
              </a>

              {/* Mobile categories */}
              <div className="border-t pt-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categorías</span>
                {categoryGroups.map((group) => (
                  <div key={group.slug} className="mt-2">
                    <button
                      onClick={() => setMobileCatOpen(mobileCatOpen === group.slug ? null : group.slug)}
                      className="flex items-center justify-between w-full text-left text-base font-medium text-gray-700 hover:text-pink-600 transition-colors py-1.5"
                    >
                      <span>{group.icono} {group.nombre}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileCatOpen === group.slug ? "rotate-180" : ""}`} />
                    </button>
                    {mobileCatOpen === group.slug && (
                      <div className="ml-6 flex flex-col gap-1 mt-1">
                        {group.subcategorias.map((sub) => (
                          <a
                            key={sub.slug}
                            href="#catalogo"
                            className="text-sm text-gray-600 hover:text-pink-600 transition-colors py-1"
                          >
                            {sub.nombre}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors py-2 border-t mt-2 pt-4"
              >
                Contacto
              </a>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <a href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-pink-600">Dale</span>
          <span className="text-2xl font-bold text-green-700">Rosas</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
          >
            Inicio
          </a>

          {/* Categories dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
            >
              Categorías
              <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>

            {catOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white rounded-xl shadow-xl border p-6 grid grid-cols-4 gap-6 z-50">
                {categoryGroups.map((group) => (
                  <div key={group.slug}>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
                      <span>{group.icono}</span>
                      {group.nombre}
                    </h3>
                    <ul className="space-y-1">
                      {group.subcategorias.map((sub) => (
                        <li key={sub.slug}>
                          <a
                            href="#catalogo"
                            onClick={() => setCatOpen(false)}
                            className="text-xs text-gray-600 hover:text-pink-600 transition-colors"
                          >
                            {sub.nombre}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <a
            href="#contacto"
            className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
          >
            Contacto
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
