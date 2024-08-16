import styled from 'styled-components'

export const Banner = styled.div`
  padding-top: 40%;
  position: relative;
  overflow: hidden;
  height: 0;
  .inner-image {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
