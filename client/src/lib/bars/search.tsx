import * as React from 'react'

import styled from '@emotion/styled'
import {theme} from '@/themes'

export interface SearchBarProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Wrapper = styled.div`
  position: fixed; /* Fixed SearchBar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  display: flex;
  align-items: center;
  height: 64px;
  width: 568px;
  padding: 8px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  background-color: var(--color-base);
  ${theme.breakpoints.medium} {
    width: 100%;
  }
  ${theme.mode.dark} {
    background-color: var(--color-blue);
  }
`
const Input = styled.input`
  padding: 1px 2px;
  border-width: 2px;
`

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps): JSX.Element {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value.toLowerCase()
    setSearch(searchValue)
  }
  return (
    <Wrapper>
      <form role='search'>
        <Input
          type='search'
          id='specialists-search'
          name='q'
          value={search}
          placeholder='Search the business ...'
          aria-label='Search through specialists by business name'
          /* list='businesses' */
          size={30}
          maxLength={30}
          minLength={1}
          onChange={onChange}
        />
      </form>
    </Wrapper>
  )
}
