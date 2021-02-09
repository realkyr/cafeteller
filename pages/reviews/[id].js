import admin from 'plugins/firebase'
import firebase from 'plugins/firebaseclient'
import 'firebase/auth'
import 'firebase/firestore'
import PropTypes from 'prop-types'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { loader } from '../../plugins/gmap'

import { Typography, Space, Button, Row, Col, Image, Card } from 'antd'
import Banner from 'components/reviews/Banner'
import { useMediaQuery } from 'react-responsive'

const { Meta } = Card
const { Title } = Typography

export default function Home ({ reviews }) {
  const router = useRouter()
  const { id } = router.query
  const [content, setContent] = useState([])
  const [user, setUser] = useState(null)
  const [isAdmin, setAdmin] = useState(false)
  const [shareBoxMobile, setShareBoxMobile] = useState([])
  const [shareBox, setShareBox] = useState([])
  const [contactBox, setContactBox] = useState([])
  const [visitPage, setVisitPage] = useState([])

  const verifyToken = () => {
    // TODO: verify if token still valid
    return true
  }

  let map
  let marker

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
    const didMount = async () => {
      const raw = []
      if (!reviews[id]) return ''
      const blocks = [...reviews[id].review.blocks]
      let consecImage = 0
      blocks.forEach((block, index) => {
        switch (block.type) {
          case 'header': {
            const fullCafeName = block.data.text
            const fullNameSplit = fullCafeName.split('—')
            const cafeName = fullNameSplit[0]
            const cafeArea = fullNameSplit[1]
            raw.push(<Title key={index} level={2} className="article-header"><span dangerouslySetInnerHTML={{ __html: cafeName }}></span></Title>)
            raw.push(
              <TitleBox key='box'>
                <TitlePattern key={0} img={'/assets/Images/pattern4.jpg'} />
                <Title key={4} level={4} className="article-header">
                  <span dangerouslySetInnerHTML={{ __html: cafeArea }}></span>
                </Title>
                <TitlePattern key={1} img={'/assets/Images/pattern4.jpg'} />
              </TitleBox>
            )
            consecImage = 0
            break
          }
          case 'paragraph': {
            raw.push(<p dangerouslySetInnerHTML={{ __html: block.data.text }} key={index}></p>)
            consecImage = 0
            break
          }
          case 'image': {
            const image =
            <Image
              key={consecImage}
              height={'100%'}
              width={'100%'}
              className="res-img"
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }}
              src={block.data.file.url}
              fallback="/assets/Images/placeholder.png"
              preview={false}
              placeholder={<Image key={consecImage} height={'100%'} width={'100%'} className="res-img" src={'/assets/Images/placeholder.png'} preview={false} />}
            />
            // <img style={{
            //   display: 'inline',
            //   width: '100%',
            //   objectFit: 'cover'
            // }}
            //   src={block.data.file.url} className="res-img"
            // />
            let caption = ''
            if (block.data.caption) {
              caption = <div className="caption" dangerouslySetInnerHTML={{ __html: block.data.caption }}></div>
            }
            consecImage++
            if (consecImage < 2) {
              raw.push(
                <div className="image-container" key={index}>
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
                <div className="image-container" key={index}>
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
            raw.push(<p key={index}>{block.data.text}</p>)
            consecImage = 0
        }
      })
      setContent(raw)
      // assign value in sharebox
      const shareBoxRaw = []
      if (typeof reviews[id].cafe.ig !== 'undefined') {
        shareBoxRaw.push(
          <a href={reviews[id].cafe.ig} key='ig'>
            <Image src="/assets/Images/icon/Social/IG.png" preview={false} height={30} width={30} />
          </a>
        )
      }
      if (typeof reviews[id].cafe.fb !== 'undefined') {
        shareBoxRaw.push(
          <a href={reviews[id].cafe.fb} key='fb'>
            <Image src="/assets/Images/icon/Social/FB.png" preview={false} height={30} width={30} />
          </a>
        )
      }
      if (typeof reviews[id].cafe.tw !== 'undefined') {
        shareBoxRaw.push(
          <a href={reviews[id].cafe.tw} key='tw'>
            <Image src="/assets/Images/icon/Social/Twitter.png" preview={false} height={30} width={30} />
          </a>
        )
      }
      if (shareBoxRaw.length) {
        setShareBox(
          <ShareBox style={{ marginBottom: 50 }}>
            <Row>
              <Col xs={0} lg={4}>
                <ShareLeft><span>Share</span></ShareLeft>
              </Col>
              <Col xs={0} lg={8}>
                <ShareRight>
                  {shareBoxRaw}
                </ShareRight>
              </Col>
              <Col xs={0} lg={12}>
                <PatternShare img={'/assets/Images/pattern2.jpg'} />
              </Col>
            </Row>
          </ShareBox>)
        setShareBoxMobile(
          <ShareBox>
            <Row>
              <Col xs={7} md={4}>
                <ShareLeft><span>Share</span></ShareLeft>
              </Col>
              <Col xs={17} md={8}>
                <ShareRight>
                  {shareBoxRaw}
                </ShareRight>
              </Col>
              <Col xs={0} md={12} lg={0}>
                <PatternShare img={'/assets/Images/pattern2.jpg'} />
              </Col>
            </Row>
          </ShareBox>)
      }

      // assign value in contactBox
      const contactBoxRaw = []
      if (typeof reviews[id].cafe.openhour !== 'undefined') {
        contactBoxRaw.push(
          <Row key={0}>
            <Col span={4}>
              <Image src="/assets/Images/icon/Open hours.png" preview={false} height={30} width={30} />
            </Col>
            <Col span={20}>{reviews[id].cafe.openhour}</Col>
          </Row>
        )
      }
      if (typeof reviews[id].cafe.parking !== 'undefined') {
        contactBoxRaw.push(
          <Row key={1}>
            <Col span={4}>
              <Image src="/assets/Images/icon/Parking.png" preview={false} height={35} width={35} />
            </Col>
            <Col span={20}>{reviews[id].cafe.parking}</Col>
          </Row>
        )
      }
      if (typeof reviews[id].cafe.phone !== 'undefined') {
        contactBoxRaw.push(
          <Row key={2}>
            <Col span={4}>
              <Image src="/assets/Images/icon/Call.png" preview={false} height={30} width={30} />
            </Col>
            <Col span={20}>{reviews[id].cafe.phone}</Col>
          </Row>
        )
      }
      if (typeof reviews[id].cafe.details !== 'undefined') {
        contactBoxRaw.push(
          <Row key={3}>
            <Col span={4}>
              <Image src="/assets/Images/icon/Address.png" preview={false} height={30} width={30} />
            </Col>
            <Col span={20}>{reviews[id].cafe.details}</Col>
          </Row>
        )
      }
      if (typeof reviews[id].cafe.landmark !== 'undefined') {
        contactBoxRaw.push(
          <Row key={4}>
            <Col span={4}>
              <Image src="/assets/Images/icon/Location.png" preview={false} height={30} width={30} />
            </Col>
            <Col span={20}>{reviews[id].cafe.landmark}</Col>
          </Row>
        )
      }
      setContactBox(contactBoxRaw)
      const visitPageRaw = []
      if (typeof reviews[id].cafe.openhour !== 'undefined') {
        visitPageRaw.push(
          <Row key={5}>
            <Col span={4}>
              <Image src="/assets/Images/icon/Social/FB.png" preview={false} height={30} width={30} />
            </Col>
            <Col span={20}>
              Visit <a href={reviews[id].cafe.fb}>{reviews[id].cafe.name}</a>&apos;s page
            </Col>
          </Row>
        )
      }
      setVisitPage(visitPageRaw)

      if (!window.google) await loader.load()

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
        icon: '/assets/Images/pin.png',
        map
      })
    }
    didMount()
    return () => { unsub && unsub() }
  }, [])

  return (
    <>
      <Head>
        <title>Cafeteller || {reviews[id].cafe.name}</title>
      </Head>
      <Container>
      <Row align="middle" justify="center">
        <Col xs={24} xxl={18}>
          {
            user && isAdmin
              ? (
              <Space size="small">
                <Button onClick={() => { router.push('/reviews/edit/' + id) }}>Edit Review</Button>
                <Button onClick={async () => {
                  const db = firebase.firestore()
                  await db.collection('reviews').doc(id).delete()
                  await db.collection('cafes').doc(reviews[id].cafe.id).delete()
                  router.push('/')
                }} danger>Delete</Button>
              </Space>
                )
              : null
          }
          <Banner>
            <Image
              height={'100%'}
              width={'100%'}
              style={{ objectFit: 'cover' }}
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }}
              alt={reviews[id].cafe.name}
              src={reviews[id].cafe.banner.url}
              fallback="/assets/Images/placeholder.png"
              preview={false}
              placeholder={
                <Image
                  height={'100%'}
                  width={'100%'}
                  alt={reviews[id].cafe.name}
                  style={{ objectFit: 'cover' }}
                  src={'/assets/Images/placeholder.png'}
                  preview={false}
                />}
            />
          </Banner>
          <Row justify="space-around">
            <Col xs={24} md={19} lg={15} xxl={16}>
              <Content>
                {content}
                <ForWork>
                  <Image src="/assets/Images/icon/Contact.png" preview={false} height={30} width={25} />
                  <span> For Work please contact <a>&quot;here&quot;</a></span>
                </ForWork>
              </Content>
              <Desktop>
                {shareBox}
              </Desktop>
            </Col>
            <Col xs={24} md={19} lg={8} xxl={7}>
              <ContactInfo>
                {contactBox}
                <Map id="map"></Map>
                <Desktop>
                {visitPage}
                </Desktop>
              </ContactInfo>
              <Mobile>
                {shareBoxMobile}
              </Mobile>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Pattern img={'/assets/Images/pattern5.jpg'}></Pattern>
        </Col>
        <Col xs={24} md={22} xxl={18}>
          <MoreReview>
            <h2><span>More</span> Like This</h2>
            <Underline style={{ marginBottom: 12 }} />
            <Row gutter={{ xs: 10, md: 20 }}>
              {
                Object.keys(reviews).map((r, i) => {
                  if (i < 2) {
                    return (
                      <Col key={r + '-link'} xs={12} md={8}>
                        <MoreReviewCard key={r}>
                          <Link href={`/reviews/${r}`}>
                            <a className="flex-center card-shadow">
                              <Card
                                bordered={false}
                                cover={<Image height={'100%'} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                              >
                                <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                              </Card>
                            </a>
                          </Link>
                        </MoreReviewCard>
                      </Col>
                    )
                  }
                  return null
                })
              }
            </Row>
          </MoreReview>
        </Col>
      </Row>
      </Container>
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
    reviews[id].cafe.id = result[index].id

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
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 991.9 })
  return isMobile ? children : null
}
const Container = styled.div``
const Map = styled.div`
  width: 100%;
  height: 400px;
  background: grey;
  border-bottom: 2px solid #d2c5b8;
`
const Pattern = styled.div`
  background-size: 75%;
  border-bottom: 2px solid #d2c5b8;
  height: 70px;
  background-image: url(${props => props.img});
  background-size: 100%;
  @media(min-width: 768px) {
    background-size: 44%;
    height: 80px;
    border: 2px solid #d2c5b8;
  }
  @media(min-width: 1200px) {
    background-size: 17%;
  }
`

