import React from 'react'
import {Layout} from '../../components/Layout/Layout'
import Container from '@material-ui/core/Container'
import s from './Trinos.module.scss'
import {TrinoList} from '../../components/TrinoList/TrinoList'

export function Trinos() {
  return (
    <Layout name="Trinos" userName="Gabi">
      <Container maxWidth="sm" className={s.trinos__container}>
        <TrinoList />
      </Container>
    </Layout>
  )
}
