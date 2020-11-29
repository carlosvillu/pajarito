import React, {useState, useContext} from 'react'
import Paper from '@material-ui/core/Paper'
import s from './RegisterForm.module.scss'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link, useHistory} from 'react-router-dom'

import {Global} from '../../contexts/global'

export function RegisterForm() {
  const {domain} = useContext(Global)
  const [data, setData] = useState({})
  const history = useHistory()

  async function onRegister(e) {
    e.preventDefault()
    const [error] = await domain.get('registerUserUseCase').execute(data)

    if (error) {
      return window.alert(error.message)
    }
    history.push('/login')
  }

  function onChange(e) {
    const {name, value} = e.target

    setData({...data, [name]: value})
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
