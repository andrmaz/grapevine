import * as React from 'react'

import {render, screen} from 'test-utils'

import Register from '@/pages/register'
import faker from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  render(<Register />)
})
const email = faker.internet.email()
const name = faker.name.firstName()
const city = faker.address.city()

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
it('does not submit the form with an empty email', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /name/i}), name)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).not.toHaveBeenCalled()
})
it('does not submit the form with an empty name', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).not.toHaveBeenCalled()
})
it.todo('does not submit the form with a wrong email')
it('submits the form with both email and name values', async () => {
  const onSubmit = jest.fn()
  screen.getByTestId('form').onsubmit = onSubmit
  await userEvent.type(screen.getByRole('textbox', {name: /email/i}), email)
  await userEvent.type(screen.getByRole('textbox', {name: /name/i}), name)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  expect(onSubmit).toHaveBeenCalledTimes(1)
})
