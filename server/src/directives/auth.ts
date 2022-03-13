import {GraphQLSchema, defaultFieldResolver} from 'graphql'
import {MapperKind, getDirective, mapSchema} from '@graphql-tools/utils'

import {AuthenticationError} from 'apollo-server'
import { User } from 'src/generated/graphql'

export default function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
  getUserFn: (user: User) => {hasRole: (roles: string[]) => boolean}
): GraphQLSchema {
  const typeDirectiveArgumentMaps: Record<string, any> = {}
  return mapSchema(schema, {
    [MapperKind.TYPE]: type => {
      const authDirective = getDirective(schema, type, directiveName)?.[0]
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective
      }
      return undefined
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName]
      if (authDirective) {
        const {requires} = authDirective
        if (requires) {
          const {resolve = defaultFieldResolver} = fieldConfig
          fieldConfig.resolve = function (source, args, context, info) {
            const user = getUserFn(context.user)
            if (!user.hasRole(requires)) {
              throw new AuthenticationError('Not authorized')
            }
            return resolve(source, args, context, info)
          }
          return fieldConfig
        }
      }
    },
  })
}
