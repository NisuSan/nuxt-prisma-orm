import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | undefined = undefined

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as Record<string, any>).prisma) {
    (global as Record<string, any>).prisma = new PrismaClient()
  }
  prisma = (global as Record<string, any>).prisma
}

export default prisma
