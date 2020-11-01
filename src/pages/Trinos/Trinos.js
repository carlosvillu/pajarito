import React, {useEffect, useState} from 'react'
import {Layout} from '../../components/Layout/Layout'
import Container from '@material-ui/core/Container'
import s from './Trinos.module.scss'
import {TrinoList} from '../../components/TrinoList/TrinoList'
import PropTypes from 'prop-types'
import {Pajarito} from '../../domain'
import {AddTrinoFavButton} from '../../components/AddTrinoFavButton/AddTrinoFavButton'

export function Trinos({user}) {
  const [trinos, setTrinos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fn() {
      const pajarito = new Pajarito()
      const [error, data] = await pajarito.get('listTrinoUseCase').execute()

      if (error) {
        return setError({
          name: error.constructor.name,
          message: error.message
        })
      }

      return setTrinos(data.trinos)
    }

    fn()
  }, [])

  return (
    <Layout name="Trinos" userName={user.username}>
      <Container maxWidth="sm" className={s.trinos__container}>
        {error ? <div>Error to get trinos</div> : <TrinoList trinos={trinos} />}
      </Container>

      <AddTrinoFavButton user={user} />
    </Layout>
  )
}

Trinos.propTypes = {
  user: PropTypes.object
}
