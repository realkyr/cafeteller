import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useLoadingOverlay from '@/hooks/useLoadingOverlay'

const useRouteChange = () => {
  const router = useRouter()
  const setLoading = useLoadingOverlay()

  useEffect(() => {
    const onRouteChangeStart = () => setLoading(true)
    const onRouteChangeComplete = () => setLoading(false)

    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])
}

export default useRouteChange
