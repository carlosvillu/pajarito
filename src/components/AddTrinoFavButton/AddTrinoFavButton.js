import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { AddTrinoForm } from '../AddTrinoForm/AddTrinoForm'
import s from './AddTrinoFavButton.module.scss'

export function AddTrinoFavButton({ user }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        className={s['add-trino-fav-button']}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <MuiDialogTitle
          disableTypography
          className={s['add-trino-fav-button__dialog-header']}
        >
          <Typography variant="h6">Add a Trino</Typography>
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <AddTrinoForm user={user} cb={() => setOpen(false)} />
      </Dialog>
    </>
  )
}

AddTrinoFavButton.propTypes = {
  user: PropTypes.object,
}
