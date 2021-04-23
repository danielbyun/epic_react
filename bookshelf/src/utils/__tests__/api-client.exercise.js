// 🐨 you'll need the test server
// 💰 the way that our tests are set up, you'll find this in `src/test/server/test-server.js`
import {server, rest} from 'test/server'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
// 🐨 grab the client
import {client} from '../api-client'
const apiURL = process.env.REACT_APP_API_URL

// 🐨 add a beforeAll to start the server with `server.listen()`
// 🐨 add an afterAll to stop the server when `server.close()`
// 🐨 afterEach test, reset the server handlers to their original handlers
// via `server.resetHandlers()`

// 🐨 flesh these out:

jest.mock('react-query')
jest.mock('auth-provider')

test('calls fetch at the endpoint with the arguments for GET, requests', async () => {
  // 🐨 add a server handler to handle a test request you'll be making
  // 💰 because this is the first one, I'll give you the code for how to do that.
  // 🐨 call the client (don't forget that it's asynchronous)
  // 🐨 assert that the resolved value from the client call is correct
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  // 🐨 create a fake token (it can be set to any string you want)
  // 🐨 create a "request" variable with let
  // 🐨 create a server handler to handle a test request you'll be making
  // 🐨 inside the server handler, assign "request" to "req" so we can use that
  //     to assert things later.
  //     💰 so, something like...
  //       async (req, res, ctx) => {
  //         request = req
  //         ... etc...
  //
  // 🐨 call the client with the token (note that it's async)
  // 🐨 verify that `request.headers.get('Authorization')` is correct (it should include the token)
  const token = 'SOME_TOKEN'

  let request
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {token})

  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  // 🐨 do a very similar setup to the previous test
  // 🐨 create a custom config that specifies properties like "mode" of "cors" and a custom header
  // 🐨 call the client with the endpoint and the custom config
  // 🐨 verify the request had the correct properties
  let request
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}

  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  const customConfig = {
    method: 'PUT',
    headers: {'Content-Type': 'fake-type'},
  }

  await client(endpoint, customConfig)

  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type'],
  )
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  // 🐨 create a mock data object
  // 🐨 create a server handler very similar to the previous ones to handle the post request
  //    💰 Use rest.post instead of rest.get like we've been doing so far
  // 🐨 call client with an endpoint and an object with the data
  //    💰 client(endpoint, {data})
  // 🐨 verify the request.body is equal to the mock data object you passed

  const endpoint = 'test-endpoint'

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body))
    }),
  )

  const data = {a: 'b'}

  const result = await client(endpoint, {data})

  expect(result).toEqual(data)
})

test('automatically logs the user out if a request returns a 401', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint).catch(e => e)

  expect(result.message).toMatchInlineSnapshot(`"Please re-authenticate."`)

  expect(queryCache.clear).toHaveBeenCalledTimes(1)
  expect(auth.logout).toHaveBeenCalledTimes(1)
})

test('Correctly rejects the promise if there is an error', async () => {
  const endpoint = 'test-endpoint'
  const testError = {message: 'Test error'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    }),
  )

  // can test Promises by testing 'resolves' and 'rejects' like below
  await expect(client(endpoint)).rejects.toEqual(testError)
})