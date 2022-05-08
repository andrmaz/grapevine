import {onError} from '@apollo/client/link/error'

export const errorLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 'UNAUTHENTICATED': {
            //* Modify the operation context with a new token
            const oldHeaders = operation.getContext().headers
            console.log(operation.getContext())
            const token = null //getNewToken()
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: token ? `Bearer ${token}` : '',
              },
            })
            // Retry the request, returning the new observable
            return forward(operation)
          }
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
)
