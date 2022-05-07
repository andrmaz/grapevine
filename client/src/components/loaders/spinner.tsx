import * as React from 'react'

import styled from '@emotion/styled'

interface SpinnerProps {
  testid?: string
  size: 'large' | 'medium' | 'small'
  color?: string
}

const STYLES = {
  small: {
    '--width': '60px',
    '--height': '60px',
  },
  medium: {
    '--width': '90px',
    '--height': '90px',
  },
  large: {
    '--width': '120px',
    '--height': '120px',
  },
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  const styles = STYLES[props.size] as React.CSSProperties
  if (!styles) {
    throw new Error(`Unknown size passed to Spinner: ${props.size}`)
  }
  return (
    <SpinnerContainer>
      <LoadingSpinner {...props} style={styles} data-testid='spinner' />
    </SpinnerContainer>
  )
}

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoadingSpinner = styled.div<SpinnerProps>`
  border: 16px solid var(--color-gray);
  border-top: 16px solid
    ${props => (props.color ? props.color : 'var(--color-blue)')};
  border-radius: 50%;
  width: var(--width);
  height: var(--height);
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
