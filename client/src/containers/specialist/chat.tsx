import * as React from 'react'
import styled from '@emotion/styled'
import InputGroup from '@/lib/input/group'
import { MessagesList } from '@/components/message/list'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
`

export const SpecialistChat = (): JSX.Element => {
  return (
    <Wrapper>
      <MessagesList />
      <InputGroup />
    </Wrapper>
  )
}
