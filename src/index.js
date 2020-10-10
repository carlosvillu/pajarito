import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import {Pajarito} from './domain'

const pajarito = new Pajarito()

pajarito
  .get('currentUserUseCase')
  .execute()
  .then(console.log)

// pajarito
//   .get('loginUserUseCase')
//   .execute({
//     username: '1234',
//     password: 'abcdefgh'
//   })
//   .then(console.log)

ReactDOM.render(
  <React.StrictMode>
    <h1>Pajaritos</h1>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
