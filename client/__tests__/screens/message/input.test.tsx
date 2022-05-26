import * as React from 'react'

import {
  CreateMessageDocument,
  MessageInput as Input,
  Role,
} from '/__generated__/types'
import {content, email, from, message, name, to} from '/mocks/constants'
import {removeUserKey, setUserKey} from '@/utils/storage'
import {render, screen} from 'test-utils'

import {MessageInput} from '@/screens/message/input'
import {MockedProvider} from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'

const input = {from, to, content} as Input
const request = {
  query: CreateMessageDocument,
  variables: {input},
}
const mocks = [
  {
    request,
    result: {
      data: {
        createMessage: {
          code: 200,
          success: true,
          message,
          output: input,
        },
      },
    },
  },
]

const user = {
  id: from,
  email,
  name,
  role: Role.User,
}
beforeAll(() => {
  setUserKey(JSON.stringify(user))
})
afterAll(() => {
  removeUserKey()
})
beforeEach(() => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MessageInput id={to} />
    </MockedProvider>
  )
})

it('expects a text input to be present', () => {
  expect(screen.getByRole('textbox', {name: /message/i})).toBeInTheDocument()
})
it('expects a send button to be present', () => {
  expect(screen.getByRole('button', {name: /send/i})).toBeInTheDocument()
})
it('accepts a text input value', async () => {
  await userEvent.type(screen.getByRole('textbox', {name: /message/i}), content)
  expect(screen.getByRole('textbox', {name: /message/i})).toHaveValue(content)
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
  await userEvent.type(screen.getByRole('textbox', {name: /message/i}), content)
  await userEvent.click(screen.getByRole('button', {name: /send/i}))
  expect(onClick).toHaveBeenCalled()
})
