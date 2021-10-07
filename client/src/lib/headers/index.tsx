import * as React from 'react'

import {Link} from 'react-router-dom'
import {sizes} from '@/styles/sizes'
import styled from '@emotion/styled'

const Navigation = styled.nav`
  position: sticky;
  top: 0;
  margin: auto;
  width: ${sizes.header.width}px;
  height: ${sizes.header.height}px;
  border: 1px solid black;
`
const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`

const Item = styled.li`
  list-style-type: none;
`

export default function Header(): JSX.Element {
  return (
    <Navigation>
      <List>
        <Item>
          <Link to='/'>Dashboard</Link>
        </Item>
        <Item>
          <Link to='/about'>About</Link>
        </Item>
      </List>
    </Navigation>
  )
}
