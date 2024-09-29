import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { IGPost } from '@/components/Reviews/types'
import IGPosts from '@/components/Reviews/AddReviewController/_components/IGModal/IGPosts'
import ReviewsEditor from '@/components/Reviews/AddReviewController/_components/ReviewsEditor'
import Head from 'next/head'
import ProtectedRoute from '@/components/ProtectedRoute'

let { Row, Typography, Col, Steps, Button, Result } = require('antd')
const { Title } = Typography
const { Step } = Steps

Row = styled(Row)`
  font-family: Georgia;
`

const Link = styled.div`
  width: 100%;
  height: 250px;
  padding: 25px;
`

const Wrapper = styled.div`
  min-height: 80vh;
  margin: 10px 0;
`

export default function Add() {
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
