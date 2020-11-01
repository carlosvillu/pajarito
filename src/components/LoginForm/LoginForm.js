import React, {useState, useEffect, useContext} from 'react'
import Paper from '@material-ui/core/Paper'
import s from './LoginForm.module.scss'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link, useHistory} from 'react-router-dom'
import {Global} from '../../contexts/global'

export function LoginForm() {
  const {domain} = useContext(Global)
  const [data, setData] = useState({})
  const history = useHistory()

  useEffect(() => {
    domain
      .get('currentUserUseCase')
      .execute()
      .then(([error, user]) => {
        if (error) {
          return null
        }
        user && history.push('/')
      })
  }, [domain, history])

  async function onLogin(e) {
    e.preventDefault()
    await domain.get('loginUserUseCase').execute(data)
    history.push('/')
  }

  function onChange(e) {
    const {name, value} = e.target

    setData({...data, [name]: value})
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
