import { NextRequest, NextResponse } from "next/server"
import { login, logout } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()
  const success = await login(username, password)

  if (!success) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await logout()
  return NextResponse.json({ ok: true })
}
