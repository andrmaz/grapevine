import * as React from 'react'

import {QueryResult, QueryResultProps} from '@/components/results/query-result'
import {render, screen} from 'test-utils'

import {ApolloError} from '@apollo/client'
import faker from '@faker-js/faker'

const data = faker.lorem.word()
const children = <div data-testid='child' />
const props = {
  loading: false,
  error: undefined,
  data,
  children,
} as QueryResultProps<string>

it('renders a loader', () => {
  render(<QueryResult {...props} loading={true} />)
  expect(screen.getByTestId('spinner')).toBeInTheDocument()
  expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  expect(screen.queryByTestId('info')).not.toBeInTheDocument()
  expect(screen.queryByTestId('child')).not.toBeInTheDocument()
})
it('renders some data', () => {
  render(<QueryResult {...props} />)
  expect(screen.getByTestId('child')).toBeInTheDocument()
  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  expect(screen.queryByTestId('info')).not.toBeInTheDocument()
})
it('does not render some data', () => {
  render(<QueryResult {...props} data={null} />)
  expect(screen.getByTestId('info').textContent).toMatchInlineSnapshot(
    `"Nothing to show..."`
  )
  expect(screen.queryByTestId('child')).not.toBeInTheDocument()
  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  expect(screen.queryByTestId('error')).not.toBeInTheDocument()
})
it('renders an error message', () => {
  const message = faker.lorem.sentence()
  const error = {message} as ApolloError
  render(<QueryResult {...props} error={error} />)
  expect(screen.getByTestId('error')).toHaveTextContent(message)
  expect(screen.queryByTestId('child')).not.toBeInTheDocument()
  expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  expect(screen.queryByTestId('info')).not.toBeInTheDocument()
})
