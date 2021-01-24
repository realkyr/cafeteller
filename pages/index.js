import firebase from '../plugins/firebase'
import PropTypes from 'prop-types'
import 'firebase/firestore'

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Typography, Row, Col, Image, Card } from 'antd'

import styled from 'styled-components'

const { Meta } = Card
const { Title } = Typography

const Banner = styled.div`
  // height: 200px;
  padding-top: 66%;
  position: relative;
  overflow: hidden;
  height: 0;
  .ant-image {
    position: absolute;
    top: 0;
    height: 100%;
    .ant-image-img{
      height: 100%;
    }
  }
`
const Divide = styled.div`
  height: 70px;
  background-color: grey;
`
const RecentReview = styled.div`
  margin: auto;
  background-color: #f5f1eb;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  padding: 5%;
  padding-left: 7%;
  padding-right: 7%;
  @media (min-width: 768px) {
    // margin: 20px;
  }
`
const RecentReviewCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  img{
    object-fit: cover;
  }

  .ant-card {
    border: solid 2px #d0c7be;
    border-radius: 20px;
  }
  .ant-card-cover {
    padding-top: 66%;
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
  }
  .ant-card-meta-title {
    white-space: normal;
  }
  .ant-card {
    width: 100%;
    height: auto;
    margin-top: 30px; 
    display: inline-table;
    &:hover {
      cursor: pointer;
      transition: 0.1s;
      border-radius: 20px;
      box-shadow: 5px 5px #dfceaf;
      border: solid 3px #1e315c;
    }
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
  @media (min-width: 768px) {
    width: 100%;
    .ant-card {
      max-height: 464px;
      height: auto;
      width: 95%;
    }
    .ant-image {
      top: 0;
      height: 100%;
      position: absolute;
    }
    .ant-card-cover {
    }
    .ant-card-body {
      padding: 2.9vw;
    }
  }
  
  
`
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
const Pattern3 = styled.div`
  border: solid 2px #d0c7be;
  height: 100px;
  background-image: url(${props => props.img});
  background-size: 15%;
`

export default function Home ({ reviews }) {
  return (
    <>
      <Head>
        <title>Cafeteller</title>
      </Head>
      {/* <Container> */}
      <Row justify="center">
        <Col xs={24} xxl={18}>
          <Banner>
            <Image style={{ objectFit: 'cover' }} src="/assets/Images/COVER1.png" preview={false}></Image>
          </Banner>
          <Pattern3 img={'/assets/Images/pattern4.jpg'}></Pattern3>
          <Title>recebt Review</Title>
          <Divide />
          <RecentReview>
            <Row>
            {
              Object.keys(reviews).map((r, i) => {
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                if (i < 2) {
                  return (
                  <Col key={r + '-link'} xs={24} md={12}>
                    <RecentReviewCard key={r}>
                      <Link href={`/reviews/${r}`}>
                        <Card
                          bordered={false}
                          cover={<Image height={'100%'} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                        >
                          <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                        </Card>
                      </Link>
                    </RecentReviewCard>
                  </Col>
                  // </Link>
                  )
                }
                return null
              })
            }
            </Row>
          </RecentReview>
          <Title>All Review</Title>
          <AllReview>
            <Row>
            {
              Object.keys(reviews).map(r => (
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                <Col key={r + '-link'} xs={12} md={8}>
                  <AllReviewCard key={r}>
                    <Link href={`/reviews/${r}`}>
                    <Card
                      bordered={false}
                      cover={<Image height={'100%'} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                    >
                      <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                    </Card>
                    </Link>
                  </AllReviewCard>
                </Col>
                // </Link>
              ))
            }
            </Row>
          </AllReview>
        </Col>
      </Row>
      {/* </Container> */}
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
