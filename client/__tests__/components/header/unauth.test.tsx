import {} from '@testing-library/user-event'

import * as React from 'react'

import {render, screen} from 'test-utils'

import {BrowserRouter as Router} from 'react-router-dom'
import {UnauthHeader} from '@/components/header/unauth'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  render(
    <Router>
      <UnauthHeader />
    </Router>
  )
})
it('expect a navigation to be present', () => {
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})
it('expect a login link to be present', () => {
  expect(
    screen.queryByRole('link', {name: /register/i})
  ).not.toBeInTheDocument()
  expect(screen.getByRole('link', {name: /login/i})).toBeInTheDocument()
})
it('renders a register link', async () => {
  await userEvent.click(screen.getByRole('link', {name: /login/i}))
  expect(screen.getByRole('link', {name: /register/i})).toBeInTheDocument()
  expect(screen.queryByRole('link', {name: /login/i})).not.toBeInTheDocument()
})
