import { publicProcedure, router } from './trpc';
import {z} from 'zod'
import { prisma } from '../prisma';
export const ZodUser = z.object({
  date: z.string(), 
  time: z.string(), 
  branch: z.string(),
  customer: z.string(),
});

export const ZodUserUpdate = z.object({
  id: z.string(),
  date: z.string(), 
  time: z.string(), 
  branch: z.string(),
  customer: z.string(),
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
  }),
  deleteUser: publicProcedure.input(z.string()).mutation(async(opts) =>{
    const deleteUser = await prisma.user.delete({
      where:{
        id: opts.input
      }
    })
    return deleteUser;
  }),
  updateUser:publicProcedure.input(ZodUserUpdate).mutation(async(opts) => {
    const updateUser = await prisma.user.update({
      where:{
        id : opts.input.id,
      },
      data:{
        customer: opts.input.customer,
        date: opts.input.date,
        time: opts.input.time,
        branch: opts.input.branch,
      }
    })
    return updateUser;
  }),
});

export type AppRouter = typeof appRouter;