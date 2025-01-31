import { z } from 'zod'
import { Role } from '@prisma/client'

const ROLES = Object.values(Role)

export const updateUserSchema = {
  body: z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.nativeEnum(Role),
  }),
  response: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.enum(ROLES as [string, ...string[]]),
    }),
  },
}

export const getUsersSchema = {
  response: {
    200: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
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
      email: z.string(),
      role: z.enum(ROLES as [string, ...string[]]),
    }),
  },
}

export const getUserByEmailSchema = {
  params: z.object({
    email: z.string().email(),
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

export type UpdateUserInput = z.infer<typeof updateUserSchema.body>
export type User = z.infer<(typeof getUserByIdSchema.response)[200]>
