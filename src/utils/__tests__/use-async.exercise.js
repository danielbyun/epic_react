// 🐨 instead of React Testing Library, you'll use React Hooks Testing Library
import {renderHook, act} from '@testing-library/react-hooks'
// 🐨 Here's the thing you'll be testing:
import {useAsync} from '../hooks'

// 💰 I'm going to give this to you. It's a way for you to create a promise
// which you can imperatively resolve or reject whenever you want.
const deferred = () => {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

beforeEach(() => {
  jest.spyOn(console, 'error')
})

afterEach(() => {
  console.error.mockStore()
})

// Use it like this:
// const {promise, resolve} = deferred()
// promise.then(() => console.log('resolved'))
// do stuff/make assertions you want to before calling resolve
// resolve()
// await promise
// do stuff/make assertions you want to after the promise has resolved

// 🐨 flesh out these tests
test('calling run with a promise which resolves', async () => {
  // 🐨 get a promise and resolve function from the deferred utility
  const {promise, resolve} = deferred()
  // 🐨 use renderHook with useAsync to get the result
  // 🐨 assert the result.current is the correct default state
  const {result} = renderHook(() => useAsync()) // need renderHook bc its a custom hook with useRef
  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  let p

  act(() => {
    p = result.current.run(promise)
  })

  // 🐨 call `run`, passing the promise
  //    (💰 this updates state so it needs to be done in an `act` callback)
  // 🐨 assert that result.current is the correct pending state
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'pending',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  // 🐨 call resolve and wait for the promise to be resolved
  //    (💰 this updates state too and you'll need it to be an async `act` call so you can await the promise)
  // 🐨 assert the resolved state
  const resolvedValue = Symbol('resolved value') // making sure its the same exact object, not just a copy when asserting later
  await act(async () => {
    // need to be async bc the resolve is actually async
    resolve(resolvedValue)
    await p
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: resolvedValue,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  // 🐨 call `reset` (💰 this will update state, so...)
  // 🐨 assert the result.current has actually been reset
  act(() => {
    result.current.reset()
  })

  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('calling run with a promise which rejects', async () => {
  // 🐨 this will be very similar to the previous test, except you'll reject the
  // promise instead and assert on the error state.
  // 💰 to avoid the promise actually failing your test, you can catch
  //    the promise returned from `run` with `.catch(() => {})`
  // 🐨 get a promise and resolve function from the deferred utility
  const {promise, reject} = deferred()
  // 🐨 use renderHook with useAsync to get the result
  // 🐨 assert the result.current is the correct default state
  const {result} = renderHook(() => useAsync()) // need renderHook bc its a custom hook with useRef
  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  let p

  act(() => {
    p = result.current.run(promise)
  })

  // 🐨 call `run`, passing the promise
  //    (💰 this updates state so it needs to be done in an `act` callback)
  // 🐨 assert that result.current is the correct pending state
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'pending',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  // 🐨 call resolve and wait for the promise to be resolved
  //    (💰 this updates state too and you'll need it to be an async `act` call so you can await the promise)
  // 🐨 assert the resolved state
  const rejectedValue = Symbol('rejected value') // making sure its the same exact object, not just a copy when asserting later
  await act(async () => {
    // need to be async bc the resolve is actually async
    reject(rejectedValue)
    await p.catch(() => {
      // ignores error
    })
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: rejectedValue,
    status: 'rejected',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  // 🐨 call `reset` (💰 this will update state, so...)
  // 🐨 assert the result.current has actually been reset
  act(() => {
    result.current.reset()
  })

  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can specify an initial state', async () => {
  // 💰 useAsync(customInitialState)
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: mockData,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can set the data', async () => {
  const mockData = Symbol('whatever i want')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))
  act(() => {
    result.current.setData(mockData)
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: mockData,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can set the error', async () => {
  // 💰 result.current.setError('whatever you want')
  const mockData = Symbol('whatever i want')
  const customInitialState = {status: 'resolved', error: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))

  act(() => {
    result.current.setError(mockData)
  })

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: mockData,
    status: 'rejected',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('No state updates happen if the component is unmounted while pending', async () => {
  // 💰 const {result, unmount} = renderHook(...)
  const {promise, resolve} = deferred()
  const {result, unmount} = renderHook(() => useAsync())

  let p
  act(() => {
    p = result.current.run(promise)
  })
  unmount()
  await act(async () => {
    resolve()
    await p
  })
  // 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)
  expect(console.error).not.toHaveBeenCalled()
})

test('calling "run" without a promise results in an early error', async () => {
  const {result} = renderHook(() => useAsync())
  expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
  )
})
