<<<<<<< HEAD
// no final
=======
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
const apiURL = process.env.REACT_APP_API_URL
>>>>>>> 29b1c3bb693e0c2b81465d1427e29bee3379f8fc

async function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

<<<<<<< HEAD
// 💯 automatically logout on 401
// export * from './api-client.extra-3'

// 💯 Support posting data
// export * from './api-client.extra-4'
=======
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      queryCache.clear()
      await auth.logout()
      // refresh the page for them
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
>>>>>>> 29b1c3bb693e0c2b81465d1427e29bee3379f8fc
