import * as React from 'react'

import {SpecialistGrid, SpecialistGridProps} from '@/screens/specialist/grid'
import {bs, city, companyName, email, id, name} from '/mocks/constants'
import {render, screen} from 'test-utils'

const props = {
  loading: false,
} as SpecialistGridProps
const specialist = {
  id,
  name,
  email,
  address: {city},
  company: {bs, name: companyName},
}
const specialists = new Array(1).fill(specialist)

it('expects a retry message to be present', () => {
  render(<SpecialistGrid {...props} specialists={[]} />)
  expect(screen.getByTestId('retry')).toBeInTheDocument()
})
it('expects the specialist name to be present', () => {
  render(<SpecialistGrid {...props} specialists={specialists} />)
  expect(screen.getByText(name)).toBeInTheDocument()
})
