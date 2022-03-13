import * as React from 'react'

import {AuthHeader} from '@/lib/headers/auth'
import AuthRoutes from '@/routes/auth'
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
        <AuthHeader />
        <AuthRoutes />
      </Container>
    </Router>
  )
}
