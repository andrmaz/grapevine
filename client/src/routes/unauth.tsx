import * as React from 'react'

import Register from '@/pages/register'
import Login from '@/pages/login'
import Spinner from '@/lib/loaders/spinner'

import {Redirect, Route, Switch} from 'react-router-dom'

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
