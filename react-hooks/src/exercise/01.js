// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

const Greeting = ({initialName = ''}) => {
  // 💣 delete this variable declaration and replace it with a React.useState call
  // const name = ''
  const [name, setName] = useState(initialName)

  const handleChange = e => {
    // 🐨 update the name here based on event.target.value
    setName(e.target.value)
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
