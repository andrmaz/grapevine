import * as React from 'react'

import styled from '@emotion/styled'
import {theme} from '@/themes'

export const InputGroup = (): JSX.Element => {
  const [text, setText] = React.useState<string>('')
  const ref = React.useRef<HTMLInputElement | null>(null)
  const handleClick = (): void => {
    console.info('message sent!', text)
    setText('')
    ref.current?.focus()
  }
  return (
    <Wrapper>
      <Input
        type='text'
        name='message'
        placeholder='Type your message ...'
        value={text}
        onChange={event => setText(event.target.value)}
        ref={ref}
      />
      <Button disabled={!text.length} onClick={handleClick}>
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
