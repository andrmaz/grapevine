import * as React from 'react'

import {DialogContent, DialogOverlay} from '@reach/dialog'
import {animated, useTransition} from '@react-spring/web'

import {SpecialistChat} from '@/containers/specialist/chat'
import UnstyledButton from '@/lib/buttons/unstyled'
import VisuallyHidden from '@reach/visually-hidden'
import {XCircle} from 'react-feather'
import styled from '@emotion/styled'
import {theme} from '@/themes'

interface DialogProps {
  isOpen: boolean
  onDismiss: () => void
}

const Overlay = styled(animated(DialogOverlay))`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  background-color: transparent;
  ${theme.breakpoints.large} {
    align-items: end;
  }
`
const Content = styled(animated(DialogContent))`
  /* right column */
  grid-column: 3 / -1;
  height: 416px;
  width: 400px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: var(--color-base);
  border: 2px solid;
`
const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: -12px;
  left: -12px;
  svg {
    background-color: var(--color-base);
  }
`

export default function Dialog({isOpen, onDismiss}: DialogProps): JSX.Element {
  const transitions = useTransition(isOpen, {
    from: {opacity: 0, y: -10},
    enter: {opacity: 1, y: 0},
    leave: {opacity: 0, y: 10},
  })
  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <Overlay
              isOpen={isOpen}
              onDismiss={onDismiss}
              style={{opacity: styles.opacity}}
            >
              <Content
                aria-label='dialog-content'
                style={{
                  transform: styles.y.to(
                    value => `translate3d(0px, ${value}px, 0px)`
                  ),
                }}
              >
                <CloseButton onClick={onDismiss}>
                  <VisuallyHidden>Dismiss menu</VisuallyHidden>
                  <XCircle />
                </CloseButton>
                <SpecialistChat />
              </Content>
            </Overlay>
          )
      )}
    </>
  )
}
