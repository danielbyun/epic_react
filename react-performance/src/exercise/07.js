// Production performance monitoring
// http://localhost:3000/isolated/exercise/07.js

import * as React from 'react'
// 🐨 you're going to need the reportProfile function
// 💰 here, let me help you with that...
import {unstable_trace as trace} from 'scheduler/tracing'
import reportProfile from '../report-profile'

const Counter = () => {
  const [count, setCount] = React.useState(0)
  // 1st argument = the name of the thing we're tracing
  // 2nd argument = when this interaction started
  // 3rd argument = callback function for the thing that we want to have happen
  const increment = trace('click', performance.now(), () =>
    setCount(c => c + 1),
  )
  return <button onClick={increment}>{count}</button>
}

const App = () => {
  return (
    <div>
      {/*
      🐨 Wrap this div in a React.Profiler component
      give it the ID of "counter" and pass reportProfile
      to the onRender prop.
      */}
      <React.Profiler id="counter" onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
        <div>
          Unprofiled counter (test)
          <Counter />
        </div>
      </React.Profiler>
    </div>
  )
}

export default App
