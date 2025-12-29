import React, { useState } from 'react'
import { useFetcher } from 'react-router'
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

export function AddTrinoFavButton({ user, isSubmitting }) {
  const [open, setOpen] = useState(false)
  const fetcher = useFetcher()

  const handleClose = () => {
    setOpen(false)
  }

  const isSubmittingForm = fetcher.state !== 'idle'

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        className={s['add-trino-fav-button']}
        disabled={isSubmitting}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick={isSubmittingForm}
        disableEscapeKeyDown={isSubmittingForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          disableTypography
          className={s['add-trino-fav-button__dialog-header']}
        >
          <Typography variant="h6">Add a Trino</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            disabled={isSubmittingForm}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <AddTrinoForm
          user={user}
          fetcher={fetcher}
          cb={handleClose}
          isTestEnv={false}
        />
      </Dialog>
    </>
  )
}

AddTrinoFavButton.propTypes = {
  user: PropTypes.object,
  isSubmitting: PropTypes.bool,
}
