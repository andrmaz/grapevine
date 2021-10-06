import * as React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

export default function AuthRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path='/about'>
        {/* <About /> */}
        <h3>About</h3>
      </Route>
      <Route path='/' exact>
        {/* <Dashboard /> */}
        <h3>Dashboard</h3>
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}
