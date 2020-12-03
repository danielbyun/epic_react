// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

// 💰 Use the className for the size and style (backgroundColor) for the color
// 💰 each of the elements should also have the "box" className applied

// 🐨 add a className prop to each of these and apply the correct class names
// 💰 Here are the available class names: box, box--large, box--medium, box--small

// 🐨 add a style prop to each of them as well so their background color
// matches what the text says it should be as well as `fontStyle: 'italic'`
const font = {fontStyle: 'italic'}
const smallBox = (
  <div
    className="box box--small"
    style={{backgroundColor: 'lightblue', ...font}}
  >
    small lightblue box
  </div>
)
const mediumBox = (
  <div className="box box--medium" style={{backgroundColor: 'pink', ...font}}>
    medium pink box
  </div>
)
const largeBox = (
  <div className="box box--large" style={{backgroundColor: 'orange', ...font}}>
    large orange box
  </div>
)

// my answer
const Box = ({className, style, children}) => {
  const sizing =
    className === 'small'
      ? 'box box--small'
      : className === 'medium'
      ? 'box box--medium'
      : className === 'large'
      ? 'box box--large'
      : 'box'
  return (
    <div className={sizing} style={style}>
      {children}
    </div>
  )
}

// kent's answer
const BoxImproved = ({className = '', size, style, ...otherProps}) => {
  const sizeClassName = size ? `box--${size}` : ''
  return (
    <div
      className={`box ${sizeClassName} ${className}`.trim()}
      style={{...style}}
      {...otherProps}
    />
  )
}

const App = () => {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
      <Box
        className="large"
        style={{backgroundColor: 'purple', fontStyle: 'italic'}}
      >
        Large Box
      </Box>
      <BoxImproved
        size="large"
        style={{fontStyle: 'italic', backgroundColor: 'grey'}}
      >
        Large Box Improved
      </BoxImproved>
    </div>
  )
}

export default App
