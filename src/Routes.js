import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Trinos } from './pages/Trinos/Trinos'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Trinos />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
