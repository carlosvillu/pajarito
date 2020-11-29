import React from 'react'
import Container from '@material-ui/core/Container'
import s from './Register.module.scss'
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'

export function Register() {
  return (
    <Container maxWidth="sm" className={s.register}>
      <div className={s.register__content}>
        <RegisterForm />
      </div>
    </Container>
  )
}
