import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { loadingAtom } from '@/atom/loading'
import { CoffeeLoader } from '@/components/ui/MF'

const LoadingOverlay = () => {
  const [loading] = useAtom(loadingAtom)

  useEffect(() => {
    // disabled scrolling when loading
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [loading])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50 flex items-center justify-center ${
        loading ? 'block' : 'hidden'
      }`}
    >
      <CoffeeLoader />
    </div>
  )
}

export default LoadingOverlay
