import * as React from 'react'

import styled from '@emotion/styled'

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({children, ...delegated}): JSX.Element => {
  return <StyledButton {...delegated}>{children}</StyledButton>
}

const StyledButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: var(--color-indigo);
  color: var(--color-base);
  cursor: pointer;
  &:hover {
    background-color: var(--color-indigo-10);
  }
  &:disabled {
    background-color: var(--color-gray-20);
    color: var(--color-gray-80);
  }
`
