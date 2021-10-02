import * as React from 'react'

import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import {gql, useQuery} from '@apollo/client'

import {Query} from './__generated__/Query'
import QueryResult from './lib/results/query-result'
import styled from '@emotion/styled'

const SPECIALISTS = gql`
  query Query {
    specialistsForDashboard {
      id
      name
      email
      company
      industry
    }
  }
`

const Title = styled.h3<{primary?: boolean}>`
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
  const {loading, error, data} = useQuery<Query>(SPECIALISTS)
  return (
    <ul>
      <QueryResult loading={loading} error={error} data={data}>
        {data?.specialistsForDashboard.map(specialist => (
          <li key={specialist.id}>{specialist.name}</li>
        ))}
      </QueryResult>
    </ul>
  )
}

function About(): JSX.Element {
  return <Title>About</Title>
}

function Users(): JSX.Element {
  return <h2>Users</h2>
}
