import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Row, Col, Image, Menu, Dropdown } from 'antd'
import { AlignLeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  // max-width: 1440px;
  @media(min-width: 768px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  @media(min-width: 1025px) {
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
  transition-timing-function: cubic-bezier(0.11, 0.59, 0.46, 0.9);
  transition-duration: .3s;
  background-color: ${props => props.bgColor};
  /* background-color: #dfceaf; */
  cursor: pointer;
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
const ReviewBarText = styled.div`
  padding-left: 15px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Georgia;
  @media(min-width: 768px) {
    // height: auto;
    font-size: 1.1em;
  }
  @media(min-width: 1200px) {
    font-size: 1.4em;
  }
`

const HoverableScroll = styled.div`
  /* background-color: #dfceaf; */
  transition-timing-function: cubic-bezier(0.18, 0.89, 0.29, 0.96);
  transition-duration: .3s;
  background-color: ${props => props.bgColor};
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
const HoverableInnerScroll = styled.div`
  /* background-image: url(${props => props.img});
  background-size: 20%;
  background-position-y: center;
  background-repeat: no-repeat; */
  align-items: center;
  justify-content: center;
  display: inline-flex;
  gap: 0px;
  padding: 0%;
  font-size: 1.3rem;
  .ant-image {
    margin: 0px 5px;
  }
  @media(min-width: 600px) {
  }
  @media(min-width: 768px) {
    padding: 1%;
    gap: 10px;
    font-size: 1.7rem;
  }
`
const SearchBar = styled.div`
  transition-timing-function: cubic-bezier(0.11, 0.59, 0.46, 0.9);
  transition-duration: .3s;
  background-color: ${props => props.bgColor};
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
  padding-left: 15px;
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

  const pathName = useRouter().pathname
  const [scrolled, setScrolled] = useState(false)
  const [navColxs, setNavColxs] = useState([7, 7])
  const [navCollg, setNavCollg] = useState([6, 5])
  const [buttonText, setbuttonText] = useState(['', ''])
  const [navBgColor, setNavBgColor] = useState(['', ''])
  const [defalutHover, setdefalutHover] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const CheckPath = () => {
    console.log('check path')
    if (pathName === '/search') {
      searchHover()
      searchClick()
    } else {
      reviewHover()
      reviewClick()
    }
  }
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  const searchClick = () => {
    setdefalutHover('search')
    setRefreshKey(oldKey => oldKey + 1)
  }
  const reviewClick = () => {
    reviewHover()
    setdefalutHover('review')
    setRefreshKey(oldKey => oldKey + 1)
  }
  const searchHover = () => {
    setNavColxs([3, 11])
    setNavCollg([2, 9])
    setbuttonText(['', 'Search'])
    setNavBgColor(['', 'nav-brown-bgcolor'])
  }
  const reviewHover = () => {
    setNavColxs([11, 3])
    setNavCollg([9, 2])
    setbuttonText(['Reviews', ''])
    setNavBgColor(['nav-brown-bgcolor', ''])
  }
  const defaultNavClass = ['']
  const scrollNavClass = ['navbar-scroll']
  if (scrolled) {
    scrollNavClass.push('scrolled')
  }
  if (pathName === '/reviews/[id]' || pathName === '/search') {
    scrollNavClass.push('scrolled-from-start')
    defaultNavClass.push('nav-hide')
  }
  useEffect(() => {
    const searchButton = Object.values(document.getElementsByClassName('search-hover'))
    const reviewButton = Object.values(document.getElementsByClassName('review-hover'))
    const logoButton = Object.values(document.getElementsByClassName('logo-hover'))
    window.addEventListener('load', CheckPath)
    window.addEventListener('scroll', handleScroll)
    searchButton.forEach(element => {
      element.addEventListener('mouseenter', searchHover)
      element.addEventListener('click', searchClick)
    })
    reviewButton.forEach(element => {
      element.addEventListener('mouseenter', reviewHover)
      element.addEventListener('click', reviewClick)
    })
    logoButton.forEach(element => {
      element.addEventListener('click', reviewClick)
    })
    if (defalutHover === 'search') {
      reviewButton.forEach(element => { element.addEventListener('mouseleave', searchHover) })
      document.body.classList.add('search-page')
    } else {
      searchButton.forEach(element => { element.addEventListener('mouseleave', reviewHover) })
      document.body.classList.remove('search-page')
    }

    return () => {
      window.removeEventListener('load', CheckPath)
      window.removeEventListener('scroll', handleScroll)
      searchButton.forEach(element => {
        element.removeEventListener('mouseenter', searchHover)
        element.removeEventListener('click', searchClick)
      })
      reviewButton.forEach(element => {
        element.removeEventListener('mouseenter', reviewHover)
        element.removeEventListener('click', reviewClick)
      })
      logoButton.forEach(element => {
        element.removeEventListener('click', reviewClick)
      })
      reviewButton.forEach(element => { element.removeEventListener('mouseleave', searchHover) })
      searchButton.forEach(element => { element.removeEventListener('mouseleave', reviewHover) })
    }
  }, [refreshKey])

  return (
    <>
      <Row justify="center" className={defaultNavClass.join(' ')}>
        <Col xs={24} lg={22} xxl={18}>
          <Container>
            <Row className="nav-row">
              <Col xs={0} md={6} className="nav-box n1">
                <Link href={'/'}>
                  <a className='logo-hover'>
                    <Logo img={'/assets/Images/logo-rotate.png'}></Logo>
                    <Image src="/assets/Images/logo-rotate.png" preview={false} height={150} />
                  </a>
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
                      <a href="https://www.instagram.com/cafeteller/">
                        <Image
                          src="/assets/Images/icon/Social/IG.png"
                          preview={false}
                          height={30}
                          width={30}
                        />
                      </a>
                      <a href="https://www.facebook.com/cafeteller/">
                        <Image
                          src="/assets/Images/icon/Social/FB.png"
                          preview={false}
                          height={30}
                          width={30}
                        />
                      </a>
                      <a href="https://twitter.com/CAFETELLER">
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
                      <SocialButton className="nav-social-button ">
                        <AlignLeftOutlined style={{ color: 'white', fontSize: '3em' }} />
                      </SocialButton>
                    </Dropdown>
                  </Col>
                  <Col xs={24} md={24}><SocialBarBot img={'/assets/Images/pattern2.jpg'} /></Col>
                </Row>
              </Col>
            </Row>
            <Row className="nav-row n2">
              <Col xs={19} md={12} className="nav-box n4 review-hover">
                <Link href={'/'}>
                  <a>
                    <ReviewBar className={navBgColor[0]}>
                    <Image
                      src="/assets/Images/icon/Review.png"
                      preview={false}
                      height={'1.4em'}
                      width={'1.4em'}
                    />
                      <ReviewBarText>Reviews</ReviewBarText>
                    </ReviewBar>
                  </a>
                </Link>
              </Col>
              <Col xs={5} md={12} className="nav-box n5 search-hover">
                <Link href={'/search'}>
                  <a>
                    <SearchBar className={navBgColor[1]}>
                    <Image
                      src="/assets/Images/icon/search.png"
                      preview={false}
                      height={'1.4em'}
                      width={'1.4em'}
                    />
                      <SearchText>Search</SearchText>
                    </SearchBar>
                  </a>
                </Link>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row justify="center" className={scrollNavClass.join(' ')}>
        <Col span={0} xs={0} lg={3}>
          <Link href={'/'}>
            <a className='logo-hover'>
              <Logo img={'/assets/Images/logo-rotate.png'}></Logo>
              <Image src="/assets/Images/logo-rotate.png" preview={false} height={80} width={80} />
            </a>
          </Link>
        </Col>
        <Col span={6} xs={6} lg={5} className='flex-center border-left'>
          <Link href={'/'}>
            <a>
              <N2Scroll img={'/assets/Images/logo-rotate-05opa.png'}>
                <h1 className='logo-hover'>CAFETELLER</h1>
              </N2Scroll>
            </a>
          </Link>
        </Col>
        <Col span={7} xs={navColxs[0]} lg={navCollg[0]} id='review-hover' className='review-hover border-left'>
          <Link href={'/'}>
            <a>
              <HoverableScroll style={{ height: '100%' }} className={navBgColor[0]}>
                <HoverableInnerScroll>
                  <Image
                    src="/assets/Images/icon/Review.png"
                    preview={false}
                    height={'1.3em'}
                    width={'1.3em'}
                  />
                  <span>{buttonText[0]}</span>
                </HoverableInnerScroll>
              </HoverableScroll>
            </a>
          </Link>
        </Col>
        <Col span={7} xs={navColxs[1]} lg={navCollg[1]} id='search-hover' className='search-hover border-left'>
          <Link href={'/search'}>
            <a>
              <HoverableScroll style={{ height: '100%' }} className={navBgColor[1]}>
                <HoverableInnerScroll>
                  <Image
                    src="/assets/Images/icon/Search.png"
                    preview={false}
                    height={'1.3em'}
                    width={'1.3em'}
                  />
                  <span>{buttonText[1]}</span>
                </HoverableInnerScroll>
              </HoverableScroll>
            </a>
          </Link>
        </Col>
        <Col xs={0} lg={5} className='border-left'>
          <SocialBar style={{ height: '100%' }}>
            <a href="https://www.instagram.com/cafeteller/">
              <Image
                src="/assets/Images/icon/Social/IG.png"
                preview={false}
                height={30}
                width={30}
              />
            </a>
            <a href="https://www.facebook.com/cafeteller/">
              <Image
                src="/assets/Images/icon/Social/FB.png"
                preview={false}
                height={30}
                width={30}
              />
            </a>
            <a href="https://twitter.com/CAFETELLER">
              <Image
                src="/assets/Images/icon/Social/Twitter.png"
                preview={false}
                height={30}
                width={30}
              />
            </a>
          </SocialBar>
        </Col>
        <Col span={4} xs={4} lg={0}>
          <Dropdown overlay={SocialBarMenu}
            getPopupContainer={ () => document.getElementById('scrollBut') }
            // visible={scrolled}
            trigger="click"
            placement="bottomCenter"
          >
            <SocialButton className="nav-social-button-scroll" id="scrollBut">
              <AlignLeftOutlined style={{ color: 'white', fontSize: '2.3em' }} />
            </SocialButton>
          </Dropdown>
        </Col>
      </Row>
    </>
  )
}
