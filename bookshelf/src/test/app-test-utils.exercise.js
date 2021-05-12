// 🐨 here are the things you're going to need for this test:
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {AppProviders} from 'context'

import {buildUser} from 'test/generate'
import * as auth from 'auth-provider'
import * as usersDB from 'test/data/users'

const render = async (ui, {route = '/list', user, ...renderOptions} = {}) => {
  // 🐨 create a user using `buildUser`
  // 🐨 create a book use `buildBook`
  user = typeof user === 'undefined' ? await logInAsUser() : user

  // 🐨 update the URL to `/book/${book.id}`
  //   💰 window.history.pushState({}, 'page title', route)
  //   📜 https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
  window.history.pushState({}, 'Test page', route)

  // 🐨 render the App component and set the wrapper to the AppProviders
  // (that way, all the same providers we have in the app will be available in our tests)
  const returnValue = {
    ...rtlRender(ui, {wrapper: AppProviders, ...renderOptions}),
    user,
  }

  await waitForLoadingToFinish()

  return returnValue
}

const logInAsUser = async userProperties => {
  const user = buildUser(userProperties)

  await usersDB.create(user)
  const authUser = await usersDB.authenticate(user)

  // reverse-engineer auth provider
  // 🐨 "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value (can be anything for now)
  window.localStorage.setItem(auth.localStorageKey, authUser.token)

  return authUser
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ])

export * from '@testing-library/react'
export {render, userEvent, logInAsUser, waitForLoadingToFinish}
