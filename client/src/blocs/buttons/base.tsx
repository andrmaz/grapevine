import * as React from 'react'

import styled from '@emotion/styled'

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({children, ...delegated}): JSX.Element => {
  return <StyledButton {...delegated}>{children}</StyledButton>
}

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
`