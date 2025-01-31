import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth.service'
import { CreateUserInput, LoginUserInput } from '../schemas/auth.schema'

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (
    request: FastifyRequest<{ Body: LoginUserInput }>,
    reply: FastifyReply
  ) => {
    try {
      const result = await this.authService.login(request.body)
      return reply.send(result)
    } catch (error) {
      if (error === 'Invalid credentials') {
        return reply.status(401).send({ error: 'Invalid credentials' })
      }
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }

  register = async (
    request: FastifyRequest<{
      Body: CreateUserInput
    }>,
    reply: FastifyReply
  ) => {
    try {
      const result = await this.authService.register(request.body)
      return reply.status(201).send(result)
    } catch (error) {
      console.log(error)
      if (error === 'User already exists') {
        return reply.status(400).send({ error: 'User already exists' })
      }
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }
}
