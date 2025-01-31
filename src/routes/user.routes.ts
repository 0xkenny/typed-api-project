import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/user.controller'
import {
  getUserByIdSchema,
  getUsersSchema,
  updateUserSchema,
} from '../schemas/user.schema'

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController()

  app.get('/users', {
    schema: { tags: ['Users'], ...getUsersSchema },
    handler: userController.getAllUsers,
  })
  app.get('/users/id/:id', {
    schema: { tags: ['Users'], ...getUserByIdSchema },
    handler: userController.getUserById,
  })

  app.get('/users/email/:email', {
    schema: { tags: ['Users'], ...getUserByIdSchema },
    handler: userController.getUserByEmail,
  })

  app.put('/users/:id', {
    schema: { tags: ['Users'], ...updateUserSchema },
    handler: userController.updateUser,
  })

  app.delete(
    '/users/:id',
    {
      schema: {
        tags: ['Users'],
      },
    },
    userController.deleteUser
  )
}
