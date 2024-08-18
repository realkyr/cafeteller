import React from 'react'

import dynamic from 'next/dynamic'
import useExchangeCode from '@/components/Auth/hooks/useExchangeCode'

const CoffeeLoader = dynamic(
  () =>
    import('core_cafeteller/components').then((module) => module.CoffeeLoader),
  { ssr: false }
)

const Auth: React.FC = () => {
  useExchangeCode()

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <CoffeeLoader />
    </div>
  )
}

export default Auth
