import * as React from 'react'

import {MessagesForChatDocument, Role} from '/__generated__/types'
import {content, email, from, id, message, name, to} from '/mocks/constants'
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
            id,
            from,
            to,
            content,
          },
        ],
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
  setUserKey(JSON.stringify(user))
})
afterAll(() => {
  removeUserKey()
})

it('renders a loading state', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
