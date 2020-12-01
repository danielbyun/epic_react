// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React, {useState} from 'react'

const Name = () => {
  const [name, setName] = useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={setName} />
    </div>
  )
}

const FavoriteAnimal = ({animal, onAnimalChange}) => {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

const Display = ({animal}) => {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

const App = () => {
  const [animal, setAnimal] = useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display animal={animal} />
    </form>
  )
}

export default App
