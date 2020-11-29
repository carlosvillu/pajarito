import React, {useEffect, useState, useContext} from 'react'
import {Layout} from '../../components/Layout/Layout'
import Container from '@material-ui/core/Container'
import s from './Trinos.module.scss'
import {TrinoList} from '../../components/TrinoList/TrinoList'
import PropTypes from 'prop-types'
import {AddTrinoFavButton} from '../../components/AddTrinoFavButton/AddTrinoFavButton'

import {Global} from '../../contexts/global'

export function Trinos({user}) {
  const {domain} = useContext(Global)
  const [trinos, setTrinos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fn() {
      const [error, data] = await domain.get('listTrinoUseCase').execute()

      if (error) {
        return setError({
          name: error.constructor.name,
          message: error.message
        })
      }

      return setTrinos(data.trinos)
    }

    fn()
  }, [domain])

  useEffect(() => {
    const createTrinoUseCase$ = domain.get('createTrinoUseCase').$.execute.subscribe( // eslint-disable-line
        ({result}) => {setTrinos([result, ...trinos])}, // eslint-disable-line
        error => {window.alert(error)} // eslint-disable-line
      )

    return () => createTrinoUseCase$.dispose()
  }, [domain, trinos])

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
