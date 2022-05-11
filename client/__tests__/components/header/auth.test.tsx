import * as React from 'react'

import {render, screen} from 'test-utils'

import {AuthHeader} from '@/components/header/auth'
import {BrowserRouter as Router} from 'react-router-dom'

beforeEach(() => {
  render(
    <Router>
      <AuthHeader />
    </Router>
  )
})
it('expect a navigation to be present', () => {
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})
it('expect a dashboard link to be present', () => {
  expect(screen.getByRole('link', {name: /dashboard/i})).toBeInTheDocument()
})
it('expect a logout link to be present', () => {
  expect(screen.getByRole('link', {name: /sign out/i})).toBeInTheDocument()
})
