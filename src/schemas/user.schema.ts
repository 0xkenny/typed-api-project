import { z } from 'zod'
import { Role } from '@prisma/client'
// Import the Role enum from Prisma
const ROLES = Object.values(Role)

export const createUserSchema = {
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email(),
  }),
  response: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      role: z.nativeEnum(Role).default(Role.USER),
    }),
  },
}

export const updateUserSchema = {
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(Role),
  }),
  response: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
    }),
  },
}

export const getUsersSchema = {
  response: {
    200: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        role: z.enum(ROLES as [string, ...string[]]),
      })
    ),
  },
}

export const getUserByIdSchema = {
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      role: z.enum(ROLES as [string, ...string[]]),
    }),
  },
}

export const roleSchema = z.enum(ROLES as [string, ...string[]])

export type CreateUserInput = z.infer<typeof createUserSchema.body>
export type UpdateUserInput = z.infer<typeof updateUserSchema.body>
export type User = z.infer<(typeof getUserByIdSchema.response)[200]>
