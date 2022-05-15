import * as React from 'react'

import {render, screen} from 'test-utils'

import {GetSpecialistsQuery} from '/__generated__/types'
import {SpecialistItem} from '@/screens/specialist/item'
import faker from '@faker-js/faker'

beforeEach(() => {
  render(<SpecialistItem {...props} />)
})
const name = faker.name.firstName()
const city = faker.address.city()
const bs = faker.company.bs()
const props = {
  name,
  address: {city},
  company: {bs},
} as GetSpecialistsQuery['specialistsForDashboard'][0]

it('expects the specialist name to be present', () => {
  expect(screen.getByText(name)).toBeInTheDocument()
})
it('expects the specialist company city to be present', () => {
  expect(screen.getByText(city)).toBeInTheDocument()
})
it('expects the specialist company business to be present', () => {
  expect(screen.getByText(bs)).toBeInTheDocument()
})
it('expects a see more button to be present', () => {
  expect(screen.getByRole('button', {name: /see more/i})).toBeInTheDocument()
})