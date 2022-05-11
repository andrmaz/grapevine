import * as React from 'react'

import {render, screen, waitForElementToBeRemoved} from 'test-utils'

import ContactBar from '@/components/bar/contact'
import faker from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

const id = faker.datatype.uuid()

beforeEach(() => {
  render(<ContactBar id={id} />)
})
it('expects a message button to be present', async () => {
  await waitForElementToBeRemoved(screen.queryByTestId('spinner'))
  expect(screen.getByTestId('message')).toBeInTheDocument()
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
it('renders a dialog', async () => {
  await userEvent.click(screen.getByTestId('message'))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
