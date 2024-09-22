import { useEffect } from 'react'
import axios from '@/utils/axios'
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  Unsubscribe
} from '@firebase/auth'
import { useRouter } from 'next/router'
import { message } from 'antd'

interface CodeExchangeResponse {
  credential: { access_token: string }
  customToken: string
}

const useExchangeCode = () => {
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    let unsub: Unsubscribe | undefined

    const didMount = async () => {
      // if no query in path
      if (!router.asPath.includes('code')) {
        router.push('/admin').then()
        return
      }

      // verify code
      if (router.query.code) {
        try {
          const response = await axios.get<CodeExchangeResponse>(
            process.env.NEXT_PUBLIC_PATH_AUTH || '/auth',
            {
              params: {
                code: router.query.code
              }
            }
          )

          localStorage.setItem('methods', 'instagram')
          localStorage.setItem(
            'access_token',
            response.data.credential.access_token
          )

          const token = response.data.customToken
          await signInWithCustomToken(auth, token)
          unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
              message.success('Login Successful')
              router.push('/admin')
            }
          })
        } catch (error: any) {
          if (error.response) {
            message.error(error.response.data.error_message)
          } else {
            message.error(error.message)
          }

          router.push('/admin').then()
        }
      }
    }

    didMount().then()

    return () => {
      if (unsub) unsub()
    }
  }, [router])
}

export default useExchangeCode
