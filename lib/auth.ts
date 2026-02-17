import { cookies } from "next/headers"

const SESSION_COOKIE = "admin_session"
const SESSION_VALUE = "authenticated"

// Credenciales locales hardcodeadas
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "dale2024"

export async function login(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) return false

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  })

  return true
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE
}
