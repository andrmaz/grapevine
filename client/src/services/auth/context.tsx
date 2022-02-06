import * as React from 'react'

import type {Customer} from '/__generated__/types'

export const AuthStateContext = React.createContext<Customer | undefined>(
  undefined
)
AuthStateContext.displayName = 'Auth State Context'

// eslint-disable-next-line @typescript-eslint/ban-types
export function AuthProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  //* Faking the user State for development purposes
  const state = {email: 'test@example.com', name: 'Test', specialists: []}
  return (
    <AuthStateContext.Provider value={state}>
      {props.children}
    </AuthStateContext.Provider>
  )
}
