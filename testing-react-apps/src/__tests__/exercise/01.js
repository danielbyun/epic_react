// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')

  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)

  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div)

  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrement, increment] = div.querySelectorAll('button')

  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const message = div.firstChild.querySelector('div')

  // 🐨 expect the message.textContent toBe 'Current count: 0'
  // MAKE SURE TESTS FAIL
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 click the increment button (💰 increment.click())
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true, // it will bubble up - react requires bubbles
    cancelable: true,
    button: 0, // left click
  })
  // increment.click() // exercise
  increment.dispatchEvent(incrementClickEvent) // extra credit

  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1')

  // 🐨 click the decrement button (💰 decrement.click())
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  // decrement.click() // exercise
  decrement.dispatchEvent(decrementClickEvent)

  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')

  console.log(document.body.innerHTML)
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  div.remove()

  /*
  
  Why must you clean?
  - Isolating tests will ALWAYS save you headaches
  - Instead of cleaning AFTER tests, run a beforeEach so that the clean up is guaranteed to run.

  -- beforeEach(() => {
      document.body.innerHTML = ''
    })
  
    * this is only applicable here, but with React Testing Library they will have better implementation on that testing library.

  */
})

/* eslint no-unused-vars:0 */
