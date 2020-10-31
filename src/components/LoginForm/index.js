import React, {useContext} from 'react'
import {Global} from '../../context.js'

const LoginForm = () => {
  const {domain} = useContext(Global)

  const handleSubmit = () => {
    domain
      .get('loginUserUseCase')
      .execute({username: 'carlosvillu', password: '123abc'})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user" />
      <input type="text" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'
export default LoginForm
