import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
