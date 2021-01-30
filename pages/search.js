import firebase from 'plugins/firebase'
import { loader } from '../plugins/gmap'
import {
  isArrayHasDuplicateEl,
  isArrayExist
} from '../plugins/customfunc'
import types from 'public/assets/json/types'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Col, Row, Select, Card, Image, message } from 'antd'
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons'

import styled from 'styled-components'

const { Meta } = Card
const { Option } = Select

const Map = styled.div`
  width: 100%;
  height: 60vh;
  background: gray;
  box-shadow: inset 0 0 10px #000000;
  z-index: -1;
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

  setMapVisibleToMarker (map, markers) {
    const { google } = window
    const bounds = new google.maps.LatLngBounds()
    for (const m of markers) {
      const position = m.getPosition()
      bounds.extend(position)
    }
    map.fitBounds(bounds)
  }

  componentDidMount () {
    console.log('component did mount')
    const didMount = async () => {
      if (!window.google) await loader.load()
      const { google } = window
      const { reviews } = this.props
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
      const markers = Object.entries(reviews).map(r => {
        const marker = new google.maps.Marker({
          map,
          icon: '/assets/Images/pin.png',
          animation: google.maps.Animation.DROP,
          position: { lat: r[1].cafe.location.lat, lng: r[1].cafe.location.lon }
        })
        reviews[r[0]].marker = marker
        return marker
      })

      this.setMapVisibleToMarker(map, markers)

      this.setState({ map, markers })
    }
    didMount()
  }

  displayAllMarkers (markers, map) {
    if (!markers) markers = this.state.markers
    markers.forEach(m => m.setMap(map))
  }

  clearMarkers () {
    const { markers } = this.state
    this.displayAllMarkers(markers, null)
  }

  displaySelectedMarkers (markers) {
    const { map } = this.state
    this.displayAllMarkers(markers, map)
  }

  filterProvince () {
    const { reviews } = this.props
    const { map, selectedAmphoes, selectedChangwats, selectedTypes } = this.state
    // clear all marker
    this.clearMarkers()

    // filter marker by location
    const markers = Object.keys(reviews).filter(id => {
      const review = reviews[id]
      let condition = true
      if (isArrayExist(selectedTypes)) condition = condition && isArrayHasDuplicateEl(selectedTypes, review.cafe.tags)
      if (isArrayExist(selectedChangwats)) condition = condition && selectedChangwats.includes(review.cafe.administrative_area_level_1)
      if (isArrayExist(selectedAmphoes)) condition = condition && selectedAmphoes.includes(review.cafe.sublocality_level_1)
      return condition
    }).map(id => reviews[id].marker)

    if (!isArrayExist(markers)) {
      message.error('ไม่มีคาเฟ่ตามเงื่อนไข')
      map.panTo({
        lat: 13.03887,
        lng: 101.490104
      })
      map.setZoom(6)
    } else {
    // display only marker and then visible fit bounds
      this.displaySelectedMarkers(markers)
      this.setMapVisibleToMarker(map, markers)
    }
  }

  render () {
    const { amphoes, changwats, reviews } = this.props
    const { map, markers } = this.state
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
                  <Row gutter={[16, 12]}>
                    <Col span={9}>
                      <Select
                        showSearch
                        onChange={id => {
                          if (id) {
                            const selectedMarker = reviews[id].marker
                            this.clearMarkers()
                            this.displaySelectedMarkers([selectedMarker])
                            map.panTo(selectedMarker.getPosition())
                            map.setZoom(15)
                          } else {
                            this.displayAllMarkers(markers, map)
                            this.setMapVisibleToMarker(map, markers)
                          }
                        }}
                        allowClear
                        optionFilterProp="children"
                        placeholder="ค้นหาด้วยชื่อคาเฟ่"
                        style={{ width: '100%' }}
                      >
                        {
                          Object.keys(reviews).map(
                            r => (<Option value={r} key={r}>{reviews[r].cafe.name}</Option>)
                          )
                        }
                      </Select>
                    </Col>
                    <Col span={9}>
                      <Select
                        showSearch
                        onChange={selectedTypes => this.setState({ selectedTypes }, this.filterProvince)}
                        mode="multiple"
                        allowClear
                        maxTagCount="responsive"
                        optionFilterProp="children"
                        placeholder="ค้นหาด้วยประเภท"
                        style={{ width: '100%' }}
                      >
                        {
                          types.map(
                            r => (<Option value={r.value} key={r.key}>{r.value}</Option>)
                          )
                        }
                      </Select>
                    </Col>
                    <Col xs={9}>
                      <Select
                        mode="multiple"
                        maxTagCount="responsive"
                        allowClear
                        onChange={selectedChangwats => {
                          this.setState({ selectedChangwats }, this.filterProvince)
                        }}
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="ค้นหาจังหวัด"
                        optionLabelProp="label"
                      >
                        {
                          Object.keys(changwats).map(changwatId => (
                            <Option
                              key={changwatId}
                              value={changwats[changwatId].name.th}
                              label={changwats[changwatId].name.th}
                            >
                              {
                                changwats[changwatId].name.th
                              }
                            </Option>
                          ))
                        }
                      </Select>
                    </Col>
                    <Col xs={9}>
                      <Select
                        mode="multiple"
                        allowClear
                        maxTagCount="responsive"
                        style={{ width: '100%' }}
                        onChange={selectedAmphoes => {
                          this.setState({ selectedAmphoes }, this.filterProvince)
                        }}
                        optionFilterProp="children"
                        placeholder="ค้นหาอำเภอ/เขต"
                        optionLabelProp="label"
                      >
                        {
                          Object.keys(amphoes)
                            .filter(amphoeId => {
                              const { selectedChangwats } = this.state
                              const province = changwats[amphoes[amphoeId].changwat_id].name.th
                              if (!isArrayExist(selectedChangwats)) return true
                              return selectedChangwats.includes(province)
                            })
                            .map(amphoe => (
                              <Option key={amphoe} value={amphoes[amphoe].name.th} label={amphoes[amphoe].name.th}>
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
                    <SearchOutlined className="searchBox-icon" />
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
export async function getServerSideProps () {
  // Call an external API endpoint to get posts
  const amphoes = await import('../public/assets/json/amphoes.json')
  const changwats = await import('../public/assets/json/changwats.json')

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

  return {
    props: {
      amphoes: amphoes.default,
      changwats: changwats.default,
      reviews
    }
  }
}
