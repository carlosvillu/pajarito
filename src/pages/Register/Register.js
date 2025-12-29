import React from 'react'
import Container from '@mui/material/Container'
import s from './Register.module.scss'
import { RegisterForm } from '../../components/RegisterForm/RegisterForm'
import { useActionData } from 'react-router'

export function Register() {
  const actionData = useActionData()

  return (
    <Container maxWidth="sm" className={s.register}>
      <div className={s.register__content}>
        <RegisterForm actionData={actionData} />
      </div>
    </Container>
  )
}
