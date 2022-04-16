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
it('renders a navigation header', () => {
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})
it('expect a sign out link to be present', () => {
  expect(screen.getByRole('link', {name: /sign out/i})).toBeInTheDocument()
})
it('expect a dashboard link to be present', () => {
  expect(screen.getByRole('link', {name: /dashboard/i})).toBeInTheDocument()
})