const TitlePattern = styled.div`
  border-bottom: 0;
  height: 100px;
  background-image: url(${props => props.img});
  background-size: 100%;
  height: 100%;
  width: 30%;
  @media (min-width: 768px) {
    display:none;
  }
`
const TitleBox = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  place-content: space-between;
  margin: 0 0 30px 0;
`

const ContactInfo = styled.div`
  font-size: 1rem;
  border-top: 2px solid #d2c5b8;
  background-color: #f5f1eb;
  font-family: 'Maitree', serif;
  .ant-row {
    border-bottom: 2px solid #d2c5b8;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
    align-items: center;
  }
  .ant-image {
    display: block;
  }
  a {
    color: #1890ff;
  }
  @media (min-width: 768px) {
    border: 2px solid #d2c5b8;
    border-bottom:0;
    margin-bottom: 0px;
    font-size: 1.1rem;
    .ant-row {
      padding-top: 17px;
      padding-bottom: 17px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 0;
      align-items: center;
    }
  }
  @media (min-width: 992px) {
    border: 2px solid #d2c5b8;
    margin-bottom: 20px;
    border-bottom: 0;
  }

`
const ShareBox = styled.div`
  border-bottom: 2px solid #d2c5b8;
  .ant-image {
    display: block;
  }
  @media (min-width: 768px) {
    margin-bottom: 50px;
  }
  @media (min-width: 992px) {
    border: 2px solid #d2c5b8;
  }
