import React from 'react'
import Paper from '@material-ui/core/Paper'
import s from './RegisterForm.module.scss'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

export function RegisterForm() {
  return (
    <Paper elevation="3" className={s['register-form']}>
      <Typography variant="h4" component="h1">
        Register
      </Typography>
      <form noValidate className={s['register-form__form']}>
        <TextField label="userName" variant="outlined" />
        <TextField label="password" variant="outlined" type="password" />

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
