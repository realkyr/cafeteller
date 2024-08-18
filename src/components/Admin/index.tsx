import React from 'react'
import withMeta from '@/hoc/withMeta'
import { getAPIHealthCheck } from '@/services'
import useSWR from 'swr'
import useProfile from '@/hooks/useProfile'
import Show from '@/components/ui/Show'
import dynamic from 'next/dynamic'

const Button = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Button),
  { ssr: false }
)

const CoffeeLoader = dynamic(
  () =>
    import('core_cafeteller/components').then((module) => module.CoffeeLoader),
  { ssr: false }
)

const LOGIN_URL = `https://api.instagram.com/oauth/authorize?app_id=569501966932938&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_IG_URL}/auth&scope=user_profile,user_media&response_type=code`

const Admin = () => {
  const { profile, isAdmin } = useProfile()
  const { data, error } = useSWR(isAdmin && 'getAPIHealthCheck', () =>
    getAPIHealthCheck()
  )

  console.log({
    isAdmin
  })

  return (
    <div className='p-8'>
      <h1>Admin Page</h1>

      <Show when={!isAdmin}>
        <Button
          type='primary'
          onClick={() => {
            window.location.href = LOGIN_URL
          }}
        >
          Sign In
        </Button>
      </Show>

      <Show when={isAdmin}>
        <div className='grid grid-cols-3'>
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
  )
}

export default withMeta(Admin, {
  title: 'Admin',
  description: 'Admin Page',
  keywords: ['admin', 'page']
})
