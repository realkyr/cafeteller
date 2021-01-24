import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Row, Col, Image, Menu, Dropdown, Button } from 'antd'

import styled from 'styled-components'
// import Image from 'next/image'
import Link from 'next/link'

const { Title } = Typography

const Container = styled.div`
  // max-width: 1440px;
  @media (min-width: 768px) {
    margin-top: 30px;
    margin-bottom: 40px;
  }
`
const Space = styled.div`
  display: none;
  @media (min-width: 768px) {
    height: 40px;
    display: block;
  }
`
const Test = styled.div`
  background-color: grey;
  height: 65px;
`
const SocialBar = styled.div`
  background-color: #1e315c;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 80px;

  @media (min-width: 768px) {
    height: 65px;
  }
`
const SocialButton = styled.div`
  background-color: #1e315c;
  justify-content: space-evenly;
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  margin: 0px;
  padding: 0px;
`
const SocialBarBot = styled.div`
  background-color: grey;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 29px;

  @media (min-width: 768px) {
    height: 65px;
  }
`
const SocialBarMenu = (
  <Menu>
    <Menu.Item>
      <a href="http://instagram.com/">
        <Image
          src="/assets/Images/icon/Social/IG.png"
          preview={false}
          height={30}
          width={30}
        />
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="http://instagram.com/">
        <Image
          src="/assets/Images/icon/Social/FB.png"
          preview={false}
          height={30}
          width={30}
        />
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="http://instagram.com/">
        <Image
          src="/assets/Images/icon/Social/Twitter.png"
          preview={false}
          height={30}
          width={30}
        />
      </a>
    </Menu.Item>
  </Menu>
)
const ReviewBar = styled.div`
  background-color: #dfceaf;
  height: 50px;
  @media (min-width: 768px) {
    height: 65px;
  }
`
const SearchBar = styled.div`
  height: 58px;
  @media (min-width: 768px) {
    height: auto;
  }
`

export default function Navbar () {
  // const [isActive, setIsActive] = useState(false)

  return (
    <>
      <Row justify="center">
        <Col xs={24} xl={22} xxl={18}>
          <Container>
            <Row className="nav-row">
              <Col xs={0} md={6} className="nav-box n1">
                <Image
                  src="/assets/Images/logo-rotate.png"
                  preview={false}
                  height={150}
                />
              </Col>
              <Col xs={19} md={12} className="nav-box n2">
                <h1>CAFETELLER</h1>
                <h3>&quot;Because good cafés deserve a shout out&quot;</h3>
              </Col>
              <Col xs={5} md={6} className="nav-box n3">
                <Row>
                  <Col xs={0} md={24}>
                    <SocialBar>
                      <a href="http://instagram.com/">
                        <Image
                          src="/assets/Images/icon/Social/IG.png"
                          preview={false}
                          height={30}
                          width={30}
                        />
                      </a>
                      <a href="http://instagram.com/">
                        <Image
                          src="/assets/Images/icon/Social/FB.png"
                          preview={false}
                          height={30}
                          width={30}
                        />
                      </a>
                      <a href="http://instagram.com/">
                        <Image
                          src="/assets/Images/icon/Social/Twitter.png"
                          preview={false}
                          height={30}
                          width={30}
                        />
                      </a>
                    </SocialBar>
                  </Col>
                  <Col xs={24} md={0}>
                    <Dropdown
                      overlay={SocialBarMenu}
                      trigger="click"
                      placement="bottomCenter"
                    >
                      <SocialButton className="nav-social-button">
                        topCenter
                      </SocialButton>
                    </Dropdown>
                  </Col>
                  <Col xs={24} md={24}>
                    <SocialBarBot></SocialBarBot>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="nav-row n2">
              <Col xs={19} md={12} className="nav-box n4">
                <ReviewBar></ReviewBar>
              </Col>
              <Col xs={5} md={12} className="nav-box n5">
                <SearchBar></SearchBar>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  )
}
