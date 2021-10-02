/** @jsx jsx */
import {css, jsx} from '@emotion/react'

import styled from '@emotion/styled'

interface SpinnerProps {
  testid?: string
  size?: 'large' | 'small'
  theme?: string
}

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingSpinner = styled.div<SpinnerProps>`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: ${props => (props.size === 'small' ? '60px' : '120px')};
  height: ${props => (props.size === 'small' ? '60px' : '120px')};
  animation: spin 2s linear infinite;
  color: ${props => (props.theme ? props.theme : 'grayscale')};
`

export default function Spinner(props: SpinnerProps): JSX.Element {
  return (
    <SpinnerContainer>
      <LoadingSpinner
        css={css`
          spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
        {...props}
        testid='spinner'
      />
    </SpinnerContainer>
  )
}
