import * as React from 'react'

import {render, screen} from 'test-utils'

import SearchBar from '@/lib/bars/search'

const props = {
  search: '',
  setSearch: jest.fn(),
}

it('renders a search bar', () => {
  render(<SearchBar {...props} />)
  expect(screen.getByRole('search')).toBeInTheDocument()
})
