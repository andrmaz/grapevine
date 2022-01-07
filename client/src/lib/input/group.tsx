import * as React from 'react'
import styled from '@emotion/styled'
import {theme} from '@/themes'

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
  background-color: ${theme.colors.indigo};
  color: ${theme.colors.base};
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  &:hover {
    background-color: ${theme.colors.indigoDarken10};
  }
  &:disabled {
    background-color: ${theme.colors.gray20};
    color: ${theme.colors.gray80};
  }
`

export default function InputGroup(): JSX.Element {
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
