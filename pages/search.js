import axios from 'axios'
// import { loader } from '../plugins/gmap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Col, Row, Select, Card, Image } from 'antd'
import Link from 'next/link'

import styled from 'styled-components'

const { Meta } = Card
const { Option } = Select

const Map = styled.div`
  width: 100%;
  height: 50vh;
  background: gray;
`
const MapContainer = styled.div`
  margin: 15px;
  margin-top: 25px;
  border: 2px #bcbcbc solid;
`
const MapHeader = styled.div`
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
  padding: 15px;
  background: #F5F1EB;
`

const SearchReview = styled.div`
  width: 96%;
  margin: auto;
  margin-top: 40px;
  padding-right: 5px;
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
const SearchReviewCard = styled.div`
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
  font-family: maitree;
  font-weight: bold;
  white-space: normal;
  font-size: 14px;
  margin-bottom: 4px
}
.ant-card {
  width: 95%;
  height: 100%;
  display: inline-table;
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
@media (min-width: 768px) {
  margin-top: 20px;
  .ant-card {
    width: 96%;
  }
  .ant-card-cover {
    padding-top: 66%;
  }
  .ant-card-body {
    padding: 1vw;
  }
}
`

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      map: null,
      markers: []
    }
  }

  // componentDidMount () {
  //   console.log('component did mount')
  //   loader.load().then(() => {
  //     const { google } = window
  //     const { reviews } = this.props
  //     const map = new google.maps.Map(document.getElementById('map'), {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8
  //     })
  //     const markers = Object.values(reviews).map(r => new google.maps.Marker({
  //       map,
  //       animation: google.maps.Animation.DROP,
  //       position: { lat: r.cafe.location.lat, lng: r.cafe.location.lon }
  //     }))
  //     this.setState({ map, markers })
  //   })
  // }

  render () {
    const { amphoes, changwats, reviews } = this.props
    return (
      <>
        <Head>
          <title>Cafeteller || Search</title>
        </Head>
        <Row justify="center">
          <Col xs={24} xxl={18}>
            <Row>
              <Col xs={24} md={17} lg={18}>
                <MapContainer>
                  <MapHeader>
                  <Row>
                    <Col span={8}>
                      <Select
                        showSearch
                        placeholder="Cafe name search"
                        style={{ width: '100%' }}
                      >
                        {
                          Object.keys(reviews).map(
                            r => (<Option key={r}>{reviews[r].cafe.name}</Option>)
                          )
                        }
                      </Select>
                    </Col>
                    <Col xs={8} offset={1}>
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="select one country"
                        optionLabelProp="label"
                      >
                        {
                          Object.keys(amphoes).map(amphoe => (
                            <Option key={amphoe} value={amphoe} label={amphoes[amphoe].name.th}>
                              {
                                changwats[amphoes[amphoe].changwat_id].name.th +
                                ' -> ' +
                                amphoes[amphoe].name.th
                              }
                            </Option>
                          ))
                        }
                      </Select>
                    </Col>
                  </Row>
                  </MapHeader>
                  <Map id="map" />
                </MapContainer>
              </Col>
              <Col xs={24} md={{ span: 7 }} lg={{ span: 5, offset: 1 }}>
                <SearchReview>
                  <h2><span>num</span> Reviews</h2>
                  <Row>
                  {
                    Object.keys(reviews).map((r, i) => {
                      if (i < 2) {
                        return (
                        // <Link href={`/reviews/${r}`}>
                        // {/* <Title key={r} level={4}>{reviews[r].cafe.name}</Title> */}
                        <Col key={r + '-link'} xs={24}>
                            <SearchReviewCard key={r}>
                              <Link href={`/reviews/${r}`}>
                                <a>
                                  <Card
                                    bordered={false}
                                    cover={<Image height={'100%'} onError={(e) => { e.target.onerror = null; e.target.src = '/assets/Images/placeholder.png' }} alt={reviews[r].cafe.name} src={reviews[r].cafe.banner.url} fallback="/assets/Images/placeholder.png" preview={false} />}
                                  >
                                    <Meta title={reviews[r].cafe.name} description={reviews[r].cafe.sublocality_level_1} />
                                  </Card>
                                  </a>
                              </Link>
                            </SearchReviewCard>
                          </Col>
                          // </Link>
                        )
                      }
                      return null
                    })
                  }
                  </Row>
                </SearchReview>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

Search.propTypes = {
  // ...prop type definitions here
  amphoes: PropTypes.object,
  changwats: PropTypes.object,
  reviews: PropTypes.object
}

// This function gets called at build time
export async function getStaticProps () {
  // Call an external API endpoint to get posts
  const amphoes = await import('../public/assets/json/amphoes.json')
  const changwats = await import('../public/assets/json/changwats.json')
  const res = await axios.get('https://api.cafeteller.club/review')
  const reviews = res.data
  return {
    props: {
      amphoes: amphoes.default,
      changwats: changwats.default,
      reviews
    }
  }
}
