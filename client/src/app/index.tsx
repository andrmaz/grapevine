import * as React from 'react'

import Spinner from '@/lib/loaders/spinner'

const AuthenticatedApp = React.lazy(() => import('./authenticated'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated'))

export default function App(): JSX.Element {
  const user = 'null' //TODO: handle user state here - auth provider
  return (
    <React.Suspense fallback={<Spinner size='large' />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}
