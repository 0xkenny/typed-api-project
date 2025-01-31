import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../services/user.service'
import { UpdateUserInput } from '../schemas/user.schema'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await this.userService.getAllUsers()
      return reply.send(users)
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }

  getUserById = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await this.userService.getUserById(request.params.id)
      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }
      return reply.send(user)
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }

  getUserByEmail = async (
    request: FastifyRequest<{ Params: { email: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await this.userService.getUserByEmail(request.params.email)
      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }
      return reply.send(user)
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }

  updateUser = async (
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserInput }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await this.userService.updateUser(
        request.params.id,
        request.body
      )
      return reply.status(201).send(user)
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }

  deleteUser = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await this.userService.deleteUser(request.params.id)
      return reply.status(201).send(user)
    } catch (error) {
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }
}
