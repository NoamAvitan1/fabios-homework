import { publicProcedure, router } from './trpc';
import {z} from 'zod'
import { prisma } from '../prisma';
export const ZodUser = z.object({
  date: z.string(), 
  time: z.string(), 
  notes: z.string().optional(),
  branch: z.string(),
  branch_id: z.number(),
  recurrence: z.number(),
  customer: z.string(),
  customer_id: z.number(),
  num_of_guests: z.number().optional(),
  source: z.string(),
  status: z.string(),
});

export type UserSchemaType = z.infer<typeof ZodUser>;

export const appRouter = router({
  userList: publicProcedure.input(z.string()).query(async (opts) => {
    let users;
    if (opts.input) {
        users = await prisma.user.findMany({
            where: {
                customer: {
                    contains: opts.input,
                },
            },
        });
    } else {
        users = await prisma.user.findMany();
    }
    return users;
  }),
  addUser: publicProcedure.input(ZodUser).mutation(async (opts) => {
    const newUser = await prisma.user.create({
    data: opts.input    
    })
    return newUser;
  })
});

export type AppRouter = typeof appRouter;