import firebase from '../../plugins/firebase'
import PropTypes from 'prop-types'
import 'firebase/firestore'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import styled from 'styled-components'
import { Loader } from '@googlemaps/js-api-loader'

const { Title } = Typography
const Map = styled.div`
  width: 400px;
  height: 400px;
  background: grey;
`

export default function Home ({ reviews }) {
  const router = useRouter()
  const { id } = router.query
  const [content, setContent] = useState([])

  // eslint-disable-next-line no-unused-vars
  let map
  let marker

  useEffect(() => {
    const raw = []
    console.log(reviews[id])
    if (!reviews[id]) return ''
    const blocks = [...reviews[id].review.blocks]
    let consecImage = 0
    blocks.forEach((block) => {
      console.log(block)
      switch (block.type) {
        case 'header': {
          const fullCafeName = block.data.text
          const cafeArea = fullCafeName.split('—').pop()
          const cafeName = fullCafeName.substring(0, fullCafeName.indexOf('—'))
          raw.push(<Title level={block.data.level} className="article-header">{cafeName}</Title>)
          raw.push(<Title level={block.data.level +
            2} class="article-header">{cafeArea}</Title>)
          consecImage = 0
          break
        }
        case 'paragraph':
          raw.push(<p>{block.data.text}</p>)
          consecImage = 0
          break
        case 'image': {
          const image = <img style={{
            display: 'inline',
            width: '100%',
            objectFit: 'cover'
          }}
            src={block.data.file.url} className="res-img"
          />
          let caption = ''
          if (block.data.caption) {
            caption = <div text-center className="caption">{block.data.caption}</div>
          }
          consecImage++
          if (consecImage < 2) {
            raw.push(
            <div className="image-container">
              <div className="caption-border">
                {
                  [image, caption]
                }
              </div>
            </div>)
          } else {
            raw[raw.length - 1] = (
              <div className="image-container">
                {raw[raw.length - 1].props.children}
                <div className="divide-image"></div>
                <div className="caption-border">
                  {[image, caption]}
                </div>
              </div>
            )
            consecImage = 0
          }
          break
        }
        default:
          // code block
          raw.push(<p>{block.data.text}</p>)
          consecImage = 0
      }
    })
    setContent(raw)

    const loader = new Loader({
      apiKey: 'AIzaSyCxnAxJAY5NyxcS3dvXfjFTMMbGBevUm-U',
      version: 'weekly',
      libraries: ['places'],
      language: 'th',
      region: 'TH'
    })
    loader.load().then(() => {
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
    })
  }, [])

  return (
    <>
      <Head>
        <title>Cafeteller || {reviews[id].cafe.name}</title>
      </Head>
      <Title>{reviews[id].cafe.name}</Title>
      {content}
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
