import * as React from 'react'

import Dialog, {DialogProps} from '@/components/dialog/transition'
import {render, screen} from 'test-utils'

const props = {
  isOpen: true,
  onDismiss: jest.fn(),
} as DialogProps

it('does not render a dialog', () => {
  render(<Dialog {...props} isOpen={false} />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
it('renders a dialog', () => {
  render(<Dialog {...props} />)
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
it('expects a dismiss button to be present', async () => {
  render(<Dialog {...props} />)
  expect(screen.getByTestId('dismiss')).toBeInTheDocument()
})
