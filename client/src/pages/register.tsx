import * as React from 'react'

import styled from '@emotion/styled'
import {theme} from '@/themes'

interface Input {
  name: string
  email: string
  city?: string
}

export default function Register(): JSX.Element {
  const [state, setState] = React.useState<Input>({
    name: '',
    email: '',
    city: '',
  })
  const {name, email, city} = state
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    const name = event.target.name
    const value = event.target.value
    setState(state => ({...state, [name]: value}))
  }
  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      name: {value: string}
      email: {value: string}
      city: {value: string}
    }
    console.info(
      'name',
      target.name.value,
      'email',
      target.email.value,
      'city',
      target.city.value
    )
  }
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Wrapper>
          <Label htmlFor='name'>Full name:</Label>
          <Input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor='email'>Email:</Label>
          <Input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor='city'>City:</Label>
          <Input
            type='city'
            id='city'
            name='city'
            value={city}
            onChange={onChange}
          />
        </Wrapper>
        <Submit type='submit' />
      </Form>
    </Container>
  )
}

const Container = styled.div`
  width: ${theme.sizes.header.width}px;
  min-height: calc(100% - ${theme.sizes.header.height}px - 3px);
  margin: auto;
  border-style: solid;
  display: grid;
  place-items: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  border: 2px solid;
  border-radius: 8px;
  padding: 16px 32px;
`
const Wrapper = styled.div`
  margin-top: 16px;
`
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  ${theme.mode.dark} {
    color: var(--color-base);
  }
`
const Input = styled.input`
  width: 100%;
  border-radius: 8px;
`
const Submit = styled.input`
  border-radius: 8px;
  margin-top: auto;
  background-color: var(--color-indigo);
  color: var(--color-base);
`
