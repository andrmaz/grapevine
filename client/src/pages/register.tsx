import * as React from 'react'

import {CustomerInput, useRegisterCustomerMutation} from '/__generated__/types'
import { Form, Input, Label, Submit, Wrapper } from '@/blocs/forms/signin'

import {handleRegister} from '@/helpers/auth'
import {useAuthDispatch} from '@/services/auth/context'
import {useHistory} from 'react-router-dom'

export default function Register(): JSX.Element {
  const dispatch = useAuthDispatch()
  const history = useHistory()
  const [input, setInput] = React.useState<CustomerInput>({
    name: '',
    email: '',
    address: undefined,
  })
  const {name, email} = input
  const [registerCustomerMutation] = useRegisterCustomerMutation({
    variables: {input},
    onCompleted: data => handleRegister(data, dispatch, history),
    onError: error => {
      console.error(error.name)
    },
  })
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    const name = event.target.name as keyof CustomerInput
    const value = event.target.value
    setInput(input => ({...input, [name]: value}))
  }
  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    registerCustomerMutation()
  }
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor='name'>Full name:</Label>
          <Input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <Label htmlFor='email'>Email:</Label>
          <Input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <Submit type='submit' />
      </Form>
    </Wrapper>
  )
}