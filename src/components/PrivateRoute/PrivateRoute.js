import React from 'react'
// import React, {useState, useEffect, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

// import {Global} from '../../contexts/global'
const EMPTY_DB = JSON.stringify({})
const USERS_KEY = 'users'
const CURRENT_USER_KEY = '__CURRENT_USER__'

export function PrivateRoute({component: Component, ...rest}) {
  // const {domain} = useContext(Global)
  // const [user, setUser] = useState(null)

  // can't get this work with domain
  const usersJSON = window.localStorage.getItem(USERS_KEY) || EMPTY_DB
  const usersDB = JSON.parse(usersJSON)
  const user = usersDB[CURRENT_USER_KEY]

  // // needs login on each refresh
  // useEffect(() => {
  //   async function fn() {
  //     const [error, data] = await domain.get('currentUserUseCase').execute()
  //     if (error) return console.log(error)
  //
  //     setUser(data)
  //   }
  //
  //   fn()
  // }, [domain])

  if (user) console.log(user)
  if (!user) console.log('not user')

  return (
    <Route
      {...rest}
      render={({location}) =>
        user ? (
          <Component user={user} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location}
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType
}
