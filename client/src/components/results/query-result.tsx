import * as React from 'react'

import {ApolloError} from '@apollo/client'
import {Spinner} from '../loaders/spinner'

export interface QueryResultProps<T> {
  loading: boolean
  error?: ApolloError
  data: T
  children: React.ReactNode
}

export function QueryResult<P>({
  loading,
  error,
  data,
  children,
}: QueryResultProps<P>): JSX.Element {
  if (error) {
    return <p data-testid='error'>ERROR: {error.message}</p>
  }
  if (loading) {
    return <Spinner size='large' />
  }
  if (!data) {
    return <p data-testid='info'>Nothing to show...</p>
  }
  return children as JSX.Element
}
