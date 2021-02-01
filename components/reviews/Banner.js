import styled from 'styled-components'

const Banner = styled.div`
  height: 0;
  padding-bottom: 66.66%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .ant-image{
    height: 100%;
    position: absolute;
    top: 0;
    display: inline-block;
  }
  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`

export default Banner
