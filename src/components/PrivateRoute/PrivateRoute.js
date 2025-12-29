import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const EMPTY_DB = JSON.stringify({})
const USERS_KEY = 'users'
const CURRENT_USER_KEY = '__CURRENT_USER__'

export function PrivateRoute({ children }) {
  const location = useLocation()

  const usersJSON = window.localStorage.getItem(USERS_KEY) || EMPTY_DB
  const usersDB = JSON.parse(usersJSON)
  const user = usersDB[CURRENT_USER_KEY]

  if (user) console.log(user)
  if (!user) console.log('not user')

  return user ? (
    React.cloneElement(children, { user })
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}
