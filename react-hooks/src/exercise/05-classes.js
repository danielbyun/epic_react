import React, {useEffect, useRef} from 'react'
import VanillaTilt from 'vanilla-tilt'

const Tilt = ({children}) => {
  const tiltRef = useRef()

  useEffect(() => {
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    return () => {
      tiltNode.vanillaTilt.destroy()
    }
  }, [])

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

const App = () => {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
