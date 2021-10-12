import * as React from 'react'

import {ApolloError} from '@apollo/client'
import Spinner from '../loaders/spinner'

interface QueryResultProps<T> {
  loading: boolean
  error?: ApolloError
  data: T
  children: React.ReactNode
}

export default function QueryResult<P>({
  loading,
  error,
  data,
  children,
}: QueryResultProps<P>): JSX.Element {
  if (error) {
    return <p>ERROR: {error.message}</p>
  }
  if (loading) {
    return <Spinner />
  }
  if (!data) {
    return <p>Nothing to show...</p>
  }
  return children as JSX.Element
}
