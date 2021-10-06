import * as React from 'react'

import {Link, BrowserRouter as Router} from 'react-router-dom'

import AuthRoutes from '@/routes/auth'

export default function AuthenticatedApp(): JSX.Element {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </nav>
        <AuthRoutes />
      </div>
    </Router>
  )
}
