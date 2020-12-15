// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

// exercise
// const useToggle = () => {
//   const [on, setOn] = React.useState(false)
//   const toggle = () => setOn(!on)

//   // 🐨 Add a property called `togglerProps`. It should be an object that has
//   // `aria-pressed` and `onClick` properties.
//   // 💰 {'aria-pressed': on, onClick: toggle}
//   const togglerProps = {'aria-pressed': on, onClick: toggle}
//   return {on, togglerProps}
// }

// exercise
// const App = () => {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

const callAll = (...fns) => {
  return (...args) => {
    fns.forEach(fn => {
      fn && fn(...args)
    })
  }
}

const useToggle = () => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

// extra credit
const App = () => {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
