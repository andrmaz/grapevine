import * as React from 'react'

import {render, screen, waitForElementToBeRemoved} from 'test-utils'

import ContactBar from '@/components/bar/contact'
import faker from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

beforeEach(async () => {
  render(<ContactBar id={id} />)
  await waitForElementToBeRemoved(screen.findByTestId('spinner'))
})
const id = faker.datatype.uuid()

it('expects a message button to be present', async () => {
  expect(screen.getByTestId('message')).toBeInTheDocument()
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
it('renders a dialog', async () => {
  await userEvent.click(screen.getByTestId('message'))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
