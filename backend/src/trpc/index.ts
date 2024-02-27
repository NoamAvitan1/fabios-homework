import { publicProcedure, router } from './trpc';
import {z} from 'zod'
import { prisma } from '../prisma';
export const ZodUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),  
});

export type UserSchemaType = z.infer<typeof ZodUserSchema>;

export const appRouter = router({
  user: publicProcedure.query(async (opts) => {
    
    const users = await prisma.user.findMany()
    console.log(users)
    return users;
  }),
  test: publicProcedure.query(() =>'d')
});

export type AppRouter = typeof appRouter;