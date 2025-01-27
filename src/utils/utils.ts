import { Role } from '@prisma/client'

export const ROLES = Object.values(Role)

export const hasPermission = (userRole: Role, requiredRole: Role): boolean => {
  const roleHierarchy = {
    [Role.ADMIN]: 2,
    [Role.USER]: 1,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const isAdmin = (role: Role): boolean => role === Role.ADMIN
