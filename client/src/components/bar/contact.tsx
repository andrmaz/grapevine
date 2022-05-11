import * as React from 'react'

import {GetSpecialistQueryVariables} from '/__generated__/types'
import {MessageCircle} from 'react-feather'
import {Spinner} from '@/components/loaders/spinner'
import UnstyledButton from '@/blocs/buttons/unstyled'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const Dialog = React.lazy(() => import('@/components/dialog/transition'))
const SpecialistChat = React.lazy(() => import('@/containers/specialist/chat'))

export default function ContactBar({
  id,
}: GetSpecialistQueryVariables): JSX.Element {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const onOpen = (): void => setIsOpen(true)
  const onDismiss = (): void => setIsOpen(false)
  return (
    <Wrapper>
      <UnstyledButton data-testid='message' onClick={onOpen}>
        <MessageCircle size={24} color={theme.colors.green} />
      </UnstyledButton>
      <React.Suspense fallback={<Spinner size='medium' />}>
        <Dialog isOpen={isOpen} onDismiss={onDismiss}>
          <SpecialistChat id={id} />
        </Dialog>
      </React.Suspense>
    </Wrapper>
  )
}

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
