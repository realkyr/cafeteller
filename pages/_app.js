import React from 'react'
import Router, { useRouter } from 'next/router'
import firebase from 'plugins/firebaseclient'

import NProgress from 'nprogress' // nprogress module
import 'nprogress/nprogress.css'
import 'antd/dist/antd.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import '../styles/globals.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
  window.scrollTo(0, 0)
  const analytics = firebase.analytics()
  analytics.setCurrentScreen(window.location.pathname)
  analytics.logEvent('screen_view')
})

Router.events.on('routeChangeError', () => NProgress.done())
function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      {
        router.pathname === '/auth'
          ? <Component {...pageProps} />
          : (<>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </>)
      }
    </>
  )
}

export default MyApp
