import React, { useState, useRef } from 'react'
import { Col, Row, Select } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import MapHeaderSearch from '@/components/Search/components/MapHeaderSearch'
import {
  MapSearchMenu,
  MapSearchMenuContainer,
  Pattern1
} from '@/components/Search/Search.style'

const { Option } = Select

const Card = dynamic(
  () => import('core_cafeteller/components').then((module) => module.Card),
  { ssr: false }
)

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
    margin-right: 0;
    height: 100%;
    border: 1px #bcbcbc solid;
  }
  @media (min-width: 1025px) {
    margin-right: 1em;
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

    span {
      color: #233d77;
    }
  }

  @media (min-width: 768px) {
    margin-left: -1px;
    display: block;
    width: 101%;
    margin-top: 0;
    border: 1px solid #bcbcbc;
    /* background-color: #f5f1eb; */
    h2 {
      font-family: 'Georgia';
      margin-bottom: 0;
      padding: 10px;
      font-size: 1.8rem;
      background-color: #f5f1eb;

      span {
      }
    }
  }
  @media (min-width: 1024px) {
    margin-left: 0;
    width: 100%;
  }
`

const SearchReviewCard = styled.div`
  margin-top: 15px;
  width: 95%;
`

export default function Search({ reviews }: any) {
  const [filteredReviews, setFilteredReviews] = useState([
    ...Object.keys(reviews)
  ])
  // const popupRefs = useRef(
  //   Object.keys(reviews).reduce((acc, id) => {
  //     acc[id] = React.createRef()
  //     return acc
  //   }, {})
  // )
  //
  // const filterReviews = (selectedTypes) => {
  //   // Add filtering logic here (if needed)
  //   setFilteredReviews([...Object.keys(reviews)]) // Display all reviews for now
  // }

  return (
    <>
      <Row justify='center' className='search-wrap'>
        <Col xs={24} lg={22} xxl={18}>
          <Row>
            <Col xs={24} md={17} xxl={18}>
              <MapContainer>
                <MapHeaderSearch className='hidden md:block' />
                <Map id='map' />
              </MapContainer>
            </Col>
            <Col xs={24} md={{ span: 7 }} xxl={{ span: 6 }}>
              <SearchReview>
                <h2>
                  <span>{filteredReviews.length}</span> Reviews
                </h2>

                <Row style={{ overflowY: 'scroll', height: '87vh' }}>
                  {filteredReviews.map((r) => (
                    <Col key={r} xs={24}>
                      <SearchReviewCard>
                        <Link href={`/reviews/${r}`}>
                          <Card
                            description={reviews[r].cafe.sublocality_level_1}
                            key={reviews[r].id}
                            title={reviews[r].cafe.name}
                            src={reviews[r].cafe.banner?.url}
                            className='h-96 lg:h-[28rem]'
                          />
                        </Link>
                      </SearchReviewCard>
                    </Col>
                  ))}
                </Row>
              </SearchReview>
            </Col>
          </Row>
        </Col>
      </Row>

      <MapSearchMenuContainer id='search-menu-mobile'>
        <Pattern1 img={'/assets/Images/pattern6.jpg'}>
          <MapSearchMenu>
            <h2>
              <span>{filteredReviews.length}</span> Reviews
            </h2>

            <MapHeaderSearch className='block md:hidden shadow-none mb-2' />
            <Row gutter={[10, 12]}>
              {Object.keys(reviews).map((r) => {
                if (filteredReviews && filteredReviews.includes(r)) {
                  return (
                    <Col key={r + '-link'} xs={24}>
                      <Link href={`/reviews/${r}`}>
                        <Card
                          description={reviews[r].cafe.sublocality_level_1}
                          key={reviews[r].id}
                          title={reviews[r].cafe.name}
                          src={reviews[r].cafe.banner?.url}
                          className='h-96 lg:h-[28rem]'
                        />
                      </Link>
                    </Col>
                  )
                }
                return null
              })}
            </Row>
          </MapSearchMenu>
        </Pattern1>
      </MapSearchMenuContainer>
    </>
  )
}

// Example props to simulate the removed server-side functionality
Search.defaultProps = {
  reviews: {
    '1': {
      cafe: {
        name: 'Cafe 1',
        sublocality_level_1: 'Area 1',
        banner: { url: '/assets/Images/cafe1.png' }
      }
    },
    '2': {
      cafe: {
        name: 'Cafe 2',
        sublocality_level_1: 'Area 2',
        banner: { url: '/assets/Images/cafe2.png' }
      }
    }
  }
}
