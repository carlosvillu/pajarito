import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
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
        <DialogTitle
          disableTypography
          className={s['add-trino-fav-button__dialog-header']}
        >
          <Typography variant="h6">Add a Trino</Typography>
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <AddTrinoForm user={user} cb={() => setOpen(false)} />
      </Dialog>
    </>
  )
}

AddTrinoFavButton.propTypes = {
  user: PropTypes.object,
}
