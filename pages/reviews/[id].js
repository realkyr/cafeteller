import firebase from '../../plugins/firebase'
import PropTypes from 'prop-types'
import 'firebase/firestore'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import styled from 'styled-components'
import { Loader } from '@googlemaps/js-api-loader'

import { Grid, Row, Col, Image, Menu, Dropdown, Button, Card } from 'antd';

const { Meta } = Card;
const { Title } = Typography
const Map = styled.div`
  width: 100%;
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
              <div className="image-container-img">
                <div className="caption-border">
                {
                  [image, caption]
                }
                </div>
              </div>
            </div>)
          } else {
            raw[raw.length - 1] = (
              <div className="image-container">
                {raw[raw.length - 1].props.children}
                <div className="divide-image"></div>
                <div className="image-container-img">
                <div className="caption-border">
                  {[image, caption]}
                </div>
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

  
  const AllReview = styled.div`
    width: 99%;
    margin: auto;
    .ant-col {
      display: flex !important;
      justify-content: center;
    }
    margin-top: 20px;
    @media (min-width: 768px) {
      width: 95%;
    }
  `
  const AllReviewCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    img{
      object-fit: cover;
    }
    .ant-card-cover {
      padding-top: 100%;
      overflow: hidden;
      height: 0;
      position: relative;
      width: 100%;
    }
    .ant-card-body {
      text-align: center;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.9vw;
    }
    .ant-card-meta-title {
      white-space: normal;
    }
    .ant-card {
      width: 95%;
      height: 100%;
      display: inline-table;
      border: solid 2px #d0c7be;
      border-radius: 20px;
    }
    .ant-card-meta-title {
      white-space: normal;
    }
    .ant-image {
      top: 0;
      height: 100%;
      position: absolute;
    }
    .ant-image-img {
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
    }
    .ant-card {
      border: solid 2px #d0c7be;
      &:hover {
          cursor: pointer;
          transition: 0.1s;
          border-radius: 20px;
          box-shadow: 8px 8px #dfceaf;
          border: solid 3px #1e315c;
      }
    }
    @media (min-width: 768px) {
      margin-top: 20px;
      .ant-card {
        width: 96%;
      }
      .ant-card-cover {
        padding-top: 66%;
      }
      .ant-card-body {
        padding: 2.3vw;
      }
    }
  `
  const Content = styled.div`
  
  .divide-image {
    // width: 40px;
  }
  img {
    width: 90%;
  }
  .image-container {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 7px;
    width: 100%;
  }
  .image-container-img {
    padding-top: 120%;
    position: relative;
    height: 0;
    width: 100%;
    overflow: hidden;
  }
  .caption {
    text-align: center;
    font-size: 14px;
    margin: 5px;
    margin-bottom: 0px;
  }
  .caption-border {
    border: 0px;
    height: 100%;
    margin: 0px;

    position: absolute;
    top: 0;
    img{
      height: 100%;
    }
  }
  @media (min-width: 768px) {
    .caption {
      text-align: center;
      font-size: 15px;
      margin: 8px;
      margin-top: 12px;
    }
    .caption-border {
      border: 2px solid #d6d6d6;
      height: 100%;
      margin: 3px;
    }
    .image-container {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: 0px;
    }
    .divide-image {
      width: 40px;
    }
    img {
      width: 90%;
    }
  }
    
    p {
      padding: 5%;
    }
  `
  return (
    <>
      <Head>
        <title>Cafeteller || {reviews[id].cafe.name}</title>
      </Head>
      <Row>
        <Col>
          <Title>{reviews[id].cafe.name}</Title>
          <Content>{content}</Content>
          <Map id="map"></Map>
        </Col>
      </Row>
      
      <AllReview>
        More Like This
            <Row>
            {
              Object.keys(reviews).map((r, i) => {
                if(i < 2) { return (
                // <Link href={`/reviews/${r}`}>
                  // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                <Col key={r + '-link'} xs={12} md={8}>
                  <AllReviewCard key={r}>
                    <Link href={`/reviews/${r}`}>
                    <Card
                      bordered={false}
                      cover={<Image height={"100%"} onError={(e)=>{e.target.onerror = null; e.target.src="/assets/Images/placeholder.png"}} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                    >
                      <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                    </Card>
                    </Link>
                  </AllReviewCard>
                </Col>
                // </Link>
              )}})
            }
            </Row>
          </AllReview>
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
