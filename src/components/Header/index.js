import React, {useEffect, useState, useContext} from 'react'
import {Global} from '../../context.js'

const Header = () => {
  const [username, setUsername] = useState()
  const {domain} = useContext(Global)

  useEffect(() => {
    const loginUserUseCase$ = domain.get('loginUserUseCase').$.execute(
      ({result}) => {
        setUsername(result.username)
      },
      error => {
        console.error('Handle HERE the error', error) // eslint-disable-line
      }
    )

    return () => loginUserUseCase$.dispose()
  })

  return (
    <header>
      <h1>Title</h1>
      {username ? <span>{username}</span> : <a href="/login">login</a>}
    </header>
  )
}

Header.displayName = 'Header'
export default Header
