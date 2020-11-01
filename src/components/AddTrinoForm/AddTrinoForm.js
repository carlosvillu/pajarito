import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import s from './AddTrinoForm.module.scss'

import {Global} from '../../contexts/global'

export function AddTrinoForm({cb}) {
  const {domain} = useContext(Global)
  const [data, setData] = useState({})

  async function onAddTrino(e) {
    e.preventDefault()
    const [error, trino] = await domain.get('createTrinoUseCase').execute(data)

    if (error) {
      return window.alert(error.message)
    }

    cb(trino)
  }

  function onChange(e) {
    const {name, value} = e.target

    setData({...data, [name]: value})
  }

  return (
    <form noValidate className={s['add-trino-form']} onSubmit={onAddTrino}>
      <TextField
        name="body"
        label="Trino text"
        variant="outlined"
        multiline
        rows={9}
        onChange={onChange}
      />

      <div className={s['add-trino-form__actions']}>
        <Button type="submit" color="primary" variant="contained">
          Send
        </Button>
      </div>
    </form>
  )
}

AddTrinoForm.propTypes = {
  cb: PropTypes.function
}
