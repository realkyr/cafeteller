import React from 'react'
import withMeta from '@/hoc/withMeta'
import { getAPIHealthCheck } from '@/services'
import useSWR from 'swr'

const Admin = () => {
  const { data, error } = useSWR('getAPIHealthCheck', () => getAPIHealthCheck())

  return (
    <div className='p-8'>
      <h1>Admin Page</h1>

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
    </div>
  )
}

export default withMeta(Admin, {
  title: 'Admin',
  description: 'Admin Page',
  keywords: ['admin', 'page']
})
