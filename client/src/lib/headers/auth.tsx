import * as React from 'react'

import {Link} from 'react-router-dom'
import {removeAuthKeys} from '@/utils/storage'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useAuthDispatch} from '@/services/auth/context'

export default function Header(): JSX.Element {
  const dispatch = useAuthDispatch()
  const clear = (): void => {
    dispatch({type: 'logout'})
    removeAuthKeys()
    // https://www.apollographql.com/docs/react/caching/advanced-topics/#resetting-the-cache
    /* logout().then(() => client.resetStore()) */
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
