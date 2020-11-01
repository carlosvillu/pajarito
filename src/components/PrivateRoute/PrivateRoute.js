import React, {useState, useEffect, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Global} from '../../contexts/global'

export function PrivateRoute({component: Component, ...rest}) {
  const {domain} = useContext(Global)
  const [user, setUser] = useState(null)

  // needs login on each refresh
  useEffect(() => {
    domain
      .get('currentUserUseCase')
      .execute()
      .then(([error, data]) => {
        if (error) {
          return window.alert(error.message)
        }
        setUser(data)
      })
  }, [domain])

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
