import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Trinos } from './pages/Trinos/Trinos'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Trinos} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}
