import * as React from 'react'

import {render, screen} from 'test-utils'

import ContactBar from '@/components/bar/contact'
import {MockedProvider} from '@apollo/client/testing'
import {id} from '/mocks/constants'
import userEvent from '@testing-library/user-event'

beforeEach(async () => {
  render(
    <MockedProvider addTypename={false}>
      <ContactBar id={id} />
    </MockedProvider>
  )
})

it('expects a message button to be present', () => {
  expect(screen.getByTestId('message')).toBeInTheDocument()
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
it('renders a dialog', async () => {
  await userEvent.click(screen.getByTestId('message'))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
