import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import s from './Layout.module.scss'
import {useHistory} from 'react-router-dom'

import {Global} from '../../contexts/global'

export function Layout({name, userName, children}) {
  const {domain} = useContext(Global)
  const history = useHistory()

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
  children: PropTypes.children
}
