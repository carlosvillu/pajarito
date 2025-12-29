import React, { useState, useContext } from 'react'
import Paper from '@mui/material/Paper'
import s from './RegisterForm.module.scss'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'

import { Global } from '../../contexts/global'

export function RegisterForm() {
  const { domain } = useContext(Global)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  async function onRegister(e) {
    e.preventDefault()
    const [error] = await domain.get('registerUserUseCase').execute(data)

    if (error) {
      return window.alert(error.message)
    }
    navigate('/login')
  }

  function onChange(e) {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  return (
    <Paper elevation={3} className={s['register-form']}>
      <Typography variant="h4" component="h1">
        Register
      </Typography>
      <form
        noValidate
        className={s['register-form__form']}
        onSubmit={onRegister}
      >
        <TextField
          name="username"
          label="User Name"
          variant="outlined"
          onChange={onChange}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={onChange}
        />

        <div className={s['register-form__actions']}>
          <Button type="Button" color="primary" component={Link} to="/login">
            Login
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Create User
          </Button>
        </div>
      </form>
    </Paper>
  )
}
