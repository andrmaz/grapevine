import * as React from 'react'

import {Link, useRouteMatch} from 'react-router-dom'

import styled from '@emotion/styled'
import {theme} from '@/themes'

export default function Header(): JSX.Element {
  const match = useRouteMatch('/signin')
  return (
    <Navigation>
      <List>
        <Item>
          {match ? (
            <StyledLink to='/signup'>Register</StyledLink>
          ) : (
            <StyledLink to='/signin'>Login</StyledLink>
          )}
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
  align-items: center;
  padding: 0 24px;
`

const Item = styled.li`
  list-style-type: none;
  font-size: 0.9rem;
  margin-left: auto;
`

const StyledLink = styled(Link)`
  color: var(--color-base);
  text-decoration: none;
`
