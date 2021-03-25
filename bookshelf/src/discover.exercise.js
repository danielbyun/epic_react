/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import * as colors from './styles/colors'
// 🐨 import the client from './utils/api-client'

const DiscoverBooksScreen = () => {
  // 🐨 add state for status ('idle', 'loading', or 'success'), data, and query
  // const [status, setStatus] = React.useState('idle')
  // const [data, setData] = React.useState()
  // const [query, setQuery] = React.useState('')
  // const data = null // 💣 remove this, it's just here so the example doesn't explode

  // 🐨 you'll also notice that we don't want to run the search until the
  // user has submitted the form, so you'll need a boolean for that as well
  // 💰 I called it "queried"
  // const [queried, setQueried] = React.useState(false)

  /* my own thing */
  const initialState = {
    status: 'idle',
    data: null,
    query: '',
    queried: false,
    error: null,
  }

  const DiscoverReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case 'set status':
        return {
          ...state,
          status: payload,
        }
      case 'set queried':
        return {
          ...state,
          queried: payload,
        }
      case 'set query':
        return {
          ...state,
          query: payload,
        }
      case 'set data':
        return {
          ...state,
          data: payload,
        }
      case 'set error':
        return {
          ...state,
          error: payload,
        }
      case 'multiple dispatches':
        return {
          ...state,
          ...payload,
        }
      default: {
        throw new Error(`Unsupproted action type of: ${type}`)
      }
    }
  }

  const [
    {status, data, query, queried, error},
    discoverDispatch,
  ] = React.useReducer(DiscoverReducer, initialState)

  // 🐨 Add a useEffect callback here for making the request with the
  // client and updating the status and data.
  React.useEffect(() => {
    if (!queried) {
      return
    }

    // setStatus('loading')

    discoverDispatch({
      type: 'set status',
      payload: 'loading',
    })

    client(`books?query=${encodeURIComponent(query)}`).then(
      responseData => {
        discoverDispatch({
          type: 'multiple dispatches',
          payload: {
            status: 'success',
            data: responseData,
          },
        })
        // setStatus('success')
        // setData(responseData)
      },
      errorData => {
        console.log(errorData)
        discoverDispatch({
          type: 'multiple dispatches',
          payload: {
            status: 'error',
            error: errorData,
          },
        })
      },
    )
  }, [query, queried])

  // 💰 Here's the endpoint you'll call: `books?query=${encodeURIComponent(query)}`
  // 🐨 remember, effect callbacks are called on the initial render too
  // so you'll want to check if the user has submitted the form yet and if
  // they haven't then return early (💰 this is what the queried state is for).

  // 🐨 replace these with derived state values based on the status.
  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  const handleSearchSubmit = event => {
    // 🐨 call preventDefault on the event so you don't get a full page reload
    // 🐨 set the queried state to true
    // 🐨 set the query value which you can get from event.target.elements
    // 💰 console.log(event.target.elements) if you're not sure.
    event.preventDefault()
    discoverDispatch({
      type: 'multiple dispatches',
      payload: {
        queried: true,
        query: event.target.elements.search.value,
      },
    })
    // setQueried(true)
    // setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
