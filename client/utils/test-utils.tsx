import * as React from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import {RenderOptions, RenderResult, render} from '@testing-library/react'

import { AuthProvider } from '@/services/auth/context'

const AllTheProviders: React.FC = ({ children }) => {
  const client = new ApolloClient({cache: new InMemoryCache()})
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
