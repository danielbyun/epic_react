// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const setup = ({initialProps} = {}) => {
  const result = {}
  const TestComponent = () => {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
const UseCounterHookExample = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <button onClick={increment} name="increment">
        increment
      </button>
      <button onClick={decrement} name="decrement">
        decrement
      </button>
      <p>Count: {count}</p>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<UseCounterHookExample />)

  // 🐨 get the elements you need using screen
  const incrementButton = screen.getByRole('button', {name: /increment/i})
  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const countMsg = screen.getByText(/count/i)

  // screen.debug()

  // 🐨 assert on the initial state of the hook
  expect(countMsg).toHaveTextContent(/count: 0/i)

  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  userEvent.click(incrementButton)
  expect(countMsg).toHaveTextContent(/count: 1/i)

  userEvent.click(decrementButton)
  expect(countMsg).toHaveTextContent(/count: 0/i)
})

test('exposes the count and increment/decrement function (hooks)', () => {
  const result = setup()

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3}})

  expect(result.current.count).toBe(3)

  act(() => result.current.increment())
  expect(result.current.count).toBe(4)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}})

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(2)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
