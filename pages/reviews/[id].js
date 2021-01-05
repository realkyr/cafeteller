import firebase from '../../plugins/firebase'
import PropTypes from 'prop-types'
import 'firebase/firestore'

import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography
const Map = styled.div`
  width: 400px;
  height: 400px;
  background: grey;
`

export default function Home ({ reviews }) {
  const router = useRouter()
  const { id } = router.query

  // eslint-disable-next-line no-unused-vars
  let map
  let marker

  useEffect(() => {
    const google = window.google
    const location = {
      lng: reviews[id].cafe.location.lon,
      lat: reviews[id].cafe.location.lat
    }
    // eslint-disable-next-line no-unused-vars
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15
    })
    // eslint-disable-next-line no-unused-vars
    marker = new google.maps.Marker({
      position: location,
      map
    })
  }, [])

  return (
    <>
      <Head>
        <title>Cafeteller || {reviews[id].cafe.name}</title>
        <script defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxnAxJAY5NyxcS3dvXfjFTMMbGBevUm-U&libraries=places&language=th-TH">
        </script>
      </Head>
      <Title>{reviews[id].cafe.name}</Title>
      <Map id="map"></Map>
    </>
  )
}

Home.propTypes = {
  // ...prop type definitions here
  reviews: PropTypes.object
}

// This function gets called at build time
export async function getServerSideProps () {
  // Call an external API endpoint to get posts
  const db = firebase.firestore()
  const reviewsDoc = await db.collection('reviews').get()
  const reviews = {}
  reviewsDoc.forEach(r => {
    reviews[r.id] = r.data()
  })

  const cafes = []
  for (const c in reviews) {
    cafes.push(reviews[c].cafe.get())
  }

  const result = await Promise.all(cafes)
  Object.keys(reviews).forEach((id, index) => {
    reviews[id].cafe = result[index].data()

    // convert all timestamp to date
    reviews[id].createDate = reviews[id].createDate.toString()
    reviews[id].updateDate = reviews[id].updateDate.toString()
  })

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      reviews
    }
  }
}
