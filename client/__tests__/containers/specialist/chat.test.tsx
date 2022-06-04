import * as React from 'react'

import {
  MessageAddedDocument,
  MessagesForChatDocument,
  Role,
} from '/__generated__/types'
import {
  content,
  email,
  from,
  id,
  message,
  name,
  text,
  to,
  uuid,
} from '/mocks/constants'
import {removeUserKey, setUserKey} from '@/utils/storage'
import {render, screen, waitForElementToBeRemoved} from 'test-utils'

import {GraphQLError} from 'graphql'
import {MockedProvider} from '@apollo/client/testing'
import SpecialistChat from '@/containers/specialist/chat'

const request = {
  query: MessagesForChatDocument,
  variables: {from, to},
}
const mocks = [
  {
    request,
    result: {
      data: {
        messagesForChat: [
          {
            id: uuid,
            from: to,
            to: from,
            content: text,
          },
        ],
      },
    },
  },
  {
    request: {query: MessageAddedDocument},
    result: {
      data: {
        messageAdded: {
          id,
          from,
          to,
          content,
        },
      },
    },
  },
]
const error = {
  request,
  error: new Error(message),
}
const errors = {
  request,
  result: {errors: [new GraphQLError(message)]},
}
const user = {
  id: from,
  email,
  name,
  role: Role.User,
}
beforeAll(() => {
  const scrollIntoView = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView
})
beforeEach(() => {
  setUserKey(JSON.stringify(user))
})
afterEach(() => {
  removeUserKey()
})

it('renders a loading state', async () => {
  render(
    <MockedProvider addTypename={false}>
      <SpecialistChat id={to} />
    </MockedProvider>
  )
  expect(screen.getByTestId('spinner')).toBeInTheDocument()
})
it('renders the messages for chat', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SpecialistChat id={to} />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByText(content)).toBeInTheDocument()
})
it('renders a network error message', async () => {
  render(
    <MockedProvider mocks={[error]} addTypename={false}>
      <SpecialistChat id={to} />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByTestId('error')).toHaveTextContent(message)
})
it('renders a graphql error message', async () => {
  render(
    <MockedProvider mocks={[errors]} addTypename={false}>
      <SpecialistChat id={to} />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByTestId('error')).toHaveTextContent(message)
})
