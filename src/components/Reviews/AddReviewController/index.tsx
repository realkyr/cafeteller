import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { IGPost } from '@/components/Reviews/types'
import IGPosts from '@/components/Reviews/AddReviewController/_components/IGPosts'
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
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<IGPost | undefined>(undefined)
  const [path, setPath] = useState('')

  const router = useRouter()

  const save = async (path: string) => {
    setPath(path)
    setStep(2)
    window.scrollTo(0, 0)
  }

  const finishAddReview = (to: string) => {
    if (to === 'review') router.push(path)
    else router.push('/')
  }

  const stepsContent = () => {
    switch (step) {
      case 0:
        return (
          <IGPosts
            onSkip={() => {
              setStep(1)
              window.scrollTo(0, 0)
            }}
            onSelect={setSelected}
          />
        )
      case 1:
        return <ReviewsEditor />
      case 2:
        return (
          <Result
            status='success'
            title='ทำการเพิ่มรีวิวสำเร็จ'
            // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button
                onClick={() => finishAddReview('review')}
                type='primary'
                key='console'
              >
                ไปยังหน้ารีวิว
              </Button>,
              <Button onClick={finishAddReview} key='buy'>
                กลับสู่หน้าหลัก
              </Button>
            ]}
          />
        )
      default:
        break
    }
  }

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
            <Col xs={24} md={22}>
              <Steps className='th' current={step} responsive='true'>
                <Step
                  title='เลือกโพสต์จาก Instagram'
                  description='เลือกโพสต์ตั้งต้นจาก Instagram'
                />
                <Step title='เขียนรีวิว' />
                <Step title='Save เรียบร้อย' />
              </Steps>
            </Col>
            {stepsContent()}
          </Row>
        </Wrapper>
      </ProtectedRoute>
    </>
  )
}
