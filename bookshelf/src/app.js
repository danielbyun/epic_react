<<<<<<< HEAD
<<<<<<< HEAD
export * from './app.final'

// export * from './app.exercise'
=======
// export * from './app.final'

export * from './app.exercise'
>>>>>>> f5e2dcab78f014173ef56d67d9e42f107bf23583

// 💯 Load the user's data on page load
// export * from './app.extra-1'

// 💯 Use `useAsync`
// export * from './app.extra-2'
=======
import * as React from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
>>>>>>> 29b1c3bb693e0c2b81465d1427e29bee3379f8fc
