import { prisma } from '../lib/prisma'
import { UpdateUserInput } from '../schemas/user.schema'

export class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany()
    return users
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    return user
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return user
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
      },
    })
    return user
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    if (user) {
      const deleteUser = prisma.user.delete({
        where: {
          id: id,
        },
      })
      return deleteUser
    }
  }
}
