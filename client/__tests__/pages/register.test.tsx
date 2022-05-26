import * as React from 'react'

import {
  CustomerInput,
  RegisterCustomerDocument,
  Role,
} from '/__generated__/types'
import {
  city,
  email,
  expiresAt,
  id,
  message,
  name,
  token,
} from '/mocks/constants'
import {render, screen} from 'test-utils'

import {MockedProvider} from '@apollo/client/testing'
import Register from '@/pages/register'
import userEvent from '@testing-library/user-event'

const input = {email, name, address: {city}} as CustomerInput
const request = {
  query: RegisterCustomerDocument,
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
      data: {
        registerCustomer: {
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
      <Register />
    </MockedProvider>
  )
})

it('expects an email input to be present', () => {
  expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument()
})
it('expects a name input to be present', () => {
  expect(screen.getByRole('textbox', {name: /name/i})).toBeInTheDocument()
})
it('expects a city input to be present', () => {
  expect(screen.getByRole('textbox', {name: /city/i})).toBeInTheDocument()
})
it('expects a submit button to be present', () => {
  expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument()
})
it('accepts an email input value', async () => {
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  expect(screen.getByRole('textbox', {name: /email/i})).toHaveValue(email)
})
it('accepts a name input value', async () => {
  await userEvent.type(screen.getByRole('textbox', {name: /name/i}), name)
  expect(screen.getByRole('textbox', {name: /name/i})).toHaveValue(name)
})
it('accepts a city input value', async () => {
  await userEvent.type(screen.getByRole('textbox', {name: /city/i}), city)
  expect(screen.getByRole('textbox', {name: /city/i})).toHaveValue(city)
})
it('does not submit the form with an empty email and city', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /name/i}), name)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).not.toHaveBeenCalled()
})
it('does not submit the form with empty name and city', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).not.toHaveBeenCalled()
})
it('does not submit the form with empty name and email', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /city/i}), city)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).not.toHaveBeenCalled()
})
it.todo('does not submit the form with a wrong email')
it('submits the form with email, name and city values', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  await userEvent.type(screen.getByRole('textbox', {name: /name/i}), name)
  await userEvent.type(screen.getByRole('textbox', {name: /city/i}), city)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).toHaveBeenCalledTimes(1)
})
