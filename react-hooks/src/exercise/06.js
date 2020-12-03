// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

class ErrorBoundaryClass extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }
    return this.props.children
  }
}

const PokemonInfo = ({pokemonName}) => {
  // const [pokemon, setPokemon] = useState(null)
  // const [errorMessage, setErrorMessage] = useState('')
  // const [states, setStates] = useState('idle')
  const [{status, pokemon, errorMessage}, setState] = useState({
    status: 'idle',
    pokemon: null,
    errorMessage: '',
  })

  useEffect(() => {
    if (!pokemonName) return
    setState(() => {
      return {
        pokemon: null,
      }
    })
    fetchPokemon(pokemonName)
      .then(res => {
        // setStates('resolved')
        // setPokemon(res)
        console.log(res)
        setState(() => {
          return {
            status: 'resolved',
            pokemon: res,
            errorMessage: '',
          }
        })
      })
      .catch(err => {
        // setStates('rejected')
        // setErrorMessage(err.message)
        setState(() => {
          return {
            status: 'rejected',
            errorMessage: err.message,
          }
        })
        throw err
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    // this will be handled by the error boundary
    throw errorMessage
    // return (
    //   <div role="alert">
    //     There was an error:{' '}
    //     <pre style={{whiteSpace: 'normal'}}>{errorMessage}</pre>
    //   </div>
    // )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('alright man howd you screw up this time')
}

const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

const App = () => {
  const [pokemonName, setPokemonName] = React.useState('')

  const handleReset = () => {
    setPokemonName('')
  }

  const handleSubmit = newPokemonName => {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          key={pokemonName}
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
