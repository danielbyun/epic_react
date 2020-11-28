// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input
  const inputRef = React.useRef(null) // extra credit 1
  // const [error, setError] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')

  const handleChange = e => {
    const value = e.target.value

    // setError(value !== value.toLowerCase() ? 'Username must be lower case' : '')
    setInputValue(value.toLowerCase())
  }

  const handleSubmit = e => {
    e.preventDefault()

    // kent's way of getting the value
    const newValue = e.target.elements.usernameInput.value
    console.log(newValue)

    inputRef.current = inputValue
    onSubmitUsername(inputRef.current)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div style={{color: 'red'}} role="alert">
          {/* {error} */}
        </div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          onChange={handleChange}
          type="text"
          id="usernameInput"
          ref={inputRef}
          value={inputValue}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
