import type { AppProps } from 'next/app'
import { SWRProvider } from '@/components/SWRProvider'
import StyledComponentsRegistry from '@/lib/StyleComponentRegistry'

import '../public/globals.css'
import Footer from '@/components/ui/Footer'
import NavbarContainer from '@/components/ui/NavbarContainer'
import { useRouter } from 'next/router'
import { HIDE_NAVBAR_ROUTE } from '@/utils/hideNavbarRoute'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const shouldHide = HIDE_NAVBAR_ROUTE.includes(router.pathname)
  return (
    <SWRProvider>
      <StyledComponentsRegistry>
        {!shouldHide && <NavbarContainer />}
        {shouldHide && <div id='navbar-portal' />}
        <Component {...pageProps} />
        {!shouldHide && <Footer />}
      </StyledComponentsRegistry>
    </SWRProvider>
  )
}
