import React, { Component } from 'react'
import { Head } from 'next'

export default class search extends Component {
  render () {
    return (
      <>
        <Head>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxnAxJAY5NyxcS3dvXfjFTMMbGBevUm-U&libraries=places&language=th-TH"></script>
        </Head>
      </>
    )
  }
}
