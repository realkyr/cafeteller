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
// import { SearchOutlined } from '@ant-design/icons'

import styled from 'styled-components'

const { Meta } = Card
const { Option } = Select

const Map = styled.div`
  width: 100%;
  background: gray;
  box-shadow: inset 0 0 10px #000000;
  position: fixed !important;
  height: calc(100vh - 196px);
  @media (min-width: 768px) {
    height: calc(100% - 112px);
    position: relative !important;
  }
`
const MapContainer = styled.div`
  height: calc(100vh - 200px);
  /* margin-top: 25px; */
  @media (min-width: 768px) {
    margin-right: 0px;
    height: 100%;
    border: 1px #bcbcbc solid;
  }
  @media (min-width: 1025px) {
    margin-right: 1em;
  }
`
const MapHeader = styled.div`
  display: none;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
  padding: 15px;
  background: #F5F1EB;
  z-index: 1;
  position: relative;
  .ant-row {
    margin-bottom: 0 !important;
  }
  @media (min-width: 768px) {
    display: block;
  }
`

const SearchReview = styled.div`
  display: none;
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
    }
  }
  @media (min-width: 768px) {
    margin-left: -1px;
    display: block;
    width: 101%;
    margin-top:  0px;
    border: 1px solid #bcbcbc;
    /* background-color: #f5f1eb; */
    h2 {
      font-family: "Georgia";
      margin-bottom: 0px;
      padding: 10px;
      font-size: 1.8rem;
      background-color: #f5f1eb;
      span{
      }
    }
  }
  @media (min-width: 1024px) {
    margin-left: 0px;
    width: 100%;
  }
`
const SearchReviewCard = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 15px;
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
.ant-card-meta-description {
    font-size: 23px;
    line-height: 23px;
    padding-bottom: 8px;
}
.card-shadow {
  border-radius: 20px;
  height: auto;
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
@media (min-width: 768px) {
  margin-bottom: 10px;
  .ant-card {
  }
  .ant-card-cover {
    padding-top: 66%;
  }
  .ant-card-body {
    padding: 1vw;
  }
  .ant-card-meta-title {
      font-size: 1.3em;
  }
  .ant-card-meta-description {
      font-size: 1.8em;
      line-height: unset;
      padding-bottom: 0px;
  }
}
`
const SearchReviewCardMobile = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 0px;
width: 100%;
img{
  object-fit: cover;
}
.ant-card-cover {
  padding-top: 25%;
  overflow: hidden;
  /* height: 0; */
  position: relative;
  width: 100%;
  flex: 0 0 37%;
}
.ant-card-body {
  /* text-align: start; */
  display: flex;
  align-items: flex-start;
  justify-content: center;
    padding: 12px 15px 8px;
  width: 100%;
  height: auto;
}
.ant-card-meta-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}
.ant-card-meta {
  line-height: 1.3;
  width: 100%;
  height: 100%;
}
.ant-card-meta-title {
  font-family: maitree;
  font-weight: bold;
  white-space: normal;
  font-size: 1em;
  margin-bottom: 0px !important;
}
.ant-card-meta-description {
  font-size: 1.3em;
  line-height: 1.3em;
}
.card-shadow {
  border-radius: 12px;
  height: auto;
  &:hover {
    box-shadow: 8px 8px 1px 2px #dfceaf;
    .ant-card {
      box-shadow: 0px 0px 0px 3px #1e315c;
    }
  }
}
.ant-card {
  flex-flow: row;
  transition-timing-function: cubic-bezier(0.1, 0.85, 0.31, 0.99);
  transition-duration: .1s;
  box-shadow: 0px 0px 0px 1.5px #C4C4C4;
  border-radius: 12.5px;
  width: 100%;
  height: auto;
}
.ant-image {
  top: 0;
  height: 100%;
  position: absolute;
}
.ant-image-img {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
`
const MapSearchMenuContainer = styled.div`
  /* height: 200px; */
  background: aliceblue;
  /* position: static; */
  z-index: 20;
  overflow-y: scroll;
  height: 142px;
  @media (min-width: 768px) {
    display: none;
  }
  h2 {
    text-align: center;
    font-family: "Georgia";
    font-size: 1.5rem;
    background-color: #f5f1eb;
    span{
      color: #233d77;
    }
  }
`
const MapSearchMenu = styled.div`
background-color: #F5F1EB;
padding: 7px;
height: 100%;
min-height: 50vh;
  /* background-color: #f5f1eb;
  padding: 20px;
  padding-top: 10px;
  min-height: 100vh;
  height: auto;
  position: absolute;
  width: 100%;
  box-shadow: 0px 0px 7px #bdbdbd;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px; */
`
const MapSearchMenuInput = styled.div`
/* display: grid;
grid-template-columns: 50% 50%;
grid-row-gap: 10px;
grid-gap: 10px; */
display: flex;
  flex-wrap: wrap;
  margin: 7px 0px 5px;
    justify-content: space-between;
    align-content: space-between;
  .ant-select{
    flex: 0 0 48%;
    /* max-width: 50%; */
    width: 100%;
    height: 100%;
  }
  /* .ant-select-focused {
    flex: 0 0 100%;
    z-index: 2;
  } */
  .ant-select-selector {
    border: 0 !important;
    height: 32px !important;
    margin-bottom: 10px;
  }
  .ant-select-arrow {
    top: 40%;
  }
`
const Pattern1 = styled.div`
padding: 0 19px;
/* height: calc(100vh - 56px); */
height: auto;
position: absolute;
width: 100%;
box-shadow: 0px 0px 7px #bdbdbd;
border-top-left-radius: 12px;
border-top-right-radius: 12px;
  /* height: 63px; */
  background-image: url(${props => props.img});
  /* background-size: 4%; */
`

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      map: null,
      markers: [],
      filteredReviews: [...Object.keys(props.reviews)]
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

    const filteredReviews = Object.keys(reviews).filter(id => {
      const review = reviews[id]
      let condition = true
      if (isArrayExist(selectedTypes)) condition = condition && isArrayHasDuplicateEl(selectedTypes, review.cafe.tags)
      if (isArrayExist(selectedChangwats)) condition = condition && selectedChangwats.includes(review.cafe.administrative_area_level_1)
      if (isArrayExist(selectedAmphoes)) condition = condition && selectedAmphoes.includes(review.cafe.sublocality_level_1)
      return condition
    })

    this.setState({ filteredReviews })

    // filter marker by location
    const markers = filteredReviews.map(id => reviews[id].marker)

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
    const { map, markers, filteredReviews } = this.state
    return (
      <>
        <Head>
          <title>Cafeteller || Search</title>
        </Head>
        <Row justify="center" className='search-wrap'>
          <Col xs={24} lg={22} xxl={18}>
            <Row>
              <Col xs={24} md={17} xxl={18}>
                <MapContainer>
                  <MapHeader>
                    <div>
                  <Row gutter={[16, 12]} justify='center'>
                    <Col span={12}>
                      <Select
                        showSearch
                        onChange={id => {
                          if (id) {
                            const selectedMarker = reviews[id].marker
                            this.clearMarkers()
                            this.displaySelectedMarkers([selectedMarker])
                            map.panTo(selectedMarker.getPosition())
                            map.setZoom(15)
                            this.setState({
                              filteredReviews: [id]
                            })
                          } else {
                            this.displayAllMarkers(markers, map)
                            this.setMapVisibleToMarker(map, markers)
                            this.setState({
                              filteredReviews: [...Object.keys(reviews)]
                            })
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
                    <Col span={12}>
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
                    <Col xs={12}>
                      <Select
                        mode="multiple"
                        maxTagCount="responsive"
                        allowClear
                        onChange={selectedChangwats => {
                          this.setState({ selectedChangwats }, this.filterProvince)
                        }}
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="ค้นหาด้วยจังหวัด"
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
                    <Col xs={12}>
                      <Select
                        mode="multiple"
                        allowClear
                        maxTagCount="responsive"
                        style={{ width: '100%' }}
                        onChange={selectedAmphoes => {
                          this.setState({ selectedAmphoes }, this.filterProvince)
                        }}
                        optionFilterProp="children"
                        placeholder="ค้นหาด้วยอำเภอ/เขต"
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
                    {/* <SearchOutlined className="searchBox-icon" /> */}
                  </Row>
                  </div>
                  </MapHeader>
                  <Map id="map" />
                </MapContainer>
              </Col>
              <Col xs={24} md={{ span: 7 }} xxl={{ span: 6 }}>
                <SearchReview>
                  <h2><span>{filteredReviews.length}</span> Reviews</h2>
                  <Row align='top' style={{ overflowY: 'scroll', padding: 13, paddingTop: 0, height: '87vh' }}>
                  {
                    Object.keys(reviews).map((r) => {
                      if (filteredReviews && filteredReviews.includes(r)) {
                        return (
                          <Col key={r + '-link'} xs={24}>
                              <SearchReviewCard key={r}>
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
                              </SearchReviewCard>
                            </Col>
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
        <MapSearchMenuContainer id="search-menu-mobile">
          <Pattern1 img={'/assets/Images/pattern6.jpg'}>
          <MapSearchMenu>
            <h2><span>{filteredReviews.length}</span> Reviews</h2>
              <MapSearchMenuInput>
                {/* <Row gutter={[10, 8]} justify='center'>
                  <Col span={12}> */}
                    <Select
                      showSearch
                      onChange={id => {
                        if (id) {
                          const selectedMarker = reviews[id].marker
                          this.clearMarkers()
                          this.displaySelectedMarkers([selectedMarker])
                          map.panTo(selectedMarker.getPosition())
                          map.setZoom(15)
                          this.setState({
                            filteredReviews: [id]
                          })
                        } else {
                          this.displayAllMarkers(markers, map)
                          this.setMapVisibleToMarker(map, markers)
                          this.setState({
                            filteredReviews: [...Object.keys(reviews)]
                          })
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
                  {/* </Col>
                  <Col span={12}> */}
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
                  {/* </Col>
                  <Col xs={12}> */}
                    <Select
                      mode="multiple"
                      maxTagCount="responsive"
                      allowClear
                      onChange={selectedChangwats => {
                        this.setState({ selectedChangwats }, this.filterProvince)
                      }}
                      style={{ width: '100%' }}
                      optionFilterProp="children"
                      placeholder="ค้นหาด้วยจังหวัด"
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
                  {/* </Col>
                  <Col xs={12}> */}
                    <Select
                      mode="multiple"
                      allowClear
                      maxTagCount="responsive"
                      style={{ width: '100%' }}
                      onChange={selectedAmphoes => {
                        this.setState({ selectedAmphoes }, this.filterProvince)
                      }}
                      optionFilterProp="children"
                      placeholder="ค้นหาด้วยอำเภอ/เขต"
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
                  {/* </Col>
                  </Row> */}
            </MapSearchMenuInput>
                  <Row gutter={[10, 12]}>
                  {/* <SearchOutlined className="searchBox-icon" /> */}
                {
                  Object.keys(reviews).map((r) => {
                    if (filteredReviews && filteredReviews.includes(r)) {
                      return (
                        <Col key={r + '-link'} xs={24}>
                            <SearchReviewCardMobile key={r}>
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
                            </SearchReviewCardMobile>
                          </Col>
                      )
                    }
                    return null
                  })
                }
                </Row>
          </MapSearchMenu>
          </Pattern1>
        </MapSearchMenuContainer>
        <style jsx global>{`
          @media (max-width: 767.9px) {
            #footer {
              display: none;
            }
            ::-webkit-scrollbar {
              display: none;
            }
            
          }
        `}</style>
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
