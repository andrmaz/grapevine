import Spinner from '@/lib/loaders/spinner'
import * as React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

const About = React.lazy(() => import('@/pages/about'))
const Dashboard = React.lazy(() => import('@/pages/dashboard'))

export default function AuthRoutes(): JSX.Element {
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      <Switch>
        <Route path='/about/:id'>
          <About />
        </Route>
        <Route path='/' exact>
          <Dashboard />
        </Route>
        <Redirect to='/' />
      </Switch>
    </React.Suspense>
  )
}
