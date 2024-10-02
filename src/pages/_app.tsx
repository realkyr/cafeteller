import type { AppProps } from 'next/app'
import { SWRProvider } from '@/components/SWRProvider'
import StyledComponentsRegistry from '@/lib/StyleComponentRegistry'
import { initialFirebaseApp } from '@/utils/firebase'

import '../public/globals.css'
import Footer from '@/components/ui/Footer'
import NavbarContainer from '@/components/ui/NavbarContainer'
import { useRouter } from 'next/router'
import { HIDE_NAVBAR_ROUTE } from '@/utils/hideNavbarRoute'
import { useEffect } from 'react'
import { getAnalytics, logEvent } from '@firebase/analytics'
import useInjectStylesFromManifest from '@/hooks/useInjectStylesFromManifest'

import { Provider } from 'jotai'
import LoadingOverlay from '@/components/ui/LoadingOverlay'

initialFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useInjectStylesFromManifest()

  useEffect(() => {
    const analytics = getAnalytics()

    // Log a page view to Firebase Analytics
    logEvent(analytics, 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    })
  }, [])

  const shouldHide = HIDE_NAVBAR_ROUTE.includes(router.pathname)
  return (
    <Provider>
      <SWRProvider>
        <StyledComponentsRegistry>
          {!shouldHide && <NavbarContainer />}
          {shouldHide && <div id='navbar-portal' />}
          <LoadingOverlay />
          <Component {...pageProps} />
          {!shouldHide && <Footer />}
        </StyledComponentsRegistry>
      </SWRProvider>
    </Provider>
  )
}
