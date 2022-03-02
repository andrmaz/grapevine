import {AuthenticationError} from 'apollo-server'
import { User } from 'src/generated/graphql'
import jwt from 'jsonwebtoken'

function getUser(token: string): {user: string | jwt.JwtPayload} {
  try {
    const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET as string)
    return {user: decoded}
  } catch (error) {
    throw new AuthenticationError('')
  }
}

function getRole(token: string): {hasRole: (role: string) => boolean} {
  const roles = ['USER', 'CREATOR', 'ADMIN']
  return {
    hasRole: (role: string) => {
      const tokenIndex = roles.indexOf(token)
      const roleIndex = roles.indexOf(role)
      return roleIndex >= 0 && tokenIndex >= roleIndex
    },
  }
}

function createToken(user: User): string {
  // Sign the JWT
  if (!user.role) {
    throw new Error('No user role specified')
  }
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      iss: 'api.grapevine',
      aud: 'api.grapevine',
    },
    process.env.JWT_SECRET as string,
    {algorithm: 'HS256', expiresIn: '1h'}
  )
}

export {getUser, getRole, createToken}
