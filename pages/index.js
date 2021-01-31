import admin from 'plugins/firebase'
import PropTypes from 'prop-types'

import firebase from 'plugins/firebaseclient'
import 'firebase/auth'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Image, Card, Button, Space } from 'antd'

import styled from 'styled-components'

const { Meta } = Card

export default function Home ({ reviews }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setAdmin] = useState(false)

  const verifyToken = () => {
    // TODO: verify if token still valid
    return true
  }

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const isTokenValid = verifyToken()
        if (!isTokenValid) firebase.auth().signOut()
        setUser(user)
        const idtoken = await user.getIdTokenResult()
        setAdmin(idtoken.claims.isAdmin)
      } else {
        setUser(undefined)
        setAdmin(false)
      }
    })

    return () => { unsub && unsub() }
  }, [])

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
          <Pattern1 img={'/assets/Images/pattern4.jpg'}></Pattern1>
          <RecentReview>
            <h2><span>Recent</span> Review</h2>
            <Underline />
            <Row>
            {
              user && isAdmin
                ? (
                <Space size="small">
                  <Button>Add Review</Button>
                  <Button danger>Log Out</Button>
                </Space>
                  )
                : null
            }
            {
              Object.keys(reviews).map((r, i) => {
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                if (i < 2) {
                  return (
                  <Col key={r + '-link'} xs={24} md={12}>
                    <RecentReviewCard key={r}>
                      <Link href={`/reviews/${r}`}>
                        <a className='flex-center'>
                          <Card
                            bordered={false}
                            cover={<Image height={'100%'}
                              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }}
                              alt={reviews[r].cafe.name}
                              src={reviews[r].cafe.banner.url}
                              fallback="/assets/Images/placeholder.png"
                              preview={false} />}
                          >
                            <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                          </Card>
                        </a>
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
          <Pattern2 img={'/assets/Images/pattern2.jpg'}></Pattern2>
          <AllReview>
            <h2><span>All</span> Review</h2>
            <Underline style={{ marginBottom: 12 }} />

            <Row>
            {
              Object.keys(reviews).map(r => (
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                <Col key={r + '-link'} xs={12} md={8}>
                  <AllReviewCard key={r}>
                    <Link href={`/reviews/${r}`}>
                      <a className='flex-center'>
                        <Card
                          bordered={false}
                          cover={<Image height={'100%'} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                        >
                          <Meta className="cafeCardDesc" title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                        </Card>
                      </a>
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
export async function getServerSideProps () {
  // Call an external API endpoint to get posts
  const db = admin.firestore()
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

const Banner = styled.div`
  // height: 200px;
  padding-top: 50%;
  position: relative;
  overflow: hidden;
  height: 0;
  .ant-image {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    .ant-image-img{
      height: 100%;
      object-fit: cover;
    }
  }
`

const RecentReview = styled.div`
  margin: auto;
  background-color: #f5f1eb;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  padding: 3%;
  padding-left: 7%;
  padding-right: 7%;
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman';
    span{
      color: #233d77;
      font-family: "Confidante";
      font-weight: normal;
    }
    margin-bottom: 5px;
  }
  @media (min-width: 768px) {
    width: 100%;
    h2 {
      font-size: 2.2rem;
      span{
      }
    }
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
    /* height: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-card {
    width: 100%;
    height: auto;
    margin-top: 30px; 
    /* display: inline-table; */
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
  .ant-card-meta-title {
      font-size: 18px;
  }
  .ant-card-meta-description {
      font-size: 21px;
  }
  @media (min-width: 768px) {
    width: 100%;
    .ant-card {
      /* max-height: 464px; */
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
      padding: 2vw 2.4vw;
    }
    .ant-card-meta-title {
        font-size: 1.4em;
    }
    .ant-card-meta-description {
        font-size: 1.5em;
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
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman';
    margin-bottom: 5px;
    span{
      color: #233d77;
      font-family: "Confidante";
      font-weight: normal;
    }
  }
  @media (min-width: 1200px) {
    width: 98%;
    margin-top: 20px;
    h2 {
      font-size: 2.2rem;
      span{
      }
    }
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
    padding-top: 66%;
    overflow: hidden;
    height: 0;
    position: relative;
    width: 100%;
  }
  .ant-card-body {
    text-align: center;
    /* height: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4vw 1.9vw;
  }
  .ant-card {
    width: 95%;
    height: 100%;
    /* display: inline-table; */
    border: solid 2px #d0c7be;
    border-radius: 20px;
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
  .ant-card-meta-title {
      font-size: 14px;
  }
  .ant-card-meta-description {
      font-size: 17px;
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
      padding: 1.5vw 2.4vw;
    }
    .ant-card-meta-title {
        font-size: 1.4em;
    }
    .ant-card-meta-description {
        font-size: 1.5em;
    }
  }
`
const Pattern1 = styled.div`
  border: solid 2px #b5b5b5;
  border-left: 0;
  border-right: 0;
  height: 63px;
  background-image: url(${props => props.img});
  background-size: 42%;

  @media (min-width: 768px) {
    background-size: 20%;
  height: 77px;
  }
`
const Pattern2 = styled.div`
  border: solid 2px #b5b5b5;
  border-left: 0;
  border-right: 0;
  height: 63px;
  background-image: url(${props => props.img});
  background-size: 42%;

  @media (min-width: 768px) {
    background-size: 20%;
  height: 77px;
  }
`
const Underline = styled.div`
  border-bottom: solid 3px #555555;
  width: 25px;
  margin: auto;
  border-radius: 26%;
`
