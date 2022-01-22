import * as React from 'react'

import {Global, css} from '@emotion/react'

import {AuthStateContext} from '@/services/auth/context'
import Spinner from '@/lib/loaders/spinner'

const AuthenticatedApp = React.lazy(() => import('./authenticated'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated'))

export default function App(): JSX.Element {
  //* Faking the user State for development purposes
  const user = React.useContext(AuthStateContext)
  window.localStorage.setItem('customer', JSON.stringify(user))
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      <Global
        styles={css`
          @media (pointer: coarse) {
            html {
              --min-tap-height: 44px;
            }
          }
        `}
      />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
