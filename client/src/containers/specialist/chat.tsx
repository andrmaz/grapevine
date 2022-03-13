import * as React from 'react'

import {InputGroup} from '@/lib/inputs/group'
import {MessagesList} from '@/components/message/list'
import styled from '@emotion/styled'
import {theme} from '@/themes'

export const SpecialistChat = (): JSX.Element => {
  return (
    <Wrapper>
      <MessagesList />
      <InputGroup />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  ${theme.mode.dark} {
    color: var(--color-gray-10);
  }
`

