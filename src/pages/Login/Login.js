import React from 'react'
import Container from '@mui/material/Container'
import s from './Login.module.scss'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { useActionData } from 'react-router'

export function Login() {
  const actionData = useActionData()

  return (
    <Container maxWidth="sm" className={s.login}>
      <div className={s.login__content}>
        <LoginForm actionData={actionData} />
      </div>
    </Container>
  )
}
