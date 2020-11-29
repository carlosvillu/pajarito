import React from 'react'
import s from './TrinoList.module.scss'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

export function TrinoList({trinos}) {
  return (
    <section className={s['trino-list']}>
      {trinos.map(trino => (
        <Paper elevation={3} key={trino.id} className={s['trino-list__trino']}>
          <Typography variant="body1" component="p">
            {trino.body.body}
          </Typography>
        </Paper>
      ))}
    </section>
  )
}

TrinoList.propTypes = {
  trinos: PropTypes.array
}
