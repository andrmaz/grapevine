import * as React from 'react'

import {Message} from '/__generated__/types'
import {MessagesList} from '@/screens/message/list'
import faker from '@faker-js/faker'
import {render} from 'test-utils'

beforeAll(() => {
  const scrollIntoView = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView
})
beforeEach(async () => {
  render(<MessagesList {...props} />)
})
const content = faker.lorem.sentence()
const from = faker.datatype.uuid()
const id = faker.datatype.uuid()
const to = faker.datatype.uuid()
const message: Message = {content, from, id, to}

const length = faker.datatype.number(1)
const messages: Message[] = new Array(length).fill(message)
const subscribeToMessages = jest.fn()

const props = {
  messages,
  subscribeToMessages,
}

it('subscribes to messages as soon as the page loads', () => {
  expect(subscribeToMessages).toHaveBeenCalledTimes(1)
})
