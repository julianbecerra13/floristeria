"use client"

import { Star, X, ChevronDown, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

interface Category {
  id: number
  nombre: string
  slug: string
  icono: string
  grupo: string | null
}

interface Props {
  value: string[]
  onChange: (next: string[]) => void
  categories: Category[]
  disabled?: boolean
}

export function CategoriesMultiselect({ value, onChange, categories, disabled }: Props) {
  const groups = categories.filter((c) => c.grupo === null)
  const getSubcats = (groupSlug: string) => categories.filter((c) => c.grupo === groupSlug)
  const getCatName = (slug: string) => categories.find((c) => c.slug === slug)?.nombre ?? slug

  const toggle = (slug: string, checked: boolean) => {
    if (checked) {
      if (value.includes(slug)) return
      onChange([...value, slug])
    } else {
      onChange(value.filter((s) => s !== slug))
    }
  }

  const remove = (slug: string) => onChange(value.filter((s) => s !== slug))

  const makePrimary = (slug: string) => {
    if (value[0] === slug) return
    onChange([slug, ...value.filter((s) => s !== slug)])
  }

  const allSubcats = categories.filter((c) => c.grupo !== null)
  const noneAvailable = allSubcats.length === 0

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5 min-h-9 rounded-md border border-input bg-transparent p-1.5">
        {value.length === 0 ? (
          <span className="text-sm text-gray-400 px-1.5">Sin categorías seleccionadas</span>
        ) : (
          value.map((slug, i) => (
            <Badge
              key={slug}
              variant={i === 0 ? "default" : "secondary"}
              className="gap-1 pl-1.5 pr-1 py-0.5 text-xs font-medium"
            >
              <button
                type="button"
                onClick={() => makePrimary(slug)}
                title={i === 0 ? "Categoría principal" : "Marcar como principal"}
                className="flex items-center"
                disabled={disabled}
              >
                <Star
                  className={`h-3 w-3 ${i === 0 ? "fill-current" : "opacity-40 hover:opacity-100"}`}
                />
              </button>
              <span>{getCatName(slug)}</span>
              <button
                type="button"
                onClick={() => remove(slug)}
                title="Quitar"
                className="rounded-sm hover:bg-black/10 p-0.5"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs gap-1 text-gray-600 hover:text-gray-900"
              disabled={disabled || noneAvailable}
            >
              <Plus className="h-3 w-3" />
              Agregar
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-80 overflow-y-auto w-64">
            {noneAvailable ? (
              <div className="px-2 py-3 text-sm text-gray-500">No hay categorías disponibles</div>
            ) : (
              groups.map((group, gi) => {
                const subs = getSubcats(group.slug)
                if (subs.length === 0) return null
                return (
                  <div key={group.slug}>
                    {gi > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel className="text-xs text-gray-500 font-semibold">
                      {group.icono} {group.nombre}
                    </DropdownMenuLabel>
                    {subs.map((sub) => (
                      <DropdownMenuCheckboxItem
                        key={sub.slug}
                        checked={value.includes(sub.slug)}
                        onCheckedChange={(checked) => toggle(sub.slug, Boolean(checked))}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {sub.nombre}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                )
              })
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {value.length > 0 && (
        <p className="text-[11px] text-gray-500">
          La estrella indica la categoría principal (define el emoji y orden de recomendaciones).
        </p>
      )}
    </div>
  )
}
