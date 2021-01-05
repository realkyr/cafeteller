import firebase from '../plugins/firebase'
import PropTypes from 'prop-types'
import 'firebase/firestore'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Typography } from 'antd'

const { Title } = Typography

export default function Home ({ reviews }) {
  return (
    <>
      <Head>
        <title>Cafeteller</title>
      </Head>
      <Title>Review Page</Title>
      {
        Object.keys(reviews).map(r => (
          <Link key={r + '-link'} href={`/reviews/${r}`}>
            <Title key={r} level={4}>{reviews[r].cafe.name}</Title>
          </Link>
        ))
      }
    </>
  )
}

Home.propTypes = {
  // ...prop type definitions here
  reviews: PropTypes.object
}

// This function gets called at build time
export async function getStaticProps () {
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
