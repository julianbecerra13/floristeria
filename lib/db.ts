import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL
  if (!url) return null
  return url
}

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  const url = getDatabaseUrl()
  if (!url) return null

  if (!_db) {
    const sql = neon(url)
    _db = drizzle(sql, { schema })
  }
  return _db
}
