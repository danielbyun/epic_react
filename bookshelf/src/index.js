import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
import {App} from './app'

loadDevTools(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
=======
import {Profiler} from 'components/profiler'
import {App} from './app'
import {AppProviders} from './context'

loadDevTools(() => {
  ReactDOM.render(
    <Profiler id="App Root" phases={['mount']}>
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>,
    document.getElementById('root'),
  )
>>>>>>> 29b1c3bb693e0c2b81465d1427e29bee3379f8fc
})
