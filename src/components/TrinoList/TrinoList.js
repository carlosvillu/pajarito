import React from 'react'
import s from './TrinoList.module.scss'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export function TrinoList() {
  const trinos = [1, 2, 3]

  return (
    <section className={s['trino-list']}>
      {trinos.map(trino => (
        <Paper elevation="3" key={trino} className={s['trino-list__trino']}>
          <Typography variant="body1" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </Paper>
      ))}
    </section>
  )
}
