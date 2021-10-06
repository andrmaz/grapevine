import * as React from 'react'

import {BrowserRouter as Router} from 'react-router-dom'
import UnauthRoutes from '@/routes/unauth'

export default function UnauthenticatedApp(): JSX.Element {
  return (
    <Router>
      <UnauthRoutes />
    </Router>
  )
}
