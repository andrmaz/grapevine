import * as React from 'react'

import styled from '@emotion/styled'
import {theme} from '@/styles/theme'

interface SpinnerProps {
  testid?: string
  size?: 'large' | 'small'
  color?: string
}

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingSpinner = styled.div<SpinnerProps>`
  border: 16px solid ${theme.colors.gray};
  border-top: 16px solid
    ${props => (props.color ? props.color : theme.colors.blue)};
  border-radius: 50%;
  width: ${props => (props.size === 'small' ? '60px' : '120px')};
  height: ${props => (props.size === 'small' ? '60px' : '120px')};
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <SpinnerContainer>
      <LoadingSpinner {...props} testid='spinner' />
    </SpinnerContainer>
  )
}
