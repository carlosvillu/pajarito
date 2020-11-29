import React from 'react'
import Container from '@material-ui/core/Container'
import s from './Login.module.scss'
import {LoginForm} from '../../components/LoginForm/LoginForm'

export function Login() {
  return (
    <Container maxWidth="sm" className={s.login}>
      <div className={s.login__content}>
        <LoginForm />
      </div>
    </Container>
  )
}
