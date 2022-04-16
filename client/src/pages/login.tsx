import * as React from 'react'

import { Form, Input, Label, Submit, Wrapper } from '@/blocs/forms/signin'
import { UserInput, useAuthorizeCustomerMutation } from '/__generated__/types'

import { handleAuthorize } from '@/helpers/auth'
import { useAuthDispatch } from '@/services/auth/context'
import { useHistory } from 'react-router-dom'

export default function Login(): JSX.Element {
  const dispatch = useAuthDispatch()
  const history = useHistory()
  const [input, setInput] = React.useState<UserInput>({name: '', email: ''})
  const { name, email } = input
  const [authorizeCustomerMutation] = useAuthorizeCustomerMutation({
    variables: {input},
    onCompleted: data => handleAuthorize(data, dispatch, history),
    onError: error => {
      console.error(error.name)
    },
  })
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    const name = event.target.name as keyof UserInput
    const value = event.target.value
    setInput(input => ({...input, [name]: value}))
  }
  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault()
    authorizeCustomerMutation()
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
          />
        </div>
        <Submit type='submit' />
      </Form>
    </Wrapper>
  )
}