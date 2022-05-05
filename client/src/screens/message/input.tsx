import * as React from 'react'

import {
  GetSpecialistQueryVariables,
  useCreateMessageMutation,
} from '/__generated__/types'

import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useAuthState} from '@/services/auth/context'

export const InputGroup = ({id}: GetSpecialistQueryVariables): JSX.Element => {
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
      <Button disabled={!content.length} onClick={handleClick}>
        Send
      </Button>
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
const Button = styled.button`
  width: 20%;
  background-color: var(--color-indigo);
  color: var(--color-base);
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  &:hover {
    background-color: var(--color-indigo-10);
  }
  &:disabled {
    background-color: var(--color-gray-20);
    color: var(--color-gray-80);
    ${theme.mode.dark} {
      background-color: var(--color-gray-20);
    }
  }
`
