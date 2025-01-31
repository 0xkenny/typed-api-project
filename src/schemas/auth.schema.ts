import { Role } from '@prisma/client'
import { z } from 'zod'

export const createUserSchema = {
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email(),
    password: z.string().min(4),
  }),
  response: {
    201: z.object({
      token: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string().nullable(),
        email: z.string(),
        role: z.nativeEnum(Role).default(Role.USER),
      }),
    }),
  },
}

export const loginUserSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4),
  }),
  response: {
    201: z.object({
      token: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string().nullable(),
        email: z.string(),
        role: z.nativeEnum(Role).default(Role.USER),
      }),
    }),
  },
}

export type CreateUserInput = z.infer<typeof createUserSchema.body>
export type LoginUserInput = z.infer<typeof loginUserSchema.body>
