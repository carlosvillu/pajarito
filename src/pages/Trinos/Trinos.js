import React, {useState, useEffect} from 'react'
import {Layout} from '../../components/Layout/Layout'
import Container from '@material-ui/core/Container'
import s from './Trinos.module.scss'
import {TrinoList} from '../../components/TrinoList/TrinoList'
import {Pajarito} from '../../domain'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

export function Trinos() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const pajarito = new Pajarito()
    pajarito
      .get('currentUserUseCase')
      .execute()
      .then(data => setUser(data))
  }, [])

  if (!user)
    return (
      <Container maxWidth="sm" className={s.trinos__container}>
        Please login to see this page
        <Button type="Button" color="primary" component={Link} to="/login">
          Login
        </Button>
      </Container>
    )

  return (
    <Layout name="Trinos" userName={user.username}>
      <Container maxWidth="sm" className={s.trinos__container}>
        <TrinoList />
      </Container>
    </Layout>
  )
}
