import * as React from 'react'

import {RenderOptions, RenderResult, render} from '@testing-library/react'

import {AuthProvider} from '@/services/auth/context'
import {BrowserRouter as Router} from 'react-router-dom'

const AllTheProviders: React.FC = ({children}) => {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
