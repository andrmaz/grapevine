import * as React from 'react'

import {
  GetSpecialistQueryVariables,
  useCreateMessageMutation,
} from '/__generated__/types'

import { Button } from '@/blocs/buttons/base'
import styled from '@emotion/styled'
import {useAuthState} from '@/services/auth/context'

export const MessageInput = ({id}: GetSpecialistQueryVariables): JSX.Element => {
  const {user} = useAuthState()
  const [content, setContent] = React.useState<string>('')
  const ref = React.useRef<HTMLInputElement | null>(null)
  const [createMessageMutation] = useCreateMessageMutation({
    variables: {
      input: {
        from: user?.id || '',
        to: id,
        content,
      },
    },
  })
  const handleClick = (): void => {
    createMessageMutation()
    setContent('')
    ref.current?.focus()
  }
  return (
    <Wrapper>
      <Input
        type='text'
        name='message'
        placeholder='Type your message ...'
        value={content}
        onChange={event => setContent(event.target.value)}
        ref={ref}
      />
      <StyledButton disabled={!content.length} onClick={handleClick}>
        Send
      </StyledButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`
const Input = styled.input`
  padding: 1px 2px;
  width: 100%;
  margin-right: -20%;
  border-radius: 4px;
`
const StyledButton = styled(Button)`
  width: 20%;
  border-radius: 4px 4px 0 0;
`
