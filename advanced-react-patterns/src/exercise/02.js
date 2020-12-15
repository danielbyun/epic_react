// Compound Components

import * as React from 'react'
import {Switch} from '../switch'

const Toggle = ({children}) => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  /* return child clone here */
  return React.Children.map(children, child => {
    if (typeof child.type === 'string') {
      return child
    }

    const newChild = React.cloneElement(child, {
      on,
      toggle,
    })

    return newChild
  })
}

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({on, children}) => (on ? children : null)

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({on, children}) => (!on ? children : null)

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

const App = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span on="false" toggle="">
          Hello
        </span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
