// useContext: simple Counter
import * as React from 'react'

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext() // no default value yet

// 🐨 create a CountProvider component here that does this:
const CountProvider = props => {
  //   🐨 get the count state and setCount updater with React.useState
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]

  return <CountContext.Provider value={value} {...props} />
}
const CountDisplay = () => {
  // 🐨 get the count from useContext with the CountContext
  const [count] = React.useContext(CountContext)
  return <div>{`The current count is ${count}`}</div>
}

const Counter = () => {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = React.useContext(CountContext)
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

const App = () => {
  return (
    <div>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
