import React from 'react'
import withMeta from '@/hoc/withMeta'
import { getAPIHealthCheck } from '@/services'
import useSWR from 'swr'
import useProfile from '@/hooks/useProfile'
import Show from '@/components/ui/Show'
import dynamic from 'next/dynamic'
import { Instagram } from '@/icons'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@firebase/auth'
import { useRouter } from 'next/router'
import NavbarContainer from '@/components/ui/NavbarContainer'
import Footer from '@/components/ui/Footer'

const Button = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Button),
  { ssr: false }
)

const LOGIN_URL = `https://api.instagram.com/oauth/authorize?app_id=569501966932938&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_IG_URL}/auth&scope=user_profile,user_media&response_type=code`

const Admin = () => {
  const router = useRouter()
  const { profile, isAdmin } = useProfile()
  const { data, error } = useSWR(isAdmin && 'getAPIHealthCheck', () =>
    getAPIHealthCheck()
  )

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      router.push('/').then()
    })
  }

  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-500 mb-6">
            Please log in to access the admin dashboard.
          </p>
          <button
            onClick={() => {
              window.location.href = LOGIN_URL
            }}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg inline-flex items-center"
          >
            <Instagram className="mr-2" />
            Login with Instagram
          </button>

          <div className="text-gray-400">or</div>

          <button onClick={async () => {
            const auth = getAuth();
            const provider = new GoogleAuthProvider()

            try {
              const result = await signInWithPopup(auth, provider)
              const user = result.user
              // optional: send user info to your backend or set state
              console.log('User info:', user)
            } catch (error) {
              console.error('Google login error:', error)
            }
          }} className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                  <path fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Sign in with Google</span>
              <span style={{
                display: 'none'
              }}>Sign in with Google</span>
            </div>
          </button>
        </div>
      </div>
    )

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Unauthorized</h1>
          <p className="th">คุณไม่ใช่ผู้ดูแลกรุณาติดต่อซัพพอร์ต</p>

          <Button className="mt-2" onClick={handleLogout} type="danger" outline>
            Log Out
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <NavbarContainer />
      <div className="p-8 h-screen">
        <Show when={!!(isAdmin && profile)}>
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <h2>
            Welcome, {(profile as User).displayName}{' '}
            <Button onClick={handleLogout} type="danger" outline>
              Log Out
            </Button>
          </h2>

          <div className="grid grid-cols-3 mt-4">
            <div>
              <pre>
                <h2>Site Status</h2>
                <pre>
                  Version:{' '}
                  {process.env.NEXT_PUBLIC_GIT_COMMIT?.slice(0, 7) || 'local'}
                </pre>
              </pre>
            </div>

            {data && (
              <div>
                <pre>
                  <h2>API-V2 Status</h2>
                  Version: {data.version}
                  <br />
                  Environment: {data.environment}
                </pre>
              </div>
            )}
          </div>
        </Show>
      </div>

      <Footer />
    </>
  )
}

export default withMeta(Admin, {
  title: 'Admin',
  description: 'Admin Page',
  keywords: ['admin', 'page']
})
