import React from 'react'
import styled from 'styled-components'

import { Cafe } from '@/types'

import Desktop from '@/components/ui/Show/Desktop'
import Mobile from '@/components/ui/Show/Mobile'

import ContactBox from './ContactBox'
import VisitPage from './VisitPage'
import ShareBox from './ShareBox'

interface CafeInformationProps {
  cafeData: Cafe
}

const CafeInformation = ({ cafeData }: CafeInformationProps) => {
  return (
    <>
      <ContactInfo>
        <ContactBox cafeData={cafeData} />

        <Map id='map'></Map>

        <Desktop>
          <VisitPage cafeData={cafeData} />
        </Desktop>
      </ContactInfo>

      <Mobile>
        <ShareBox cafeShareData={cafeData} isMobile />
      </Mobile>
    </>
  )
}

const Map = styled.div`
  width: 100%;
  height: 400px;
  background: grey;
  border-bottom: 2px solid #d2c5b8;
`

const ContactInfo = styled.div`
  font-size: 1rem;
  border-top: 2px solid #d2c5b8;
  background-color: #f5f1eb;
  font-family: 'Maitree', serif;
  .ant-row {
    border-bottom: 2px solid #d2c5b8;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0;
    align-items: center;
  }
  .ant-image {
    display: block;
  }
  a {
    color: #1890ff;
  }
  @media (min-width: 768px) {
    border: 2px solid #d2c5b8;
    border-bottom: 0;
    margin-bottom: 0px;
    font-size: 1.1rem;
    .ant-row {
      padding-top: 17px;
      padding-bottom: 17px;
      padding-left: 20px;
      padding-right: 20px;
      margin: 0;
      align-items: center;
    }
  }
  @media (min-width: 992px) {
    border: 2px solid #d2c5b8;
    margin-bottom: 20px;
    border-bottom: 0;
  }
`

export default CafeInformation
