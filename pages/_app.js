/* eslint-disable react/prop-types */
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import styled from 'styled-components'

const Container = styled.div`
max-width: 1350px;
margin-top: 20px;
margin: auto;
`
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
