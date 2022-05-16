import * as React from 'react'

import {render, screen} from 'test-utils'

import {AuthHeader} from '@/components/header/auth'
import {MockedProvider} from '@apollo/client/testing'

beforeEach(() => {
  render(
    <MockedProvider>
      <AuthHeader />
    </MockedProvider>
  )
})
it('renders a navigation header', () => {
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})
it('expects a sign out link to be present', () => {
  expect(screen.getByRole('link', {name: /sign out/i})).toBeInTheDocument()
})
it('expects a dashboard link to be present', () => {
  expect(screen.getByRole('link', {name: /dashboard/i})).toBeInTheDocument()
})
