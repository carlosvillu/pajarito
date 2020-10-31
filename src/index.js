import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import {Pajarito} from './domain'

const pajarito = new Pajarito()

async function render() {
  const [error, trinos] = await pajarito.get('listTrinoUseCase').execute()

  switch (error.constructor.name) {
    case 'NotFoundListTrinoError':
      console.error(error.message)
      break
    default:
  }

  ReactDOM.render(
    <React.StrictMode>
      <h1>Pajaritos</h1>
      <code>
        <pre>{error && error.message}</pre>
        <pre>{trinos && JSON.stringify(trinos, null, 2)}</pre>
      </code>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render()
