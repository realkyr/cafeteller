import React from 'react'
import { Row, Col, Image } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  // max-width: 1440px;
  @media(min-width: 768px) {
    margin-top: 0px;
  }
  @media(min-width: 1025px) {
    margin-top: 20px;
  }
  @media(min-width: 1200px) {
    margin-top: 30px;
  }
`
const Pattern = styled.div`
  border: solid 1px #988a7b;
  border-bottom: 0;
  height: 100px;
  background-image: url(${props => props.img});
  background-size: 400%;
  @media(min-width: 768px) {
    background-size: 100%;
    height: 120px;
  }
`
const FooterCenterTop = styled.div`
  border-top: solid 1px #988a7b;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f1eb;
  font-family: Georgia;
  font-size: 1.7rem;
  
  @media(min-width: 768px) {
    text-transform: uppercase;
    font-size: 2rem;
  }
`
const FooterCenterBot = styled.div`
  border-top: solid 1px #988a7b;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f1eb;
  font-family: Georgia;
  font-style: italic;
  font-size: 1rem;
  @media(min-width: 768px) {
    font-size: 1.3rem;
  }
`

const SocialBar = styled.div`
  
  background-color: #1e315c;
  display: flex; 
  justify-content: space-evenly;
  align-items: center;
  height: 60px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media(min-width: 768px) {
    height: 75px;
  }
`
const S = styled.span`
  @media(min-width: 768px) {
    display: none;
  }
`

export default function Footer () {
  return (
    <>
    <Row justify='center' id='footer'>
      <Col xs={24} xl={24} xxl={24}>
        <Container>
          <Row>
            <Col xs={6} md={6} xl={7}>
              <Pattern img={'/assets/Images/pattern3.jpg'}></Pattern>
            </Col>
            <Col xs={12} md={12} xl={10}>
              <FooterCenterTop>
                Cafe<S>&nbsp;</S>Teller
              </FooterCenterTop>
              <FooterCenterBot>
                Find Us At
              </FooterCenterBot>
            </Col>
            <Col xs={6} md={6} xl={7}>
              <Pattern img={'/assets/Images/pattern3.jpg'}></Pattern>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ backgroundColor: '#1e315c' }}>
              <Row justify='center'>
                <Col xs={16} md={8}>
                  <SocialBar>
                    <a href='http://instagram.com/'>
                      <Image src='/assets/Images/icon/Social/FB.png' preview={false} height={25} width={25}/>
                    </a>
                    <a href='http://instagram.com/'>
                      <Image src='/assets/Images/icon/Social/IG.png' preview={false} height={25} width={25} />
                    </a>
                    <a href='http://instagram.com/'>
                      <Image src='/assets/Images/icon/Social/Twitter.png' preview={false} height={25} width={25} />
                    </a>
                  </SocialBar>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
    </>
  )
}
