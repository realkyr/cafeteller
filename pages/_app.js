/* eslint-disable react/prop-types */
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Router, { useRouter } from 'next/router'
import firebase from 'plugins/firebaseclient'
// import 'firebase/analytics'
import NProgress from 'nprogress' // nprogress module
import 'nprogress/nprogress.css'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import Head from "next/head";

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Maitree:wght@200;300;400;500;600;700&display=swap"
              rel="stylesheet"/>
      </Head>
      {
        router.pathname === '/auth'
          ? <Component {...pageProps} />
          : (<>
            <Navbar/>
            <Component {...pageProps} />
            <Footer/>
          </>)
      }
    </>
  )
}

export default MyApp
