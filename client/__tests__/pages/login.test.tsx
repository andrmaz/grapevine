import * as React from 'react'

import {render, screen} from 'test-utils'

import Login from '@/pages/login'

beforeEach(() => {
  render(<Login />)
})
it('expect a name input to be present', () => {
  expect(screen.getByRole('textbox', {name: /name/i})).toBeInTheDocument()
})
it('expect a email input to be present', () => {
  expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument()
})
