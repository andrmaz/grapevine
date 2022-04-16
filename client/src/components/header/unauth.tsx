import * as React from 'react'

import {Item, List, StyledLink, Wrapper} from '@/blocs/headers/nav'

import { useRouteMatch } from 'react-router-dom'

export const UnauthHeader = (): JSX.Element => {
  const match = useRouteMatch('/signin')
  return (
    <Wrapper>
      <List>
        <Item>
          {match ? (
            <StyledLink to='/signup'>Register</StyledLink>
          ) : (
            <StyledLink to='/signin'>Login</StyledLink>
          )}
        </Item>
      </List>
    </Wrapper>
  )
}

