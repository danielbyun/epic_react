import React from 'react'
import {client} from 'utils/api-client'

let queue = []

setInterval(sendProfileQueue, 5000)

function sendProfileQueue() {
  if (!queue.length) return Promise.resolve({success: true})

  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend})
}

// this is for extra credit
function Profiler({phases, metadata, ...props}) {
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
        metadata,
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
