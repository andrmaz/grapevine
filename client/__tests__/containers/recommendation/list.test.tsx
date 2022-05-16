import * as React from 'react'

import {render, screen, waitForElementToBeRemoved} from 'test-utils'

import {GraphQLError} from 'graphql'
import {MockedProvider} from '@apollo/client/testing'
import {RecommendationList} from '@/containers/recommendation/list'
import {RecommendationsForDashboardDocument} from '/__generated__/types'
import faker from '@faker-js/faker'

const id = faker.datatype.uuid()
const name = faker.name.firstName()
const message = faker.lorem.sentence()
const request = {
  query: RecommendationsForDashboardDocument,
  variables: {},
}
const data = {
  request,
  result: {
    data: {
      recommendationsForDashboard: [
        {
          id,
          name,
        },
      ],
    },
  },
}
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
    <MockedProvider mocks={[data]} addTypename={false}>
      <RecommendationList />
    </MockedProvider>
  )
  expect(screen.getByTestId('spinner')).toBeInTheDocument()
})
it('renders a list of recommended specialists', async () => {
  render(
    <MockedProvider mocks={[data]} addTypename={false}>
      <RecommendationList />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByRole('link')).toHaveTextContent(name)
})
it('renders a network error message', async () => {
  render(
    <MockedProvider mocks={[error]} addTypename={false}>
      <RecommendationList />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByTestId('error')).toHaveTextContent(message)
})
it('renders a graphql error message', async () => {
  render(
    <MockedProvider mocks={[errors]} addTypename={false}>
      <RecommendationList />
    </MockedProvider>
  )
  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  expect(screen.getByTestId('error')).toHaveTextContent(message)
})
