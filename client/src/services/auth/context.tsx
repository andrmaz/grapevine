import * as React from 'react'

import { getUserKey, setUserKey } from '@/utils/storage';

import type {User} from '/__generated__/types'

type State = {user: User | null}
type Action = {type: 'login'; user: User} | {type: 'logout'}
type Dispatch = (action: Action) => void

const StateContext = React.createContext<State | undefined>(undefined)
StateContext.displayName = 'Auth State Context'

const DispatchContext = React.createContext<Dispatch | undefined>(undefined)
DispatchContext.displayName = 'Auth Dispatch Context'

export function useAuthState(): State {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}

export function useAuthDispatch(): Dispatch {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.user,
      }
    case 'logout':
      return {...state, user: null}
    default: {
      throw new Error(`Unhandled type at ${action} action`)
    }
  }
}

function useAuthReducer(): [State, Dispatch] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<State, Action>,
    State
  >(reducer, {user: null}, () => ({
    user: JSON.parse(getUserKey() as string),
  }))
  return [state, dispatch]
}

function useAuthProvider(): [State, Dispatch] {
  const [state, dispatch] = useAuthReducer()

  const user = state.user
  const serializedUser = JSON.stringify(user)
  React.useEffect(() => {
    setUserKey(serializedUser)
  }, [serializedUser])

  return [state, dispatch]
}

export function AuthProvider(
  props: React.PropsWithChildren<React.ReactNode>
): JSX.Element {
  const [state, dispatch] = useAuthProvider()
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
