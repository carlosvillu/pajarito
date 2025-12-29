import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import s from './Layout.module.scss'
import { useNavigate } from 'react-router-dom'

import { Global } from '../../contexts/global'

export function Layout({ name, userName, children }) {
  const { domain } = useContext(Global)
  const navigate = useNavigate()

  async function handleLogout() {
    const [error] = await domain.get('logoutUserUseCase').execute()

    if (error) {
      return window.alert(error.message)
    }
    navigate('/login')
  }

  return (
    <div className={s.layout}>
      <AppBar position="static" color="transparent">
        <Container maxWidth="sm">
          <Toolbar className={s.layout__toolbar} disableGutters>
            <Typography variant="h6">
              <span onClick={handleLogout}>{name}</span>
            </Typography>

            <Button startIcon={<AccountCircle />} color="inherit">
              <Typography variant="body1">{userName}</Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={s.content}>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  name: PropTypes.string,
  userName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}
