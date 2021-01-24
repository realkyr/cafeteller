import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Col, Row, Select } from 'antd'

import styled from 'styled-components'

const { Option } = Select

const Map = styled.div`
  width: 100%;
  height: 50vh;
  background: gray;
`

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      map: null,
      markers: []
    }
  }

  componentDidMount () {
    const { google } = window
    const { reviews } = this.props
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    })
    const markers = Object.values(reviews).map(r => r.cafe.location)
    console.log(markers)
    this.setState({ map })
  }

  render () {
    const { amphoes, changwats, reviews } = this.props
    return (
      <>
        <Head>
          <title>Cafeteller || Search</title>
        </Head>
        <Row justify="center">
          <Col xs={23} md={11}>
            <Row>
              <Col span={24}>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                >
                  {
                    Object.keys(reviews).map(
                      r => (<Option key={r}>{reviews[r].cafe.name}</Option>)
                    )
                  }
                </Select>
              </Col>
              <Col xs={8}>
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
              <Col xs={2}></Col>
            </Row>
            <Map id="map" />
          </Col>
          <Col xs={23} md={11}></Col>
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
