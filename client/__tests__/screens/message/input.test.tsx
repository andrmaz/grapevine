import * as React from 'react'

import {render, screen} from 'test-utils'

import {MessageInput} from '@/screens/message/input'
import faker from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
    render(<MessageInput id={id} />)
})
const id = faker.datatype.uuid()
const text = faker.lorem.words()

it('expects a text input to be present', () => {
  expect(screen.getByRole('textbox', {name: /message/i})).toBeInTheDocument()
})
it('expects a send button to be present', () => {
  expect(screen.getByRole('button', {name: /send/i})).toBeInTheDocument()
})
it('accepts a text input value', async () => {
  await userEvent.type(screen.getByRole('textbox', {name: /message/i}), text)
  expect(screen.getByRole('textbox', {name: /message/i})).toHaveValue(text)
})
it('does not send a message with an empty text', async () => {
  const onClick = jest.fn()
  screen.getByRole('button', {name: /send/i}).onclick = onClick
  await userEvent.click(screen.getByRole('button', {name: /send/i}))
  expect(onClick).not.toHaveBeenCalled()
})
it('sends a message with a non empty text', async () => {
  const onClick = jest.fn()
  screen.getByRole('button', {name: /send/i}).onclick = onClick
  await userEvent.type(screen.getByRole('textbox', {name: /message/i}), text)
  await userEvent.click(screen.getByRole('button', {name: /send/i}))
  expect(onClick).toHaveBeenCalled()
})
