import React from 'react'
import {client} from 'utils/api-client'

let queue = []

setInterval(sendProfileQueue, 5000)

const sendProfileQueue = () => {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }

  const queueToSend = [...queue]
  queue = []

  return client('profile', {data: queueToSend})
}

// this is for extra credit
const Profiler = ({phases, ...props}) => {
  const reportProfile = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
  }

  return <React.Profiler onRender={reportProfile} {...props} />
}

export {Profiler}
