/* eslint-disable react/prop-types */
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Router from 'next/router'
import NProgress from 'nprogress' // nprogress module
import 'nprogress/nprogress.css'
import 'antd/dist/antd.css'
import '../styles/globals.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
