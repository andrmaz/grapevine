import * as React from 'react'

import { Item, List, StyledLink, Wrapper } from '@/blocs/headers/nav'

import {removeAuthKeys} from '@/utils/storage'
import styled from '@emotion/styled'
import {useAuthDispatch} from '@/services/auth/context'

export const AuthHeader = (): JSX.Element => {
  const dispatch = useAuthDispatch()
  const handleClick = (): void => {
    dispatch({type: 'logout'})
    removeAuthKeys()
    // https://www.apollographql.com/docs/react/caching/advanced-topics/#resetting-the-cache
    /* logout().then(() => client.resetStore()) */
  }
  return (
    <Wrapper>
      <StyledList>
        <Item>
          <StyledLink to='/'>Dashboard</StyledLink>
        </Item>
        <StyledItem>
          <StyledLink to='/signin' onClick={handleClick}>
            Sign Out
          </StyledLink>
        </StyledItem>
      </StyledList>
    </Wrapper>
  )
}

const StyledList = styled(List)`
  justify-content: space-between;
`
const StyledItem = styled(Item)`
  margin-left: auto;
`
