import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import {Pajarito} from './domain'

const pajarito = new Pajarito()

async function render() {
  const trinos = await pajarito.get('listTrinoUseCase').execute()
  ReactDOM.render(
    <React.StrictMode>
      <h1>Pajaritos</h1>
      <code>
        <pre>{JSON.stringify(trinos, null, 2)}</pre>
      </code>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render()
