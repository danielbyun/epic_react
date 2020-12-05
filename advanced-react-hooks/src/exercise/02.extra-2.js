// useCallback: custom hooks

import React, {useCallback, useEffect, useReducer, useState} from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

// typical reducer
const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// custom hook
const useAsync = initialValues => {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialValues,
  })

  const run = useCallback(promise => {
    if (!promise) return
    dispatch({type: 'pending'})
    promise.then(
      data => dispatch({type: 'resolved', data}),
      error => dispatch({type: 'rejected', error}),
    )
  }, [])

  return {...state, run}
}

const PokemonInfo = ({pokemonName}) => {
  const {data: pokemon, status, error, run} = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })

  useEffect(() => {
    if (!pokemonName) return

    return run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  if (status === 'idle' || !pokemonName) return 'Submit a pokemon'
  else if (status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  else if (status === 'rejected') throw error
  else if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />

  throw new Error('This should be impossible')
}

const App = () => {
  const [pokemonName, setPokemonName] = useState('')

  const handleSubmit = newPokemonName => setPokemonName(newPokemonName)

  const handleReset = () => setPokemonName('')

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

const AppWithUnmountCheckbox = () => {
  const [mountApp, setMountApp] = useState(true)

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
