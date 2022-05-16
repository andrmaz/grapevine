import * as React from 'react'

import {SpecialistGrid, SpecialistGridProps} from '@/screens/specialist/grid'
import {render, screen} from 'test-utils'

import faker from '@faker-js/faker'

const props = {
  loading: false,
} as SpecialistGridProps
const id = faker.datatype.uuid()
const name = faker.name.firstName()
const email = faker.internet.email()
const city = faker.address.city()
const bs = faker.company.bs()
const company = faker.company.companyName()
const specialist = {
  id,
  name,
  email,
  address: {city},
  company: {bs, name: company},
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
