import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import firebase from 'plugins/firebaseclient'
import 'firebase/auth'

import { Button, Typography } from 'antd'

const { Title } = Typography

export default function Admin () {
  const [user, setUser] = useState(null)
  const [isAdmin, setAdmin] = useState(false)

  const verifyToken = () => {
    // TODO: verify if token still valid
    return true
  }

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const isTokenValid = verifyToken()
        if (!isTokenValid) firebase.auth().signOut()
        setUser(user)
        const idtoken = await user.getIdTokenResult()
        setAdmin(idtoken.claims.isAdmin)
      } else {
        setUser(undefined)
        setAdmin(false)
      }
    })

    return () => { unsub && unsub() }
  }, [])

  return (
    <div style={{ minHeight: '80vh' }}>
      <ul>
        <li>
          <Title level={2}>Welcome { user ? user.uid : 'Guest' }</Title>
        </li>
        <li>
          {
            !user
              ? <a
                href={`https://api.instagram.com/oauth/authorize?app_id=569501966932938&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_IG_URL}/auth&scope=user_profile,user_media&response_type=code`}
              >
                Log in
              </a>
              : <Button onClick={() => {
                firebase.auth().signOut()
                localStorage.removeItem('access_token')
              }} type="link">Log out</Button>
          }
        </li>
        {
          isAdmin && <li>
            <Link href="/reviews/add">add review</Link>
          </li>
        }
      </ul>
    </div>
  )
}
