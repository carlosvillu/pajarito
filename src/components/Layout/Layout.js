import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import s from './Layout.module.scss'

export function Layout({ name, userName, isSubmitting, onLogout, children }) {
  return (
    <div className={s.layout}>
      <AppBar position="static" color="transparent">
        <Container maxWidth="sm">
          <Toolbar className={s.layout__toolbar} disableGutters>
            <Typography variant="h6">
              <span
                onClick={onLogout}
                style={{
                  cursor: 'pointer',
                  opacity: isSubmitting ? 0.5 : 1,
                }}
              >
                {name}
              </span>
            </Typography>

            <Button
              startIcon={<AccountCircle />}
              color="inherit"
              disabled={isSubmitting}
            >
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
  isSubmitting: PropTypes.bool,
  onLogout: PropTypes.func,
  children: PropTypes.node,
}
