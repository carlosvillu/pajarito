import React from 'react'
import Paper from '@material-ui/core/Paper'
import s from './LoginForm.module.scss'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

export function LoginForm() {
  return (
    <Paper elevation="3" className={s['login-form']}>
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <form noValidate className={s['login-form__form']}>
        <TextField label="userName" variant="outlined" />
        <TextField label="password" variant="outlined" type="password" />

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
