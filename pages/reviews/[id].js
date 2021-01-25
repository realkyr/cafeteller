import axios from 'axios'
import PropTypes from 'prop-types'

import React, { useState, useLayoutEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { loader } from '../../plugins/gmap'

import { Typography, Row, Col, Image, Card } from 'antd'

const { Meta } = Card
const { Title } = Typography
const Map = styled.div`
  width: 100%;
  height: 400px;
  background: grey;
  border-bottom: 2px solid #d2c5b8;
`
const Pattern = styled.div`
  background-size: 100%;
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
const Banner = styled.div`
  height: 0;
  padding-bottom: 66.66%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .ant-image{
    height: 100%;
    position: absolute;
    top: 0;
    display: inline-block;
  }
  @media (min-width: 768px) {
    margin-bottom: 30px;
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
  @media (min-width: 1600px) {
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
  @media (min-width: 1200px) {
    margin-bottom: 0px;
  }
  @media (min-width: 1600px) {
    border: 2px solid #d2c5b8;
    margin-bottom: 0px;
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
    font-size: 1.2rem;
  }
  h2.article-header{
    font-size: 1.8rem;
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

export default function Home ({ reviews }) {
  const router = useRouter()
  const { id } = router.query
  const [content, setContent] = useState([])

  // eslint-disable-next-line no-unused-vars
  let map
  let marker

  useLayoutEffect(() => {
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
          raw.push(<TitleBox><TitlePattern img={'/assets/Images/pattern4.jpg'} /><Title level={block.data.level +
            2} className="article-header">{cafeArea}</Title><TitlePattern img={'/assets/Images/pattern4.jpg'} /></TitleBox>)
          consecImage = 0
          break
        }
        case 'paragraph':
          raw.push(<p>{block.data.text}</p>)
          consecImage = 0
          break
        case 'image': {
          const image = <Image height={'100%'} width={'100%'} className="res-img"
            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} src={block.data.file.url}
            fallback="/assets/Images/placeholder.png" preview={false} />
          // <img style={{
          //   display: 'inline',
          //   width: '100%',
          //   objectFit: 'cover'
          // }}
          //   src={block.data.file.url} className="res-img"
          // />
          let caption = ''
          if (block.data.caption) {
            caption = <div className="caption">{block.data.caption}</div>
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
      <Row align="middle" justify="center">
        <Col xs={24} xxl={18}>
          <Banner>
            <Image height={'100%'} width={'100%'} style={{ objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }}
              alt={reviews[id].cafe.banner.url} src={reviews[id].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false}
            />
          </Banner>
          <Row justify="space-around">
            <Col xs={24} md={19} xxl={16}>
              {/* <Title>{reviews[id].cafe.name}</Title> */}
              <Content>{content}</Content>
            </Col>
            <Col xs={24} md={19} xxl={7}>
              <ContactInfo>
                {(() => {
                  const contactBox = []
                  if (typeof reviews[id].cafe.openhour !== 'undefined') {
                    contactBox.push(
                      <Row>
                        <Col span={4}>
                          <Image src="/assets/Images/icon/Open hours.png" preview={false} height={30} width={30} />
                        </Col>
                        <Col span={20}>{reviews[id].cafe.openhour}</Col>
                      </Row>
                    )
                  }
                  if (typeof reviews[id].cafe.parking !== 'undefined') {
                    contactBox.push(
                      <Row>
                        <Col span={4}>
                          <Image src="/assets/Images/icon/parking.png" preview={false} height={35} width={35} />
                        </Col>
                        <Col span={20}>{reviews[id].cafe.parking}</Col>
                      </Row>
                    )
                  }
                  if (typeof reviews[id].cafe.phone !== 'undefined') {
                    contactBox.push(
                      <Row>
                        <Col span={4}>
                          <Image src="/assets/Images/icon/call.png" preview={false} height={30} width={30} />
                        </Col>
                        <Col span={20}>{reviews[id].cafe.phone}</Col>
                      </Row>
                    )
                  }
                  if (typeof reviews[id].cafe.details !== 'undefined') {
                    contactBox.push(
                      <Row>
                        <Col span={4}>
                          <Image src="/assets/Images/icon/address.png" preview={false} height={30} width={30} />
                        </Col>
                        <Col span={20}>{reviews[id].cafe.details}</Col>
                      </Row>
                    )
                  }
                  if (typeof reviews[id].cafe.landmark !== 'undefined') {
                    contactBox.push(
                      <Row>
                        <Col span={4}>
                          <Image src="/assets/Images/icon/location.png" preview={false} height={30} width={30} />
                        </Col>
                        <Col span={20}>{reviews[id].cafe.landmark}</Col>
                      </Row>
                    )
                  }
                  return (
                    contactBox
                  )
                })()
                }
                <Map id="map"></Map>
              </ContactInfo>
              <ShareBox>
                <Row>
                  <Col xs={7} md={5}>
                    <ShareLeft><span>Share</span></ShareLeft>
                  </Col>
                  <Col xs={17} md={7}>
                    <ShareRight>
                {(() => {
                  const shareBox = []
                  if (typeof reviews[id].cafe.ig !== 'undefined') {
                    shareBox.push(
                      <a href={reviews[id].cafe.ig}>
                        <Image src="/assets/Images/icon/Social/IG.png" preview={false} height={30} width={30} />
                      </a>
                    )
                  }
                  if (typeof reviews[id].cafe.fb !== 'undefined') {
                    shareBox.push(
                      <a href={reviews[id].cafe.fb}>
                        <Image src="/assets/Images/icon/Social/FB.png" preview={false} height={30} width={30} />
                      </a>
                    )
                  }
                  if (typeof reviews[id].cafe.tw !== 'undefined') {
                    shareBox.push(
                      <a href={reviews[id].cafe.tw}>
                        <Image src="/assets/Images/icon/Social/Twitter.png" preview={false} height={30} width={30} />
                      </a>
                    )
                  }
                  return (
                    shareBox
                  )
                })()
                }
                    </ShareRight>
                  </Col>
                  <Col xs={0} md={12} xl={0}>
                    <PatternShare img={'/assets/Images/pattern2.jpg'} />
                  </Col>
                </Row>
              </ShareBox>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Pattern img={'/assets/Images/pattern5.jpg'}></Pattern>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={22} xxl={18}>
          <MoreReview>
            <h2><span>More</span> Like This</h2>
            <Row>
            {
              Object.keys(reviews).map((r, i) => {
                if (i < 2) {
                  return (
                  // <Link href={`/reviews/${r}`}>
                  // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                  <Col key={r + '-link'} xs={12} md={8}>
                      <MoreReviewCard key={r}>
                        <Link href={`/reviews/${r}`}>
                            <Card
                              bordered={false}
                              cover={<Image height={'100%'} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                            >
                              <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                            </Card>
                        </Link>
                      </MoreReviewCard>
                    </Col>
                    // </Link>
                  )
                }
                return null
              })
            }
            </Row>
          </MoreReview>
        </Col>
      </Row>
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
  const res = await axios.get('https://api.cafeteller.club/review')
  const reviews = res.data
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      reviews
    }
  }
}
