import { Prisma, PrismaClient } from '@prisma/client'
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'
import { appRouter } from './trpc'

const prisma = new PrismaClient()
const app = express()

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
      router: appRouter,
      // createContext,
  }),
); 

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
