import 'mapbox-gl/dist/mapbox-gl.css'
import './index.css'

import * as React from 'react'

import {API_URL, WS_URL} from './helpers/constants'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from '@apollo/client'

import App from './app'
import {AuthProvider} from '@/services/auth/context'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import ReactDOM from 'react-dom'
import {ThemeProvider} from '@emotion/react'
import {createClient} from 'graphql-ws'
import {errorLink} from '@/utils/errors'
import {getMainDefinition} from '@apollo/client/utilities'
import {getTokenKey} from '@/utils/storage'
import {setContext} from '@apollo/client/link/context'
import {theme} from '@/themes'

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
  })
)
const httpLink = createHttpLink({
  uri: API_URL,
})

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = getTokenKey()
  // return the headers to the context so splitLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
