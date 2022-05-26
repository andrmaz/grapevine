import * as React from 'react'

import {
  AddRecommendationDocument,
  IncrementRecommendationsDocument,
} from '/__generated__/types'
import {
  email,
  id,
  message,
  name,
  recommendations,
  specialist,
} from '/mocks/constants'
import {render, screen} from 'test-utils'

import {MockedProvider} from '@apollo/client/testing'
import {SpecialistDetails} from '@/containers/specialist/details'
import userEvent from '@testing-library/user-event'

const mocks = [
  {
    request: {
      query: IncrementRecommendationsDocument,
      variables: {id: specialist.id},
    },
    result: {
      data: {
        incrementRecommendations: {
          code: 200,
          success: true,
          message,
          specialist: {
            id: specialist.id,
            recommendations,
          },
        },
      },
    },
  },
  {
    request: {
      query: AddRecommendationDocument,
      variables: {id: specialist.id},
    },
    result: {
      data: {
        addRecommendation: {
          code: 200,
          success: true,
          message,
          customer: {
            id,
            name,
            email,
            specialists: [specialist],
          },
        },
      },
    },
  },
]

it('expects an add to recommendations button to be present', () => {
  render(
    <MockedProvider>
      <SpecialistDetails specialistForAbout={{...specialist}} />
    </MockedProvider>
  )
  expect(screen.getByRole('button', {name: /add/i})).toBeInTheDocument()
})
it('expects to fire the mutations on click event', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SpecialistDetails specialistForAbout={{...specialist}} />
    </MockedProvider>
  )
  const onClick = jest.fn()
  screen.getByRole('button', {name: /add/i}).onclick = onClick
  await userEvent.click(screen.getByRole('button', {name: /add/i}))
  expect(onClick).toHaveBeenCalledTimes(1)
})
it.todo('expects the recommendations to be incremented by one')
