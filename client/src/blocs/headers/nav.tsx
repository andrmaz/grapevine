import {Link} from 'react-router-dom'
import styled from '@emotion/styled'
import { theme } from '@/themes'

export const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  margin: auto;
  border: 1px solid black;
  width: ${theme.sizes.header.width}px;
  height: ${theme.sizes.header.height}px;
  background-color: var(--color-indigo-10);
  isolation: isolate;
  z-index: 9;
`
export const List = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
`
export const Item = styled.li`
  list-style-type: none;
  font-size: 0.9rem;
`
export const StyledLink = styled(Link)`
  color: var(--color-base);
  text-decoration: none;
`
