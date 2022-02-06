import * as React from 'react'

import {AuthStateContext} from '@/services/auth/context'
import {GlobalStyles} from '@/components/styles/global'
import Spinner from '@/lib/loaders/spinner'

const AuthenticatedApp = React.lazy(() => import('./authenticated'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated'))

export default function App(): JSX.Element {
  //* Faking the user State for development purposes
  const user = React.useContext(AuthStateContext)
  window.localStorage.setItem('customer', JSON.stringify(user))
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      <GlobalStyles />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
