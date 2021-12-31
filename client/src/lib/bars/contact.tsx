import * as React from 'react'
import styled from '@emotion/styled'
import {MessageCircle} from 'react-feather'
import {theme} from '@/themes'
import UnstyledButton from '@/lib/buttons/unstyled'
const Dialog = React.lazy(() => import('@/lib/dialogs'))

const Wrapper = styled.aside`
  isolation: isolate;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid;
  border-radius: 4px;
  padding: 4px;
`

export default function ContactBar(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const onOpen = (): void => setIsOpen(true)
  const onDismiss = (): void => setIsOpen(false)
  return (
    <Wrapper>
      <UnstyledButton onClick={onOpen}>
        <MessageCircle size={24} color={theme.colors.green} />
      </UnstyledButton>
      <Dialog isOpen={isOpen} onDismiss={onDismiss} />
    </Wrapper>
  )
}
