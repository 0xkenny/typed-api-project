import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth.controller'
import { createUserSchema, loginUserSchema } from '../schemas/auth.schema'
import { AuthService } from '../services/auth.service'

export async function authRoutes(app: FastifyInstance) {
  const authService = new AuthService(app)
  const authController = new AuthController(authService)

  app.post('/login', {
    schema: {
      tags: ['Auth'],
      ...loginUserSchema,
    },
    handler: authController.login,
  })

  app.post('/register', {
    schema: {
      tags: ['Auth'],
      ...createUserSchema,
    },
    handler: authController.register,
  })
}
