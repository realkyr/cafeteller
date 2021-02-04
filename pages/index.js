import admin from 'plugins/firebase'
import PropTypes from 'prop-types'

import firebase from 'plugins/firebaseclient'
import 'firebase/auth'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Image, Card, Button, Space } from 'antd'

import styled from 'styled-components'

const { Meta } = Card

export default function Home ({ reviews }) {
  const router = useRouter()
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
      <Row justify="center" style={{ overflow: 'hidden', paddingBottom: '1.4em' }}>
        <Col xs={24} xxl={18}>
          <Banner>
            <Image style={{ objectFit: 'cover' }} src="/assets/Images/COVER1.png" preview={false}></Image>
          </Banner>
          <Pattern1 img={'/assets/Images/pattern4.jpg'}>
            <div>
            <BgIcon img={'/assets/Images/Star.png'}></BgIcon>
            <BgIcon2 img={'/assets/Images/Thumbsup.png'}></BgIcon2>
            </div>
          </Pattern1>
          <RecentReview>
            <h2><span>Recent</span> Review</h2>
            <Underline style={{ marginBottom: '1.7rem' }} />
            {
              user && isAdmin
                ? (
                <Space size="small">
                  <Button onClick={() => { router.push('/reviews/add') }}>Add Review</Button>
                  <Button onClick={() => {
                    localStorage.setItem('access_token', '')
                    firebase.auth().signOut()
                  }} danger>Log Out</Button>
                </Space>
                  )
                : null
            }
            <Row gutter={{ xs: 4, md: 24 }}>
            {
              Object.keys(reviews).map((r, i) => {
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                if (i < 2) {
                  return (
                  <Col key={r + '-link'} xs={24} md={12}>
                    <RecentReviewCard key={r}>
                      <Link href={`/reviews/${r}`}>
                        <a className='flex-center card-shadow'>
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
          <Pattern2 img={'/assets/Images/pattern2.jpg'}>
            <div>
            <BgIcon3 img={'/assets/Images/Tag.png'}></BgIcon3>
            <BgIcon4 img={'/assets/Images/Hexagon.png'}></BgIcon4>
            </div>
          </Pattern2>
          <AllReview>
            <h2><span>All</span> Review</h2>
            <Underline style={{ marginBottom: 12 }} />
            <Row gutter={{ xs: 10, md: 20 }}>
            {
              Object.keys(reviews).map(r => (
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                <Col key={r + '-link'} xs={12} md={8}>
                  <AllReviewCard key={r}>
                    <Link href={`/reviews/${r}`}>
                      <a className='flex-center card-shadow'>
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
const CardHover = styled.div`
  display: flex;
  position: absolute;
  border-radius: 20px;
  border: solid 3px transparent;
    &:hover {
        cursor: pointer;
        transition: 0.1s;
        border-radius: 20px;
        box-shadow: 8px 8px #dfceaf;
        border: solid 3px #1e315c;
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
    padding: 3.7vw;
  }
  .card-shadow {
    padding-bottom: 20px;
    border-radius: 20px;
    &:hover {
      box-shadow: 8px 8px 1px 2px #dfceaf;

      .ant-card {
        box-shadow: 0px 0px 0px 3px #1e315c;
      }
    }
  }
  .ant-card {
    transition-timing-function: cubic-bezier(0.1, 0.85, 0.31, 0.99);
    transition-duration: .1s;
    box-shadow: 0px 0px 0px 1px #d0c7be;
    border-radius: 18.5px;
    box-sizing: border-box;
    width: 100%;
    height: auto;
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
      font-size: 23px;
  }
  @media (min-width: 768px) {
    width: 100%;
    .ant-card {
      height: auto;
      width: 100%;
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
        font-size: 1.6em;
    }
    .ant-card-meta-description {
        font-size: 2em;
    }
    .card-shadow {
      padding-bottom: 0px;
    }
  }
  div${CardHover} {
    margin-top: 20px;
    height: 93%;
    width: 100%;
    @media (min-width: 300px) {
        height: 93.5%;
        width: 100%;
    }
    @media (min-width: 768px) {
        margin-top: 30px;
        height: 91%;
        width: 95%;
    }
    @media (min-width: 930px) {
        height: 92%;
        width: 95%;
    }
    @media (min-width: 1020px) {
        height: 93%;
        width: 95%;
    }
    @media (min-width: 1200px) {
        height: 94%;
        width: 95%;
    }
    @media (min-width: 1600px) {
        height: 94%;
        width: 95.5%;
    }
  }
`
const AllReview = styled.div`
  width: 95%;
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
  .card-shadow {
    border-radius: 20px;
    &:hover {
      box-shadow: 8px 8px 1px 2px #dfceaf;

      .ant-card {
        box-shadow: 0px 0px 0px 3px #1e315c;
      }
    }
  }
  .ant-card {
    transition-timing-function: cubic-bezier(0.1, 0.85, 0.31, 0.99);
    transition-duration: .1s;
    border-radius: 18.5px;
    box-shadow: 0px 0px 0px 1px #d0c7be;
    width: 100%;
    height: 100%;
    /* display: inline-table; */
    /* border: solid 1px #d0c7be; */
    box-sizing: border-box;
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
      font-size: 14px;
  }
  .ant-card-meta-description {
      font-size: 20px;
  }
  @media (min-width: 768px) {
    margin-top: 20px;
    .ant-card {
      width: 100%;
    }
    .ant-card-cover {
      padding-top: 66%;
    }
    .ant-card-body {
      padding: 1.5vw 2.4vw;
    }
    .ant-card-meta-title {
        font-size: 1.5em;
    }
    .ant-card-meta-description {
        font-size: 1.9em;
    }
  }
  div${CardHover} {
      border-radius: 22px;
      height: 96%;
      width: 95%;
    @media (min-width: 300px) {
        height: 95.5%;
        width: 96%;
    }
    @media (min-width: 768px) {
        height: 94%;
        width: 94%;
    }
    @media (min-width: 1020px) {
        height: 95%;
        width: 94%;
    }
    @media (min-width: 1200px) {
        height: 96%;
        width: 96%;
    }
    @media (min-width: 1600px) {
        height: 96%;
        width: 96%;
    }
    @media (min-width: 2200px) {
        height: 96%;
        width: 96.5%;
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
const BgIcon = styled.div`
  position: absolute;
  background-image: url(${props => props.img});
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-position-x: left;
  left: -3%;
  right: 0;
  width: 100%;
  background-size: 28%;
  height: calc(77px + 3%);
    padding-top: calc(149px + 5%);
  @media (min-width: 768px) {
    width: 75%;
    background-size: 28%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
  }
`
const BgIcon2 = styled.div`
  position: absolute;
  background-image: url(${props => props.img});
  margin: 0 auto;
  left: 7%;
  right: 0;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: 23%;
  background-size: 25%;
  width: 100%;
  height: calc(77px + 3%);
  padding-top: calc(172px + 5%);
  @media (min-width: 768px) {
    background-position-y: 23%;
    background-size: 20%;
    width: 70%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
  }
`
const BgIcon3 = styled.div`
  position: absolute;
  background-image: url(${props => props.img});
  margin: 0 auto;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: left;
    left: 6%;
    right: 0;
    background-size: 36%;
    height: calc(38px + 3%);
    padding-top: calc(17px + 0%);
    width: 100%;
  @media (min-width: 768px) {
    background-size: 27%;
    height: calc(107px + 3%);
    padding-top: calc(116px + 5%);
    width: 80%;
  }
`
const BgIcon4 = styled.div`
  position: absolute;
  background-image: url(${props => props.img});
  margin: 0 auto;
    left: -8%;
    right: 0;
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: 13%;
    background-size: 25%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
  width: 100%;
  @media (min-width: 768px) {
    background-position-y: 30%;
    background-size: 17%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
  width: 62%;
  }
`
