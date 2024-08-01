import admin from 'plugins/firebase'
import PropTypes from 'prop-types'
import firebase from 'plugins/firebaseclient'
import 'firebase/auth'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Image, Card, Button, Space, Affix, Grid, Carousel } from 'antd'
import { UpOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'

import styled from 'styled-components'

const { Meta } = Card
const { useBreakpoint } = Grid
const pageAmount = 24

export default function Home ({ reviews, recents, recentsOrder, reviewsOrder }) {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [paginationDesktop, setPaginationDesktop] = useState([])
  const [paginationMobile, setPaginationMobile] = useState([])
  const [order, setOrder] = useState(reviewsOrder.slice(0, pageAmount))
  const [user, setUser] = useState(null)
  const [isAdmin, setAdmin] = useState(false)
  const screens = useBreakpoint()

  useEffect(() => {
    const first = pageAmount * page
    const last =
      first + pageAmount > reviewsOrder.length
        ? reviewsOrder.length
        : first + pageAmount
    const order = reviewsOrder.slice(first, last)
    setOrder(order)

    const totalPage = []
    const total = Math.floor((reviewsOrder.length + pageAmount - 1) / pageAmount)
    for (let index = 0; index < total; index++) {
      totalPage.push(index)
    }

    let pageDotLeft = false
    let pageDotRight = false
    let pageDotLeftMobile = false
    let pageDotRightMobile = false
    page > 5 && totalPage.length > 10 ? pageDotLeft = true : pageDotLeft = false
    page < total - 5 && totalPage.length > 10 ? pageDotRight = true : pageDotRight = false

    page > 3 && totalPage.length > 5 ? pageDotLeftMobile = true : pageDotLeftMobile = false
    page < total - 3 && totalPage.length > 5 ? pageDotRightMobile = true : pageDotRightMobile = false

    setPaginationDesktop(<PageRow>
      <Button
        disabled={
          page === 0
        }
        onClick={() => setPage(page - 1)}
        icon={<LeftOutlined />}
        className="page left"
        ></Button>
      <Button
        onClick={() => setPage(0)}
        className="page"
        type={page === 0 ? 'primary' : ''}
      > 1
      </Button>
      {
        pageDotLeft
          ? <Button
            className="page dot">
            ...
          </Button>
          : null
      }
      {
        totalPage.slice(1, -1).map((e, i) => {
          console.log(e)
          return (Math.abs(page - e) < 4) ||
          (e === totalPage.length - 1) ||
          (e < 9 && page < 6) ||
          (e > totalPage.length - 10 && page > totalPage.length - 6)
            ? <Button
                key = {i}
                onClick={() => setPage(e)}
                className="page"
                type={e === page ? 'primary' : ''}
              >
                {e + 1}
              </Button>
            : null
        })
      }
      {
        pageDotRight
          ? <Button
            className="page dot">
            ...
          </Button>
          : null
      }
      {
        totalPage.length !== 1
          ? <Button
              onClick={() => setPage(totalPage.length - 1)}
              className="page"
              type={page === totalPage.length - 1 ? 'primary' : ''}
            > {totalPage.length}
            </Button>
          : null
      }
      <Button
        onClick={() => setPage(page + 1)}
        disabled={order[order.length - 1] === reviewsOrder[reviewsOrder.length - 1]}
        icon={<RightOutlined />}
        className="page right"
      ></Button>
      </PageRow>)
    setPaginationMobile(
      <PageRow>
        <Button
          disabled={
            page === 0
          }
          onClick={() => setPage(page - 1)}
          icon={<LeftOutlined />}
          className="page left"
          ></Button>
        <Button
          onClick={() => setPage(0)}
          className="page"
          type={page === 0 ? 'primary' : ''}
        > 1
        </Button>
        {
          pageDotLeftMobile
            ? <Button
              className="page dot">
              ...
            </Button>
            : null
        }
        {
          totalPage.slice(1, -1).map((e, i) => {
            console.log(e)
            if ((Math.abs(page - e) < 2) ||
               (e === totalPage.length - 1) ||
               (e < 5 && page < 4) ||
               (e > totalPage.length - 6 && page > totalPage.length - 4) ||
               (e === 0)) {
              return (
                <Button
                key = {i}
                onClick={() => setPage(e)}
                className="page"
                type={e === page ? 'primary' : ''}
              >
                {e + 1}
              </Button>)
            }
            return (null)
          })
        }
        {
          pageDotRightMobile
            ? <Button
              className="page dot">
              ...
            </Button>
            : null
        }
        {
          totalPage.length !== 1
            ? <Button
                onClick={() => setPage(totalPage.length - 1)}
                className="page"
                type={page === totalPage.length - 1 ? 'primary' : ''}
              > {totalPage.length}
              </Button>
            : null
        }
        <Button
          onClick={() => setPage(page + 1)}
          disabled={order[order.length - 1] === reviewsOrder[reviewsOrder.length - 1]}
          icon={<RightOutlined />}
          className="page right"
        ></Button>
      </PageRow>)
  }, [page])

  const verifyToken = () => {
    // TODO: verify if token still valid
    return true
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    // firebase.auth().signInWithCustomToken()
    // localStorage.setItem('access_token', 'IGQVJYcmJUM25SU2NUSmRzMXBBNFFwbFV4SW9wOEFqdHVQUlVRQ2M1a0tFUnBwNU1NbDNpdm1OTll5TXZA0T1ZAuYWZAUdWVfMHRCQVVSYnpqRFhiRnNYYXE5Q0NiSmJFT2d5Nk5DTmZAR')
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
        <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Because good cafés deserve a shout out"
          />
          <meta name="robots" content="all" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta charSet="UTF-8"></meta>

          <meta property="og:title" content="Cafeteller" />
          <meta property="og:description" content="Because good cafés deserve a shout out" />
          <meta property="og:image" content="/assets/Images/COVER1.png"/>
      </Head>
      {/* <Container> */}
      <Row justify="center" style={{ overflow: 'hidden', paddingBottom: '1.4em' }} id='container'>
        <Col xs={24} xxl={24}>
        <Carousel>
          <Banner>
            <Image style={{ objectFit: 'cover' }} src="/assets/Images/COVER1.png" preview={false}></Image>
          </Banner>
          {
            reviewsOrder.filter(id => {
              return recentsOrder.includes(id) || reviews[id].cafe.tags.includes('Recommended')
            }).map(id => (
              <Link key={id + '-banner'} href={`/reviews/${id}`}>
                <div style={{ overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', width: 0, height: 0 }}>
                    <h1 style={{
                      position: 'absolute',
                      top: '-1vh',
                      left: '-5vw',
                      zIndex: 100,
                      background: 'white',
                      paddingLeft: '15vw',
                      paddingRight: '50vw',
                      color: '#233d77',
                      fontSize: '4vw',
                      fontFamily: 'Confidante',
                      fontWeight: 'normal',
                      transform: 'rotate(-15deg)'
                    }}>
                      {
                        reviews[id].cafe.tags.includes('Recommended') && <>Recommended<br/></>
                      }
                      {
                        recentsOrder.includes(id) && <>Recent</>
                      }
                    </h1>
                  </div>
                  <Banner>
                    <Image style={{ objectFit: 'cover' }} src={reviews[id].cafe.banner.url} preview={false}></Image>
                  </Banner>
                </div>
              </Link>
            ))
          }
        </Carousel>
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
              <Row gutter={{ xs: 7, md: 24 }}>
              {
                recentsOrder.map((r, i) => {
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
                                alt={recents[r].cafe.name}
                                src={recents[r].cafe.banner.url}
                                fallback="/assets/Images/placeholder.png"
                                preview={false}
                                placeholder={<Image
                                  height={'100%'}
                                  alt={recents[r].cafe.name}
                                  src={'/assets/Images/placeholder.png'}
                                  preview={false}
                                />}
                              />}
                            >
                              <Meta title={recents[r].cafe.name} description={recents[r].cafe.sublocality_level_1} />
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
            {
              screens.md
                ? <Affix offsetTop={120}>
                  <BackTopIcon><div onClick={scrollTop}><UpOutlined /></div></BackTopIcon>
                </Affix>
                : null
              }
            <Row gutter={{ xs: 10, sm: 13, md: 14, lg: 20 }}>
            {
              order.map(r => (
                // <Link href={`/reviews/${r}`}>
                // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                <Col key={r + '-link'} xs={12} md={8}>
                  <AllReviewCard key={r}>
                    <Link href={`/reviews/${r}`}>
                      <a className='flex-center card-shadow'>
                        <Card
                          bordered={false}
                          cover={<Image
                            height={'100%'}
                            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }}
                            alt={reviews[r].cafe.name}
                            src={reviews[r].cafe.banner.url}
                            fallback="/assets/Images/placeholder.png"
                            preview={false}
                            placeholder={<Image
                              height={'100%'}
                              alt={reviews[r].cafe.name}
                              src={'/assets/Images/placeholder.png'}
                              preview={false}
                            />}
                          />}
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
          <Desktop>
            { paginationDesktop }
          </Desktop>
          <Mobile>
            { paginationMobile }
          </Mobile>
        </Col>
      </Row>
      {/* </Container> */}
    </>
  )
}

Home.propTypes = {
  // ...prop type definitions here
  reviews: PropTypes.object,
  recents: PropTypes.object,
  recentsOrder: PropTypes.array,
  reviewsOrder: PropTypes.array,
}

// This function gets called at build time
export async function getServerSideProps ({ query }) {
  // Call an external API endpoint to get posts
  const db = admin.firestore()
  // query recent reviews
  const recentsDoc = await db
    .collection('reviews')
    .orderBy('updateDate', 'desc')
    .limit(2)
    .get()
  const recents = {}
  const recentsOrder = []
  recentsDoc.forEach(r => {
    recents[r.id] = r.data()
    recentsOrder.push(r.id)
  })
  const recentCafes = []
  for (const c in recents) {
    recentCafes.push(recents[c].cafe.get())
  }
  const reResult = await Promise.all(recentCafes)
  Object.keys(recents).forEach((id, index) => {
    recents[id].cafe = reResult[index].data()

    // convert all timestamp to date
    recents[id].createDate = recents[id].createDate.toString()
    recents[id].updateDate = recents[id].updateDate.toString()
  })

  const ref = db
    .collection('reviews')
    .orderBy('updateDate', 'desc')

  const reviewsDoc = await ref.get()
  const reviews = {}
  const reviewsOrder = []
  reviewsDoc.forEach(r => {
    reviews[r.id] = r.data()
    reviewsOrder.push(r.id)
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
      reviews,
      recents,
      recentsOrder,
      reviewsOrder
    }
  }
}

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 991.9 })
  return isMobile ? children : null
}
const Banner = styled.div`
  padding-top: 40%;
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
  padding: 3% 6%;
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
    padding: 3% 6%;
  }
  @media (min-width: 1200px) {
    padding: 3% 10%;
  }
  @media (min-width: 1600px) {
    padding: 3% 13%;
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
    height: auto;
    margin-bottom: 20px;
    border-radius: 20px;
    transition-timing-function: cubic-bezier(0.19, 0.65, 0.4, 0.91);
    transition-duration: .2s;
    &:hover {
      box-shadow: 8px 8px 1px .2rem #dfceaf;

      .ant-card {
        box-shadow: 0px 0px 0px 3px #1e315c;
      }
    }
  }
  .ant-card {
    transition-timing-function: cubic-bezier(0.19, 0.65, 0.4, 0.91);
    transition-duration: .2s;
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
      padding: 2vw 1.4vw;
    }
    .ant-card-meta-title {
        font-size: 1.3em;
    }
    .ant-card-meta-description {
        font-size: 1.5em;
    }
    .card-shadow {
      padding-bottom: 0px;
    }
  }
  @media (min-width: 992px) {
    .ant-card-meta-title {
        font-size: 1.6em;
    }
    .ant-card-meta-description {
        font-size: 2em;
    }}
`
const AllReview = styled.div`
  width: 95%;
  margin: 10px auto 0;
  .ant-col {
    display: flex !important;
    justify-content: center;
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
  @media (min-width: 768px) {
    margin: 20px auto 0;
    padding: 0 3%;
    width: 95%;
  }
  @media (min-width: 1200px) {
    width: 98%;
    margin-top: 20px;
    padding: 0 10%;
    h2 {
      font-size: 2.2rem;
      span{
      }
    }
  }
  @media (min-width: 1600px) {
    padding: 0% 13%;
  }
`
const AllReviewCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
    transition-timing-function: cubic-bezier(0.46, 1.13, 0.4, 0.91);
    transition-duration: .2s;
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
    transition-timing-function: cubic-bezier(0.46, 1.13, 0.4, 0.91);
    transition-duration: .2s;
    box-shadow: 0px 0px 0px 1px #ffffff00;
    &:hover {
      box-shadow: 6px 6px 1px 1px #dfceaf;

      .ant-card {
        box-shadow: 0px 0px 0px 3px #1e315c;
      }
    }
  }
  .ant-card {
    transition-timing-function: cubic-bezier(0.46, 1.13, 0.4, 0.91);
    transition-duration: .2s;
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
  @media (min-width: 576px) {
    margin-top: 14px;
  }
  @media (min-width: 768px) {
    margin-top: 14px;
    .ant-card {
      width: 100%;
    }
    .ant-card-cover {
      padding-top: 66%;
    }
    .ant-card-body {
      padding: 1.5vw 1.4vw;
    }
    .ant-card-meta-title {
        font-size: 1.1em;
    }
    .ant-card-meta-description {
        font-size: 1.5em;
    }
    .card-shadow {
      &:hover {
        box-shadow: 6px 6px 1px .2rem #dfceaf;
      }
    }
  }
  @media (min-width: 992px) {
    margin-top: 20px;
    .ant-card-meta-title {
        font-size: 1.5em;
    }
    .ant-card-meta-description {
        font-size: 1.9em;
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
const BackTopIcon = styled.div`
  color: white;
  overflow: visible;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  /* padding-left: 109%; */
  z-index: 10;
  div {
    background-color: #d8bc92;
    cursor: pointer;
    border-radius: 3px;
    position: absolute;
    overflow: visible;
  }
  @media (min-width: 768px) {
    padding-left: 105.5%;
    span {
    }
    div {
      width: 1.6em;
      /* height: 2.4em; */
      font-size: 1.7em;
      margin-top: 20px;
    }
  }
  @media (min-width: 1200px) {
    padding-left: 109%;
    div {
      font-size: 3.4em;
    }
  }
`

const PageRow = styled.div`
  width: 95%;
  margin: 10px auto 0;
  text-align: center;
  padding: 2em 0 0;
  @media (min-width: 768px) {
    margin: 20px auto 0;
    padding: 2% 3%;
    width: 95%;
  }
  @media (min-width: 1200px) {
    width: 98%;
    margin-top: 20px;
    padding: 2% 10%;
    h2 {
      font-size: 2.2rem;
      span{
      }
    }
  }
  @media (min-width: 1600px) {
    padding: 2% 13% 0;
  }
`
