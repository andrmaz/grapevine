import * as React from 'react'
import styled from '@emotion/styled'

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({children, ...props}): JSX.Element => {
  return <StyledButton {...props}>{children}</StyledButton>
}

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
`
