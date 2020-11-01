import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {Pajarito} from '../../domain'
import PropTypes from 'prop-types'

export function PrivateRoute({component: Component, ...rest}) {
  const [user, setUser] = useState(null)

  // needs login on each refresh
  useEffect(() => {
    const pajarito = new Pajarito()
    pajarito
      .get('currentUserUseCase')
      .execute()
      .then(data => setUser(data))
  }, [])

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
