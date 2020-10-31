import React, {useEffect, useState, useContext} from 'react'
import {Global} from '../../context.js'

const AsideMenu = () => {
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
    <ul>
      {username ? <li>{username}</li> : null}
      <li>home</li>
      <li>list</li>
      <li>detail</li>
    </ul>
  )
}

AsideMenu.displayName = 'AsideMenu'
export default AsideMenu
