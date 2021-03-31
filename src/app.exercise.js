/** @jsx jsx */
import {jsx} from '@emotion/core'

// import * as React from 'react'
// import * as auth from 'auth-provider'
// import {BrowserRouter as Router} from 'react-router-dom'
// import {FullPageSpinner, FullPageErrorFallback} from './components/lib'
// import {client} from './utils/api-client'
// import {useAsync} from './utils/hooks'

// 🐨 import the AuthContext you created in ./context/auth-context
import {useAuth} from './context/auth-context.exercise'

import {AuthenticatedApp} from 'authenticated-app.exercise'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const {user} = useAuth()

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export {App}
