import * as React from 'react'

import {Link} from 'react-router-dom'
import {sizes} from '@/styles/sizes'
import styled from '@emotion/styled'
import {theme} from '@/styles/theme'

const Navigation = styled.nav`
  position: sticky;
  top: 0;
  margin: auto;
  border: 1px solid black;
  width: ${sizes.header.width}px;
  height: ${sizes.header.height}px;
  background-color: ${theme.colors.indigoDarken10};
  z-index: 999;
`
const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`

const Item = styled.li`
  list-style-type: none;
`

const NavLink = styled(Link)`
  color: ${theme.colors.base};
  text-decoration: none;
`

export default function Header(): JSX.Element {
  return (
    <Navigation>
      <List>
        <Item>
          <NavLink to='/'>Dashboard</NavLink>
        </Item>
        <Item>
          {/* Only visible to Specialists */}
          <NavLink to='/about'>About</NavLink>
        </Item>
        <Item>
          <NavLink to='/signin'>Sign Out</NavLink>
        </Item>
      </List>
    </Navigation>
  )
}
