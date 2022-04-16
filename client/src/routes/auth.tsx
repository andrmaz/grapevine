import * as React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

import {Spinner} from '@/components/loaders/spinner'

const About = React.lazy(() => import('@/pages/about'))
const Dashboard = React.lazy(() => import('@/pages/dashboard'))

export default function AuthRoutes(): JSX.Element {
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      <Switch>
        <Route path='/about/:id' component={About} />
        <Route exact path='/' component={Dashboard} />
        <Redirect to='/' />
      </Switch>
    </React.Suspense>
  )
}
