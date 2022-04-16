import styled from '@emotion/styled'
import {theme} from '@/themes'

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  width: ${theme.sizes.header.width}px;
  min-height: calc(100% - ${theme.sizes.header.height}px - 3px);
  margin: auto;
  border-style: solid;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 16px;
  height: auto;
  width: 300px;
  border: 2px solid;
  border-radius: 8px;
  padding: 16px 32px;
`
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  ${theme.mode.dark} {
    color: var(--color-base);
  }
`
export const Input = styled.input`
  width: 100%;
  border-radius: 8px;
`
export const Submit = styled.input`
  border-radius: 8px;
  margin-top: auto;
  background-color: var(--color-indigo);
  color: var(--color-base);
`
