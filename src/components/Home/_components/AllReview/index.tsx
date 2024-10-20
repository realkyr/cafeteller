import React from 'react'
import {
  BgIcon1,
  BgIcon2,
  Container,
  Pattern,
  Underline
} from '@/components/Home/_components/AllReview/AllReview.style'

const AllReview = () => {
  return (
    <>
      <Pattern img={'/assets/Images/pattern2.jpg'}>
        <div>
          <BgIcon1 img={'/assets/Images/graphic-element-homepage/Tag@1x.svg'} />
          <BgIcon2
            img={'/assets/Images/graphic-element-homepage/Hexagon@1x.svg'}
          />
        </div>
      </Pattern>

      <Container>
        <h2>
          <span>All</span> Review
        </h2>

        <Underline style={{ marginBottom: 12 }} />
      </Container>
    </>
  )
}

export default AllReview
