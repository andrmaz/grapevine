import * as React from 'react'

import {bs, city, id, message, name} from '/mocks/constants'
import {render, screen, waitForElementToBeRemoved} from 'test-utils'

import {GetSpecialistsDocument} from '/__generated__/types'
import {GraphQLError} from 'graphql'
import {MockedProvider} from '@apollo/client/testing'
import {SpecialistList} from '@/containers/specialist/list'

const request = {
  query: GetSpecialistsDocument,
  variables: {},
}
const mocks = [
  {
    request,
    result: {
      data: {
        specialistsForDashboard: [
          {
            id,
            name,
            address: {
              city,
            },
            company: {
              bs,
            },
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

it('renders a loading state', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SpecialistList />
    </MockedProvider>
  )
  expect(screen.getByTestId('spinner')).toBeInTheDocument()
})
it('renders a list of specialists', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SpecialistList />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByText(name)).toBeInTheDocument()
})
it('renders a network error message', async () => {
  render(
    <MockedProvider mocks={[error]} addTypename={false}>
      <SpecialistList />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByTestId('error')).toHaveTextContent(message)
})
it('renders a graphql error message', async () => {
  render(
    <MockedProvider mocks={[errors]} addTypename={false}>
      <SpecialistList />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByTestId('error')).toHaveTextContent(message)
})
