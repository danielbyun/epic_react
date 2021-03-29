/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client'

import {FullPageSpinner} from 'components/lib'
import * as colors from './styles/colors'
import {useAsync} from 'utils/hooks'

const getUser = async () => {
  let user = null
  const token = await auth.getToken()

  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

function App() {
  // 🐨 useState for the user
  // const [user, setUser] = React.useState(null)

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData: setUser,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  // 🐨 create a login function that calls auth.login then sets the user
  // 💰 const login = form => auth.login(form).then(u => setUser(u))
  const login = form => auth.login(form).then(u => setUser(u))

  // 🐨 create a registration function that does the same as login except for register
  const registration = form => auth.register(form).then(u => setUser(u))

  // 🐨 create a logout function that calls auth.logout() and sets the user to null
  const logout = () => auth.logout().then(() => setUser(null))

  if (isLoading || isIdle) return <FullPageSpinner />

  if (isError)
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>uhoh, there's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )

  if (isSuccess) {
    // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
    // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={registration} />
    )
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
