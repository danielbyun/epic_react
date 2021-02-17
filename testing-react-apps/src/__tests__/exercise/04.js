// form testing
// http://localhost:3000/login

import * as React from 'react'
import {getByLabelText, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'
import faker from 'faker'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()

  const buildLoginForm = build({
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password()),
    },
  })

  const {username, password} = buildLoginForm({password: 'doing1011'})

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()

  // 🐨 get the username and password fields via `getByLabelText`
  // const username = 'doinglab'
  // const password = 'doing1011'

  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitButton)

  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({username, password})
})

/*
eslint
  no-unused-vars: "off",
*/
