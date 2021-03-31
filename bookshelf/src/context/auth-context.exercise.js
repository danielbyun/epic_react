/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'

import {FullPageErrorFallback, FullPageSpinner} from 'components/lib'
import * as auth from 'auth-provider'
// 🐨 create and export a React context variable for the AuthContext
// 💰 using React.createContext
const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within a within an AuthProvider`)
  }

  return context
}

const AuthProvider = props => {
  async function getUser() {
    let user = null

    const token = await auth.getToken()
    if (token) {
      const data = await client('me', {token})
      user = data.user
    }

    return user
  }

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const value = {user, login, register, logout}
    // 🐨 wrap all of this in the AuthContext.Provider and set the `value` to props
    return <AuthContext.Provider value={value} {...props} />
  }
}

const useClient = () => {
  const {
    user: {token},
  } = useAuth()

  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
