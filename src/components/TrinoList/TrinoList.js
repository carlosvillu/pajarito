import React from 'react'
import s from './TrinoList.module.scss'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

function TrinoItem({ trino }) {
  const { body, images, user } = trino

  const getGridClass = () => {
    if (!images || images.length === 0) return ''
    if (images.length === 1) return s['trino-list__images--single']
    if (images.length === 2) return s['trino-list__images--two']
    return s['trino-list__images--four']
  }

  return (
    <Paper elevation={3} className={s['trino-list__trino']}>
      <Typography
        variant="body2"
        component="p"
        className={s['trino-list__username']}
      >
        @{user.username}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        className={s['trino-list__body']}
      >
        {body.body}
      </Typography>

      {images && images.length > 0 && (
        <Box className={`${s['trino-list__images']} ${getGridClass()}`}>
          {images.map((imageUrl, index) => (
            <Box key={index} className={s['trino-list__image-item']}>
              <img src={imageUrl} alt={`Trino image ${index + 1}`} />
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  )
}

export function TrinoList({ trinos }) {
  return (
    <section className={s['trino-list']}>
      {trinos.map((trino) => (
        <TrinoItem key={trino.id} trino={trino} />
      ))}
    </section>
  )
}

TrinoList.propTypes = {
  trinos: PropTypes.array,
}

TrinoItem.propTypes = {
  trino: PropTypes.object,
}
