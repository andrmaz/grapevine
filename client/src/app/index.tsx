import * as React from 'react'

import {GlobalStyles} from '@/components/styles/global'
import {Spinner} from '@/components/loaders/spinner'
import {useAuthState} from '@/services/auth/context'

const AuthenticatedApp = React.lazy(() => import('./authenticated'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated'))

export default function App(): JSX.Element {
  const {user} = useAuthState()
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      <GlobalStyles />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
