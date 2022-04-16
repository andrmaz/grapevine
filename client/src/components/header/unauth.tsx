import * as React from 'react'

import {Item, List, StyledLink, Wrapper} from '@/blocs/headers/nav'

import styled from '@emotion/styled'
import { useRouteMatch } from 'react-router-dom'

export const UnauthHeader = (): JSX.Element => {
  const match = useRouteMatch('/signin')
  return (
    <Wrapper>
      <List>
        <StyledItem>
          {match ? (
            <StyledLink to='/signup'>Register</StyledLink>
          ) : (
            <StyledLink to='/signin'>Login</StyledLink>
          )}
        </StyledItem>
      </List>
    </Wrapper>
  )
}

const StyledItem = styled(Item)`
  margin-left: auto;
`

