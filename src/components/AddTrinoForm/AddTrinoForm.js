import React, { useState, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import Box from '@mui/material/Box'
import s from './AddTrinoForm.module.scss'

import { Global } from '../../contexts/global'
import { fileToBase64, validateImages } from '../../utils/fileToBase64'

export function AddTrinoForm({ cb }) {
  const { domain } = useContext(Global)
  const [data, setData] = useState({})
  const [images, setImages] = useState([])
  const [imageErrors, setImageErrors] = useState([])
  const fileInputRef = useRef(null)

  async function onAddTrino(e) {
    e.preventDefault()
    const [error, trino] = await domain.get('createTrinoUseCase').execute({
      ...data,
      images: images.map((img) => img.dataUrl),
    })

    if (error) {
      return window.alert(error.message)
    }

    setData({})
    setImages([])
    setImageErrors([])
    cb(trino)
  }

  function onChange(e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  async function onImageSelect(e) {
    const files = e.target.files
    const validation = validateImages(files)

    if (!validation.valid) {
      window.alert(validation.error)
      return
    }

    const newImageErrors = []
    const newImages = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const result = await fileToBase64(file)

      if (result.success) {
        newImages.push({
          id: Date.now() + i,
          dataUrl: result.dataUrl,
          name: file.name,
        })
      } else {
        newImageErrors.push(result.error)
      }
    }

    if (newImageErrors.length > 0) {
      setImageErrors(newImageErrors)
    }

    setImages((prev) => [...prev, ...newImages].slice(0, 4))

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function removeImage(imageId) {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  function triggerFileSelect() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
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
        value={data.body || ''}
      />

      {images.length > 0 && (
        <Box className={s['add-trino-form__images-preview']}>
          {images.map((image) => (
            <Box key={image.id} className={s['add-trino-form__image-item']}>
              <img src={image.dataUrl} alt={image.name} />
              <IconButton
                size="small"
                className={s['add-trino-form__remove-btn']}
                onClick={() => removeImage(image.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {imageErrors.length > 0 && (
        <Box className={s['add-trino-form__errors']}>
          {imageErrors.map((err, i) => (
            <Box
              key={i}
              component="span"
              className={s['add-trino-form__error']}
            >
              {err}
            </Box>
          ))}
        </Box>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageSelect}
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        style={{ display: 'none' }}
      />

      <div className={s['add-trino-form__actions']}>
        <IconButton
          color="primary"
          onClick={triggerFileSelect}
          disabled={images.length >= 4}
        >
          <PhotoCameraIcon />
        </IconButton>
        <Button type="submit" color="primary" variant="contained">
          Send
        </Button>
      </div>
    </form>
  )
}

AddTrinoForm.propTypes = {
  cb: PropTypes.func,
}
