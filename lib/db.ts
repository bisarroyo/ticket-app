import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: process.env.NEXT_TURSO_DB_URL as string,
  authToken: process.env.NEXT_TURSO_DB_AUTH_TOKEN as string
})

const adapter = new PrismaLibSQL(libsql)
export const prisma = new PrismaClient({ adapter })
