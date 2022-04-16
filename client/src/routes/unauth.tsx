import * as React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

import {Spinner} from '@/components/loaders/spinner'

const Login = React.lazy(() => import('@/pages/login'))
const Register = React.lazy(() => import('@/pages/register'))

export default function UnauthRoutes(): JSX.Element {
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      <Switch>
        <Route path='/signup' component={Register} />
        <Route path='/signin' component={Login} />
        <Redirect to='/signin' />
      </Switch>
    </React.Suspense>
  )
}
