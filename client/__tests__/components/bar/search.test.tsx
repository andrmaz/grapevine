import * as React from 'react'

import {SearchBar, SearchBarProps} from '@/components/bar/search'
import {render, screen} from 'test-utils'

import {word} from '/mocks/constants'

const props = {
  search: '',
  setSearch: jest.fn(),
} as SearchBarProps

it('renders a search bar', () => {
  render(<SearchBar {...props} />)
  expect(screen.getByRole('searchbox')).toBeInTheDocument()
})
it('accepts a search term', () => {
  render(<SearchBar {...props} search={word} />)
  expect(screen.getByRole('searchbox')).toHaveValue(word)
})
it.todo('accepts a user input value')
