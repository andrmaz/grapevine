import {AuthenticationError} from 'apollo-server'
import {User} from 'src/generated/graphql'
import jwt from 'jsonwebtoken'

function getUser(token: string): string | jwt.JwtPayload {
  try {
    return jwt.verify(token.slice(7), process.env.JWT_SECRET as string)
  } catch (error) {
    throw new AuthenticationError('Not authorized')
  }
}

function getRole(user: User): {hasRole: (roles: string[]) => boolean} {
  return {
    hasRole: (roles: string[]) => roles.includes(user.role),
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
    },
    process.env.JWT_SECRET as string,
    {algorithm: 'HS256', expiresIn: '1h'}
  )
}

export {getUser, getRole, createToken}
