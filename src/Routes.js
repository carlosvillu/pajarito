import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Trinos} from './pages/Trinos/Trinos'
import {Login} from './pages/Login/Login'
import {Register} from './pages/Register/Register'

export function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Trinos} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  )
}
