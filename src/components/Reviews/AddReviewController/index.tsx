import React, { useState } from 'react'
import styled from 'styled-components'
import ReviewsEditor from '@/components/Reviews/AddReviewController/_components/ReviewsEditor'
import Head from 'next/head'
import ProtectedRoute from '@/components/ProtectedRoute'
import useFetchReview from '@/components/Reviews/AddReviewController/hooks/useFetchReview'

let { Row, Typography, Col, Steps, Button, Result } = require('antd')
const { Title } = Typography
const { Step } = Steps

Row = styled(Row)`
  font-family: Georgia;
`

const Wrapper = styled.div`
  min-height: 80vh;
  margin: 10px 0;
`

export default function Add() {
  useFetchReview()

  return (
    <>
      <Head>
        <link rel='stylesheet' href='/assets/css/editor.css' />
      </Head>

      <ProtectedRoute>
        <Wrapper>
          <Row justify='center' align='top'>
            <Col xs={24} md={22}>
              <Title level={3}>Add Review</Title>
            </Col>

            <ReviewsEditor />
          </Row>
        </Wrapper>
      </ProtectedRoute>
    </>
  )
}
