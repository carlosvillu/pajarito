import React, { useEffect, useContext } from 'react'
import Container from '@mui/material/Container'
import s from './Trinos.module.scss'
import { TrinoList } from '../../components/TrinoList/TrinoList'
import PropTypes from 'prop-types'
import { AddTrinoFavButton } from '../../components/AddTrinoFavButton/AddTrinoFavButton'

import { Global } from '../../contexts/global'

export function Trinos({ trinos, user, optimisticTrino, isSubmitting }) {
  const { domain } = useContext(Global)

  // Subscribe to new trinos from other sessions
  useEffect(() => {
    const createTrinoUseCase$ = domain
      .get('createTrinoUseCase')
      .$.execute.subscribe(
        () => {
          // This will be handled by revalidation
        },
        (error) => {
          window.alert(error)
        }
      )

    return () => createTrinoUseCase$.dispose()
  }, [domain])

  // Use optimistic trino if available
  const displayTrinos = optimisticTrino ? [optimisticTrino, ...trinos] : trinos

  return (
    <Container maxWidth="sm" className={s.trinos__container}>
      {optimisticTrino && (
        <div className={s.trinos__optimistic}>Posting...</div>
      )}
      <TrinoList trinos={displayTrinos} />
      <AddTrinoFavButton user={user} isSubmitting={isSubmitting} />
    </Container>
  )
}

Trinos.propTypes = {
  trinos: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  optimisticTrino: PropTypes.object,
  isSubmitting: PropTypes.bool,
}
