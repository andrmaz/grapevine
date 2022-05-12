import * as React from 'react'

import {SearchBar, SearchBarProps} from '@/components/bar/search'
import {render, screen} from 'test-utils'

import faker from '@faker-js/faker'

const props = {
  search: '',
  setSearch: jest.fn(() => 'value'),
} as SearchBarProps
const search = faker.lorem.word()

it('renders a search bar', () => {
  render(<SearchBar {...props} />)
  expect(screen.getByRole('searchbox')).toBeInTheDocument()
})
it('accepts a search term', () => {
  render(<SearchBar {...props} search={search} />)
  expect(screen.getByRole('searchbox')).toHaveValue(search)
})
it.todo('accepts a user input value')
