import React, {useState} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Pajarito} from '../../domain/index'
import s from './AddTrinoForm.module.scss'

export function AddTrinoForm({cb}) {
  const [data, setData] = useState({})

  function onAddTrino(e) {
    e.preventDefault()
    const pajarito = new Pajarito()
    pajarito
      .get('createTrinoUseCase')
      .execute(data)
      .then(cb)
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
