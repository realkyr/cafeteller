import React, { useEffect } from 'react'
import firebase from 'plugins/firebaseclient'
import 'firebase/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Spin, Typography, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

let { Title } = Typography

export default function auth () {
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />
  const router = useRouter()

  useEffect(() => {
    let unsub
    const didMount = async () => {
      // if no query in path
      if (!router.asPath.includes('code')) {
        router.push('/')
      }

      // verify code
      if (router.query.code) {
        try {
          const response = await axios.get(
            '/api/auth?code=' + router.query.code
          )
          localStorage.setItem('methods', 'instagram')
          localStorage.setItem('access_token', response.data.credential.access_token)
          const token = response.data.customToken
          await firebase.auth().signInWithCustomToken(token)
          unsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
              message.success('Login Successful')
              router.push('/')
            }
          })
        } catch (error) {
          if (error.response) {
            message.error(error.response.data.error_message)
          } else {
            message.error(error.message)
          }
        }
      }
    }
    didMount()

    return () => { unsub && unsub() }
  }, [router])

  return (
    <Page>
      <Title level={3}>Signing In</Title>
      <Spin indicator={antIcon} />
    </Page>
  )
}

Title = styled(Title)`
  font-family: Georgia;
  margin-right: 10px;
`

const Page = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
