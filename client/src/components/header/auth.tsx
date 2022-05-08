import * as React from 'react'

import {Item, List, StyledLink, Wrapper} from '@/blocs/headers/nav'
import {useAuthDispatch, useAuthState} from '@/services/auth/context'

import {removeAuthKeys} from '@/utils/storage'
import styled from '@emotion/styled'
import {useCustomerForProfileQuery} from '/__generated__/types'

export const AuthHeader = (): JSX.Element => {
  const {user} = useAuthState()
  const dispatch = useAuthDispatch()
  const {client} = useCustomerForProfileQuery({
    variables: {
      id: user?.id || '',
    },
  })
  const handleClick = (): void => {
    dispatch({type: 'logout'})
    removeAuthKeys()
    client.clearStore()
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
