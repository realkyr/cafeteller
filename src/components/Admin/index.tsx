import React from 'react'
import withMeta from '@/hoc/withMeta'
import { getAPIHealthCheck } from '@/services'
import useSWR from 'swr'
import useProfile from '@/hooks/useProfile'
import Show from '@/components/ui/Show'
import dynamic from 'next/dynamic'
import { Instagram } from '@/icons'
import { getAuth, signOut, User } from '@firebase/auth'
import { useRouter } from 'next/router'
import NavbarContainer from '@/components/ui/NavbarContainer'
import Footer from '@/components/ui/Footer'
import { uploadImageService } from '@/services/media/images'

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

  if (!isAdmin)
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-2'>Admin Login</h1>
          <p className='text-gray-500 mb-6'>
            Please log in to access the admin dashboard.
          </p>
          <button
            onClick={() => {
              window.location.href = LOGIN_URL
            }}
            className='bg-pink-600 text-white px-6 py-3 rounded-lg inline-flex items-center'
          >
            <Instagram className='mr-2' />
            Login with Instagram
          </button>
        </div>
      </div>
    )

  return (
    <>
      <NavbarContainer />
      <div className='p-8 h-screen'>
        <Show when={!!(isAdmin && profile)}>
          <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
          <h2>
            Welcome, {(profile as User).displayName}{' '}
            <Button onClick={handleLogout} type='danger' outline>
              Log Out
            </Button>
          </h2>

          <div className='grid grid-cols-3 mt-4'>
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
