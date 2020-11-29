// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useState, useRef} from 'react'

// extra credit 3 && completed with extra credit 4
const useLocalStorage = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse}, // extra credit 4
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage) // extra credit 4
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue // extra credit 4
  }) // extra credit 1 (lazy state init)

  const prevKeyRef = useRef(key) // mutate the object without triggering re-renders

  useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize]) // extra credit 2 (dependencies array)

  return [state, setState]
}

const Greeting = ({initialName = ''}) => {
  const [name, setName] = useLocalStorage('name', initialName)

  const handleChange = event => {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

const App = () => {
  return <Greeting />
}

export default App

// extra credit 4
