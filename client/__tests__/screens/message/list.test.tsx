import * as React from 'react'

import {MessagesList, MessagesListProps} from '@/screens/message/list'
import {content, from, id, to} from '/mocks/constants'

import {Message} from '/__generated__/types'
import {render} from 'test-utils'

beforeAll(() => {
  const scrollIntoView = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView
})
beforeEach(async () => {
  render(<MessagesList {...props} />)
})
const message: Message = {content, from, id, to}

const messages: Message[] = new Array(1).fill(message)
const subscribeToMessages = jest.fn()

const props = {
  messages,
  subscribeToMessages,
} as MessagesListProps

it('subscribes to messages as soon as the page loads', () => {
  expect(subscribeToMessages).toHaveBeenCalledTimes(1)
})
