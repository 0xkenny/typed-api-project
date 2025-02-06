import { FastifyInstance } from 'fastify'
import { CreateUserInput, LoginUserInput } from '../schemas/auth.schema'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

export class AuthService {
  constructor(private app: FastifyInstance) {}

  async login(data: LoginUserInput) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!user) {
      throw new Error('Invalid credentials!')
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password)

    if (!isValidPassword) {
      throw new Error('Invalid credentials!')
    }

    const token = this.app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return { accessToken: token }
  }

  async register(data: CreateUserInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) {
      throw new Error('User already exists!')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    const token = this.app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return { accessToken: token }
  }

  async logout() {
    //Idk if this is a good way to do
    return {
      clearCookie: true,
      message: 'Logged out!',
    }
  }
}
