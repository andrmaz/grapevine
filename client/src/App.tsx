import * as React from 'react'

import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom'

import styled from '@emotion/styled'

const Title = styled.h2<{primary?: boolean}>`
  color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
`

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home(): JSX.Element {
  return <Title primary>Home</Title>
}

function About(): JSX.Element {
  return <h2>About</h2>
}

function Users(): JSX.Element {
  return <h2>Users</h2>
}
