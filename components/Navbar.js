import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Menu, Dropdown } from 'antd'
import { AlignLeftOutlined, SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
// import Image from 'next/image'
import Link from 'next/link'

const Container = styled.div`
  // max-width: 1440px;
  @media(min-width: 768px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  @media(min-width: 968px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  @media(min-width: 1200px) {
    margin-top: 30px;
    margin-bottom: 40px;
  }
`

const SocialBar = styled.div`
  background-color: #1e315c;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 80px;

  @media(min-width: 768px) {
    height: 63px;
  }
  @media(min-width: 992px) {
    height: 68px;
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

  background-image: url(${props => props.img});
  background-size: 250%;

  @media(min-width: 768px) {
    height: 51px;
    background-size: 100%;
  }
  @media(min-width: 992px) {
    height: 61px;
    background-size: 100%;
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
  height: 43px;
  font-family: Georgia;
  font-size: 1.4em;
  align-items: center;
  justify-content: center;
  display: flex;
  @media(min-width: 768px) {
    height: 52px;
  }
  @media(min-width: 992px) {
    height: 65px;
  }
`
const ReviewBarIn = styled.div`
  background-image: url(${props => props.img});
  background-size: 20%;
  background-position-y: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0%;
  padding-left: 10%;
  @media(min-width: 600px) {
    padding-left: 8%;
  }
  @media(min-width: 768px) {
    padding: 5%;
    padding-left: 8%;
  }
`
const ReviewBarInScroll = styled.div`
  background-image: url(${props => props.img});
  background-size: 20%;
  background-position-y: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0%;
  padding-left: 14%;
  font-size: 1.5rem;
  @media(min-width: 600px) {
    padding-left: 8%;
  }
  @media(min-width: 768px) {
    padding: 1%;
    padding-left: 8%;
  }
`
const SearchBar = styled.a`

  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(min-width: 768px) {
    // height: auto;
    font-family: Georgia;
    font-size: 1.4em;
  }

  :hover{
    color: black;
  }
`
const SearchText = styled.div`

  height: 100%;
  display: none;
  @media(min-width: 768px) {
    // height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Georgia;
    font-size: 1.1em;
  }
  @media(min-width: 1200px) {
    font-size: 1.4em;
  }
`
const Logo = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.img});
  background-size: 109px;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  
  @media(min-width: 968px) {
    background-image: none;
    height: auto;
    width: auto;
  }
`
const N2 = styled.div`
  background-image: url(${props => props.img});
  background-size: 32%;
  background-position-y: center;
  background-repeat: no-repeat;
  font-family: Georgia;
  padding: 25px;
  padding-left: 15%;
  h1{
    margin: 0;
    font-size: 1.6rem;
  }
  h3{
    margin: 0;
    font-size: 0.6rem;
  }
  @media(min-width: 768px) {
    height: auto;
    padding:0;
    h1{
      font-size: 2.2rem;
    }
    h3{
      font-size: 1rem;
    }
    background-image:none;
  }
  @media(min-width: 1200px) {
    height: auto;
    h1{
      font-size: 2.6rem;
    }
    h3{
      font-size: 1.4rem;
    }
    background-image:none;
  }
`
const N2Scroll = styled.div`
  background-image: url(${props => props.img});
  background-size: 45%;
  background-position-y: center;
  background-position-x: center;
  background-repeat: no-repeat;
  font-family: Georgia;
  padding: 18px 0;
  h1{
    margin: 0;
    font-size: .8rem;
  }
  @media(min-width: 768px) {
    background-size: 37%;
    height: auto;
    padding:20px;
    h1{
      font-size: 1.6rem;
    }
  }
  @media(min-width: 992px) {
    background-size: 45%;
    padding: 0;
    height: auto;
    h1{
      font-size: 2rem;
    }
    background-image:none;
  }
