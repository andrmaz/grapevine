import * as React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

export default function UnauthRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path='/signin'>
        {/* <SignIn /> */}
        <h3>SignIn / SignUp</h3>
      </Route>
      <Redirect to='/signin' />
    </Switch>
  )
}
