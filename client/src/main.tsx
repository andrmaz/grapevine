import './index.css'

import * as React from 'react'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'

import App from './app'
import {AuthProvider} from '@/services/auth/context'
import ReactDOM from 'react-dom'
import {ThemeProvider} from '@emotion/react'
import { errorLink } from './utils/errors'
import {setContext} from '@apollo/client/link/context'
import {theme} from '@/themes'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL as string,
})

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
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
