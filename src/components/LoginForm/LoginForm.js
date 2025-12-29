import React, { useState, useEffect, useContext } from 'react'
import Paper from '@mui/material/Paper'
import s from './LoginForm.module.scss'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Global } from '../../contexts/global'

export function LoginForm() {
  const { domain } = useContext(Global)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    domain
      .get('currentUserUseCase')
      .execute()
      .then(([error, user]) => {
        if (error) {
          console.log(error) // eslint-disable-line no-console
          return null
        }
        user && navigate('/')
      })
  }, [domain, navigate])

  async function onLogin(e) {
    e.preventDefault()
    const [error] = await domain.get('loginUserUseCase').execute(data)
    if (error) return console.log(error) // eslint-disable-line no-console
    navigate('/')
  }

  function onChange(e) {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  return (
    <Paper elevation={3} className={s['login-form']}>
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <form noValidate className={s['login-form__form']} onSubmit={onLogin}>
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

        <div className={s['login-form__actions']}>
          <Button type="Button" color="primary" component={Link} to="/register">
            Register
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </Paper>
  )
}
