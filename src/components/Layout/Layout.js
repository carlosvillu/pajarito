import React, { useContext, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import s from './Layout.module.scss'
import { useHistory } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { Global } from '../../contexts/global'

export function Layout({ name, userName, children }) {
  const { domain } = useContext(Global)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  async function handleLogout() {
    const [error] = await domain.get('logoutUserUseCase').execute()

    if (error) {
      return window.alert(error.message)
    }
    history.push('/login')
  }

  return (
    <div className={s.layout}>
      <AppBar position="static" color="transparent">
        <Container maxWidth="sm">
          <Toolbar className={s.layout__toolbar} disableGutters>
            <Typography variant="h6">
              <span>{name}</span>
            </Typography>

            <div>
              <Button
                startIcon={<AccountCircle />}
                color="inherit"
                onClick={handleMenu}
              >
                <Typography variant="body1">{userName}</Typography>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
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
