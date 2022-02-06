import './index.css'

import * as React from 'react'

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import App from './app'
import {AuthProvider} from '@/services/auth/context'
import ReactDOM from 'react-dom'
import {ThemeProvider} from '@emotion/react'
import {theme} from '@/themes'

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL as string,
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
