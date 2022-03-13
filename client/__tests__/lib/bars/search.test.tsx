import * as React from 'react'

import {SearchBar, SearchBarProps} from '@/lib/bars/search'
import {render, screen} from 'test-utils'

import faker from '@faker-js/faker'

const props = {
  search: '',
  setSearch: jest.fn(),
} as SearchBarProps

it('renders a search bar', () => {
  render(<SearchBar {...props} />)
  expect(screen.getByRole('searchbox')).toBeInTheDocument()
})
it('accepts a search term', () => {
  const search = faker.lorem.word()
  render(<SearchBar {...props} search={search} />)
  expect(screen.getByRole('searchbox')).toHaveValue(search)
})
it('has a max length property', () => {
  render(<SearchBar {...props} />)
  expect(screen.getByRole('searchbox')).toHaveProperty('maxLength', 30)
})