`

export default function Navbar () {
  // const [isActive, setIsActive] = useState(false)

  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  const x = ['navbar-scroll']
  const dropD = ['']
  if (scrolled) {
    x.push('scrolled')
  } else if (!scrolled) {
    // document.getElementsByClassName('ant-dropdown')[0].classList.add('ant-dropdown-hidden')
    dropD.push('ant-dropdown-hidden')
  }

  return (
    <>
      <Row justify="center">
        <Col xs={24} lg={22} xxl={18}>
          <Container>
            <Row className="nav-row">
              <Col xs={0} md={6} className="nav-box n1">
                <Link href={'/'}><a>
                  <Logo img={'/assets/Images/logo-rotate.png'}></Logo>
                  <Image src="/assets/Images/logo-rotate.png" preview={false} height={150} /></a>
                </Link>
              </Col>
              <Col xs={19} md={12} className="nav-box n2">
                  <N2 img={'/assets/Images/logo-rotate-05opa.png'}>
                    <h1>CAFETELLER</h1>
                    <h3 style={{ fontStyle: 'italic' }}>&quot;Because good cafés deserve a shout out&quot;</h3>
                  </N2>
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
                    <Dropdown overlay={SocialBarMenu} trigger="click" placement="bottomCenter">
                      <SocialButton className="nav-social-button">
                        <AlignLeftOutlined style={{ color: 'white', fontSize: '3em' }} />
                      </SocialButton>
                    </Dropdown>
                  </Col>
                  <Col xs={24} md={24}><SocialBarBot img={'/assets/Images/pattern2.jpg'} /></Col>
                </Row>
              </Col>
            </Row>
            <Row className="nav-row n2">
              <Col xs={19} md={12} className="nav-box n4">
                <ReviewBar><ReviewBarIn img={'/assets/Images/icon/Review-blue.png'}>Reviews</ReviewBarIn></ReviewBar>
              </Col>
              <Col xs={5} md={12} className="nav-box n5">
                <Link href={'/search'}>
                  <SearchBar>
                    <SearchOutlined style={{ color: '#dac099', fontSize: '1.5em' }} />
                    <SearchText>Search</SearchText>
                  </SearchBar>
                </Link>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row justify="center" className={x.join(' ')}>
        <Col xs={0} lg={3}>
          <Link href={'/'}>
            <a>
              <Logo img={'/assets/Images/logo-rotate.png'}></Logo>
              <Image src="/assets/Images/logo-rotate.png" preview={false} height={80} width={80} />
            </a>
          </Link>
        </Col>
        <Col xs={6} lg={5} className='flex-center border-left'>
          <N2Scroll img={'/assets/Images/logo-rotate-05opa.png'}>
            <h1>CAFETELLER</h1>
          </N2Scroll>
        </Col>
        <Col xs={11} lg={9} className='border-left'>
          <ReviewBar style={{ height: '100%' }}><ReviewBarInScroll img={'/assets/Images/icon/Review-blue.png'}>Reviews</ReviewBarInScroll></ReviewBar>

        </Col>
        <Col xs={3} lg={2} className='flex-center search-scroll border-left'>
          <Link href={'/search'}>
            <a className='flex-center'>
              <SearchOutlined style={{ color: '#dac099', fontSize: '2.3em' }} />
            </a>
          </Link>
        </Col>
        <Col xs={0} lg={5} className='border-left'>
          <SocialBar style={{ height: '100%' }}>
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
        <Col xs={4} lg={0}>
          <Dropdown overlay={SocialBarMenu}
            className={dropD.join(' ')}
            // getPopupContainer={() => document.getElementById('scrollBut')}
            trigger="click"
            placement="bottomCenter"
          >
            <SocialButton className="nav-social-button-scroll" id="scrollBut">
              <AlignLeftOutlined style={{ color: 'white', fontSize: '3em' }} />
            </SocialButton>
          </Dropdown>
        </Col>
      </Row>
    </>
  )
}
