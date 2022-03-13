import * as React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import UnauthRoutes from '@/routes/unauth'
import Header from '@/lib/headers/unauth'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export default function UnauthenticatedApp(): JSX.Element {
  return (
    <Router>
      <Container>
        <Header />
        <UnauthRoutes />
      </Container>
    </Router>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  ${theme.mode.dark} {
    background-color: var(--color-gray-80);
  }
`
