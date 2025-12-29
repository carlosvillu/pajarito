import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import s from './LoginForm.module.scss'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, Form, useNavigation } from 'react-router'

export function LoginForm({ actionData }) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Paper elevation={3} className={s['login-form']}>
      <Typography variant="h4" component="h1">
        Login
      </Typography>
      <Form method="post" noValidate className={s['login-form__form']}>
        <TextField
          name="username"
          label="User Name"
          variant="outlined"
          required
          disabled={isSubmitting}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          required
          disabled={isSubmitting}
        />

        {actionData?.error && (
          <Typography color="error" variant="body2">
            {actionData.error}
          </Typography>
        )}

        <div className={s['login-form__actions']}>
          <Button
            type="button"
            color="primary"
            component={Link}
            to="/register"
            disabled={isSubmitting}
          >
            Register
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </Form>
    </Paper>
  )
}

LoginForm.propTypes = {
  actionData: PropTypes.object,
}
