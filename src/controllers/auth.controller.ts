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
      reply.setCookie('access_token', result.accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
      })
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
      reply.setCookie('access_token', result.accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
      })
      return reply.status(201).send(result)
    } catch (error) {
      if (error === 'User already exists') {
        return reply.status(400).send({ error: 'User already exists' })
      }
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }

  logout = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await this.authService.logout()
      if (result.clearCookie) {
        reply.clearCookie('access_token', { path: '/' })
      }
      return reply.send(result)
    } catch (error) {
      return reply.status(400).send({ error: error })
    }
  }
}
