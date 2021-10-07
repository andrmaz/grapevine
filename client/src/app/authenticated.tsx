import * as React from 'react'

import AuthRoutes from '@/routes/auth'
import Header from '@/lib/headers'
import {BrowserRouter as Router} from 'react-router-dom'
import styled from '@emotion/styled'

const Container = styled.div`
  height: 100vh;
  width: 100%;
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
