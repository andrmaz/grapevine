import * as React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

import About from '@/pages/about'
import Dashboard from '@/pages/dashboard'

export default function AuthRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/' exact>
        <Dashboard />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}
