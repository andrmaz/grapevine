import {
  AuthorizeCustomerMutation,
  RegisterCustomerMutation,
  User,
} from '/__generated__/types'

import type {Dispatch} from '@/services/auth/context'
import type {History} from 'history'
import {setTokenKey} from '@/utils/storage'

const handleSuccess = (
  dispatch: Dispatch,
  history: History,
  token?: string,
  user?: User
): void => {
  typeof token === 'string' && setTokenKey(token)
  user && dispatch({type: 'login', user})
  history.push('/')
}

export const handleAuthorize = (
  data: AuthorizeCustomerMutation,
  dispatch: Dispatch,
  history: History
): void => {
  const success = data.authorizeCustomer.success
  if (success)
    handleSuccess(
      dispatch,
      history,
      data.authorizeCustomer.user?.token,
      data.authorizeCustomer.user?.userInfo
    )
}

export const handleRegister = (
  data: RegisterCustomerMutation,
  dispatch: Dispatch,
  history: History
): void => {
  const success = data.registerCustomer.success
  if (success)
    handleSuccess(
      dispatch,
      history,
      data.registerCustomer.user?.token,
      data.registerCustomer.user?.userInfo
    )
}
