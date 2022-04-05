import * as React from 'react'

import { GetSpecialistQueryVariables } from '/__generated__/types'
import {MessageCircle} from 'react-feather'
import {SpecialistChat} from '@/containers/specialist/chat'
import {Spinner} from '@/lib/loaders/spinner'
import UnstyledButton from '@/lib/buttons/unstyled'
import styled from '@emotion/styled'
import {theme} from '@/themes'

const Dialog = React.lazy(() => import('@/lib/dialogs'))

export default function ContactBar({id}: GetSpecialistQueryVariables): JSX.Element {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const onOpen = (): void => setIsOpen(true)
  const onDismiss = (): void => setIsOpen(false)
  return (
    <Wrapper>
      <UnstyledButton onClick={onOpen}>
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
