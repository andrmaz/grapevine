import * as React from 'react'

import styled from '@emotion/styled'

export const MessagesList = (): JSX.Element => {
  return (
    <Wrapper>
      <Message>Hello! I am fine thanks</Message>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`
const Message = styled.article`
  width: fit-content;
  max-width: 70%;
  padding: 1px 2px;
  margin: 4px 0;
  border: 2px solid;
  border-radius: 4px;
`

