// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// exercise
const countReducer = (prevCount, newCount) => {
  return newCount
}

// extra credit 1
const countStepReducer = (prevcount, newCount) => {
  return prevcount + newCount
}

// extra credit 2
const countObjectStateReducer = (state, action) => {
  return {...state, ...action}
}

// extra credit 3
const countObjectFunctionReducer = (state, action) => action(state)
// more flexible
const countObjectFunctionReducerImproved = (state, action) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action),
})

// extra credit 4
const countDispatch = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.step,
      }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  // exercise
  const [count, setCount] = React.useState(initialCount)

  // extra credit 1
  const [countReduced, setCountReduced] = React.useReducer(
    countReducer,
    initialCount,
  )

  // extra credit 2
  const [countStep, setCountStep] = React.useReducer(
    countStepReducer,
    initialCount,
  )

  // extra credit 3
  const [state, setState] = React.useReducer(countObjectStateReducer, {
    count: initialCount,
  })

  // extra credit 4
  const [dispatchState, dispatch] = React.useReducer(countDispatch, {
    count: initialCount,
  })

  // exercise
  const increment = () => setCount(count + step)

  // extra credit 1
  const incrementReduced = () => setCountReduced(countReduced + step)

  // extra credit 2
  const incrementStep = () => setCountStep(step)

  // extra credit 3
  const incrementObjectState = () => setState({count: state.count + step})

  // extra credit 4
  const incrementDispatch = () => dispatch({type: 'INCREMENT', step})

  return (
    <React.Fragment>
      <button onClick={increment}>With useState: {count}</button>
      <button onClick={incrementReduced}>With useReducer:{countReduced}</button>
      <button onClick={incrementStep}>
        With useReducer and custom action: {countStep}
      </button>
      <button onClick={incrementObjectState}>
        With useReducer Object State: {state.count}
      </button>
      <button onClick={incrementDispatch}>
        With useReducer Dispatch: {dispatchState.count}
      </button>
    </React.Fragment>
  )
}

function App() {
  return <Counter />
}

export default App
