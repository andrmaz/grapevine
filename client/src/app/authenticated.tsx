import * as React from 'react'

import AuthRoutes from '@/routes/auth'
import Header from '@/lib/headers'
import {BrowserRouter as Router} from 'react-router-dom'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const Container = styled.div`
  height: 100%;
  width: 100%;
  ${theme.mode.dark} {
    background-color: var(--color-gray-80);
  }
`

export default function AuthenticatedApp(): JSX.Element {
  return (
    <Router>
      <Container>
        <Header />
        <AuthRoutes />
      </Container>
    </Router>
  )
}
