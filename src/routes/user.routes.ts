import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/user.controller'
import {
  createUserSchema,
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
  app.get('/users/get/:id', {
    schema: { tags: ['Users'], ...getUserByIdSchema },
    handler: userController.getUserById,
  })

  app.post('/users', {
    schema: { tags: ['Users'], ...createUserSchema },
    handler: userController.createUser,
  })

  app.put('/users/update/:id', {
    schema: { tags: ['Users'], ...updateUserSchema },
    handler: userController.updateUser,
  })

  app.delete(
    '/users/delete/:id',
    {
      schema: {
        tags: ['Users'],
      },
    },
    userController.deleteUser
  )
}
