import * as React from 'react'

import {AuthorizeCustomerDocument, Role, UserInput} from '/__generated__/types'
import {email, expiresAt, id, message, name, token} from '/mocks/constants'
import {render, screen} from 'test-utils'

import Login from '@/pages/login'
import {MockedProvider} from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'

const input = {email} as UserInput
const request = {
  query: AuthorizeCustomerDocument,
  variables: {input},
}
const userInfo = {
  name,
  id,
  email,
  role: Role.User,
}
const mocks = [
  {
    request,
    result: {
      authorizeCustomer: jest.fn(),
      data: {
        authorizeCustomer: {
          code: 200,
          success: true,
          message,
          user: {
            userInfo,
            token,
            expiresAt,
          },
        },
      },
    },
  },
]
beforeEach(() => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Login />
    </MockedProvider>
  )
})

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
