import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'

const useProfile = () => {
  const [profile, setProfile] = React.useState<User | false | null>(null)
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false)

  useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setProfile(user)
        const idtoken = await user.getIdTokenResult()
        setIsAdmin(idtoken.claims.isAdmin as boolean)
      } else {
        setProfile(false)
        setIsAdmin(false)
      }
    })
    return () => {
      unsub && unsub()
    }
  }, [])

  return { profile, isAdmin }
}

export default useProfile