`
const ShareLeft = styled.div`
  font-weight: 300;
  font-family: "Maitree";
  font-size: 1.3rem;
  background-color: #1e315c;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  @media (min-width: 768px) {
    font-family: "Georgia";
  }
`
const ShareRight = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    border-bottom: 0;
  }
`
const PatternShare = styled.div`
  background-size: 84%;
  border: 2px solid #d2c5b8;
  border-bottom:0;
  border-top:0;
  height: 70px;
  background-image: url(${props => props.img});
  @media (min-width: 992px) {
    border-right: 0;
  }
`
const ForWork = styled.div`
  margin-bottom: 4% !important;
  display: flex;
  font-family: 'Maitree',serif;
  margin: 0;
  align-items: center;
  font-size: 16px;
  a {
    color: #1890ff;
  }
  span {
    padding-left: 10px;
  }
  @media(min-width: 768px){
    font-size: 20px;
  }
  @media(max-width: 992px){
    padding-bottom: 4% !important;
  }
`
const Underline = styled.div`
  border-bottom: solid 3px #555555;
  width: 25px;
  margin: auto;
  border-radius: 26%;
`
const MoreReview = styled.div`
  width: 96%;
  margin: auto;
  margin-top: 40px;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman';
    span{
      color: #233d77;
      font-family: "Confidante";
      font-weight: normal;
    }
  }
  @media (min-width: 768px) {
    width: 100%;
    margin-top: 20px;
    h2 {
      font-size: 2.2rem;
      span{
      }
    }
  }
`
const MoreReviewCard = styled.div`
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
.ant-card-meta-title {
  font-family: maitree;
  font-weight: bold;
  white-space: normal;
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
`
const Content = styled.div`
  p {
    font-size: 16px;
    margin: 0;
    word-break: break-word;
    font-family: 'Maitree', serif;
    padding :5%;
  }
  h4.article-header{
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    text-align: center;
    font-weight: 400;
    font-family: 'Work Sans', sans-serif;
    font-size: 1.2em;
  }
  h2.article-header{
    font-size: 1.7em;
    margin-top: 10px;
    padding: 20px;
    padding-bottom: 0;
    padding-top: 10px;
    text-align: center;
    font-family: "Georgia";
    color: #1E315C;
  }
  .divide-image {
   width: 30px;
  }
  img {
    // width: 90%;
  }
  .image-container {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 4px;
    width: 100%;
  }
  .caption {
    text-align: center;
    font-size: 14px;
    margin: 5px;
    margin-bottom: 0px;
    font-family: maitree;
    font-weight: 400;
    color: black;
  }
  img {
    height: 100%;
  }

  @media (min-width: 768px) {

    p {
      font-size: 20px;
      padding:0;
      padding-top: 3%;
      padding-bottom: 4%;
    }
    h2.article-header{
      padding: 0;
      font-size: 2.8rem;
      color: black;
      text-align: start;
      margin: 0px;
      margin-bottom: 5px;
    }
    .caption {
      text-align: center;
      font-size: 15px;
      margin: 8px;
      margin-top: 12px;
    }
    .caption-border {    
      border: 1px solid #9e9e9e;
      margin: 3px;
    }
    .image-container {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: 5px;
    }
    .divide-image {
      width: 20px;
    }
    img {
      // width: 90%;
    }
  }
`
