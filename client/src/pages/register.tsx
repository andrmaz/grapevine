import * as React from 'react'

import {CustomerInput, useRegisterCustomerMutation} from '/__generated__/types'

import { setTokenKey } from '@/utils/storage'
import styled from '@emotion/styled'
import {theme} from '@/themes'
import {useAuthDispatch} from '@/services/auth/context'
import {useHistory} from 'react-router-dom'

export default function Register(): JSX.Element {
  const dispatch = useAuthDispatch()
  const history = useHistory()
  const [state, setState] = React.useState<CustomerInput>({
    name: '',
    email: '',
    address: undefined,
  })
  const {name, email, address} = state
  const [registerCustomerMutation] = useRegisterCustomerMutation({
    variables: {
      registerCustomerInput: {email, name, address},
    },
    onCompleted: data => {
      const success = data.registerCustomer.success
      if (success) {
        const token = data.registerCustomer.user?.token
        typeof token === 'string' && setTokenKey(token)
        const user = data.registerCustomer.user?.userInfo
        user && dispatch({type: 'login', user})
        history.push('/')
      }
    },
    onError: error => {
      console.error(error.name)
    },
  })
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    const name = event.target.name as keyof CustomerInput
    const value = event.target.value
    setState(state => ({...state, [name]: value}))
  }
  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    registerCustomerMutation()
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
            required
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
            required
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
