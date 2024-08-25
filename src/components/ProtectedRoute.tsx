import React, { useEffect, ReactNode } from 'react'
import useProfile from '@/hooks/useProfile'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const CoffeeLoader = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.CoffeeLoader),
  { ssr: false }
)

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { profile } = useProfile()
  const router = useRouter()

  useEffect(() => {
    if (profile !== null && !profile) {
      router.push('/').then()
    }
  }, [profile, router])

  if (profile === null) {
    // unknown status
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <CoffeeLoader />
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
