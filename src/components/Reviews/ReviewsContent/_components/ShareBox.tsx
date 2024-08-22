import React from 'react'
import { Facebook, Instagram, Twitter } from '@/icons'
import Show from '@/components/ui/Show'
import styled from 'styled-components'
import { Col, Row } from 'antd'

interface CafeShareData {
  ig?: string
  fb?: string
  tw?: string
}

interface ShareBoxProps {
  cafeShareData: CafeShareData
  isMobile?: boolean
}

const classNameForIcon = 'h-8 w-8 text-icons-nav'

const iconMap: { [key: string]: React.ReactNode } = {
  ig: <Instagram className={classNameForIcon} />,
  fb: <Facebook className={classNameForIcon} />,
  tw: <Twitter className={classNameForIcon} />
}

const ShareBox = ({ cafeShareData, isMobile = false }: ShareBoxProps) => {
  const shareLinks = Object.keys(iconMap)
    .filter((key) => cafeShareData[key as keyof CafeShareData]) // Filter only keys that exist in cafeData
    .map((key) => (
      <a href={cafeShareData[key as keyof CafeShareData]} key={key}>
        {iconMap[key]}
      </a>
    ))

  return (
    <Show when={shareLinks.length > 0}>
      <ShareBoxPart
        style={isMobile ? undefined : { marginBottom: 50 }}
        key={isMobile ? 'sb2' : 'sb1'}
      >
        <Row>
          <Col xs={7} md={4} lg={4}>
            <ShareLeft>
              <span>Share</span>
            </ShareLeft>
          </Col>
          <Col xs={14} md={8} lg={8}>
            <ShareRight>{shareLinks}</ShareRight>
          </Col>
          <Col xs={0} md={12} lg={12}>
            <PatternShare img={'/assets/Images/pattern2.jpg'} />
          </Col>
        </Row>
      </ShareBoxPart>
    </Show>
  )
}

const ShareLeft = styled.div`
  font-weight: 300;
  font-family: 'Maitree', serif;
  font-size: 1.3rem;
  background-color: #1e315c;
  height: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  @media (min-width: 768px) {
    font-family: 'Georgia', serif;
  }
`
const ShareRight = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    border-bottom: 0;
  }
`
const PatternShare = styled.div<{ img: string }>`
  background-size: 84%;
  border: 2px solid #d2c5b8;
  border-bottom: 0;
  border-top: 0;
  height: 70px;
  background-image: url(${(props) => props.img});
  @media (min-width: 992px) {
    border-right: 0;
  }
`

const ShareBoxPart = styled.div`
  border-bottom: 2px solid #d2c5b8;

  @media (min-width: 768px) {
    margin-bottom: 50px;
  }
  @media (min-width: 992px) {
    border: 2px solid #d2c5b8;
  }
`

export default ShareBox
