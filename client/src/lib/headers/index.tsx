import * as React from 'react'

import {Link} from 'react-router-dom'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const Navigation = styled.nav`
  position: sticky;
  top: 0;
  margin: auto;
  border: 1px solid black;
  width: ${theme.sizes.header.width}px;
  height: ${theme.sizes.header.height}px;
  background-color: var(--color-indigo-10);
  isolation: isolate;
  z-index: 9;
`
const List = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`

const Item = styled.li`
  list-style-type: none;
  font-size: 0.9rem;
`

const NavLink = styled(Link)`
  color: var(--color-base);
  text-decoration: none;
`

export default function Header(): JSX.Element {
  //* Faking the user State for development purposes
  const clear = (): void => {
    const customer = JSON.parse(
      window.localStorage.getItem('customer') as string
    )
    window.localStorage.setItem(
      'customer',
      JSON.stringify({...customer, specialists: []})
    )
  }
  return (
    <Navigation>
      <List>
        <Item>
          <NavLink to='/'>Dashboard</NavLink>
        </Item>
        <Item>
          <NavLink to='/signin' onClick={clear}>
            Sign Out
          </NavLink>
        </Item>
      </List>
    </Navigation>
  )
}
