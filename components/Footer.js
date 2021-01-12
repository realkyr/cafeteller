import React from 'react'
import { Typography } from 'antd'
import { Grid, Row, Col, Image, Menu, Dropdown, Button } from 'antd';
import styled from 'styled-components'

const { Title } = Typography

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
`
const FooterCenterBot = styled.div`
  border-top: solid 1px #988a7b;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f1eb;
`

const SocialBar = styled.div`
  
  background-color: #1e315c;
  display: flex; 
  justify-content: space-evenly;
  align-items: center;
  height: 65px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media(min-width: 768px) {
    height: 75px;
  }
`

export default function Footer () {
  return (
    <>
    <Row justify="center" style={{marginTop: 50}}>
      <Col xs={24} xl={24} xxl={24}>
        <Row>
          <Col xs={6} md={7}>
            <Pattern img={"/assets/Images/pattern3.jpg"}></Pattern>
          </Col>
          <Col xs={12} md={10}>
            <FooterCenterTop>
              CAFETELLER
            </FooterCenterTop>
            <FooterCenterBot>
              Find Us At
            </FooterCenterBot>
          </Col>
          <Col xs={6} md={7}>
            <Pattern img={"/assets/Images/pattern3.jpg"}></Pattern>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{backgroundColor: "#1e315c"}}>
            <Row justify="center">
              <Col xs={16} md={8}>
                <SocialBar>
                  <a href="http://instagram.com/">
                    <Image src="/assets/Images/icon/Social/FB.png" preview={false} height={25} width={25}/>
                  </a>
                  <a href="http://instagram.com/">
                    <Image src="/assets/Images/icon/Social/IG.png" preview={false} height={25} width={25} />
                  </a>
                  <a href="http://instagram.com/">
                    <Image src="/assets/Images/icon/Social/Twitter.png" preview={false} height={25} width={25} />
                  </a>
                </SocialBar>
              </Col>
            </Row>
            
          </Col>
        </Row>
      </Col>
    </Row>
    </>
  )
}
