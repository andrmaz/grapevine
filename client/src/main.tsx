import './index.css'

import * as React from 'react'

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import App from './App'
import ReactDOM from 'react-dom'
import {ThemeProvider} from '@emotion/react'
import {theme} from '@/styles/theme'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
