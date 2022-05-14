import * as React from 'react'

import {render, screen} from 'test-utils'

import Login from '@/pages/login'
import faker from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  render(<Login />)
})
const email = faker.internet.email()

it('expects an email input to be present', () => {
  expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument()
})
it('expects a submit button to be present', () => {
  expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument()
})
it('accepts an email input value', async () => {
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  expect(screen.getByRole('textbox', {name: /email/i})).toHaveValue(email)
})
it('does not submit the form with an empty email', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).not.toHaveBeenCalled()
})
it.todo('does not submit the form with a wrong email')
it('submits the form with a correct email', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).toHaveBeenCalledTimes(1)
})
