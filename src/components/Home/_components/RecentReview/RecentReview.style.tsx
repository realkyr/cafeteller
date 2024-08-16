import styled from 'styled-components'

export const RecentReviewContainer = styled.div`
  margin: auto;
  background-color: #f5f1eb;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  padding: 3% 6%;
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman';
    span {
      color: #233d77;
      font-family: 'Confidante';
      font-weight: normal;
    }
    margin-bottom: 5px;
  }
  @media (min-width: 768px) {
    width: 100%;
    h2 {
      font-size: 2.2rem;
      span {
      }
    }
    padding: 3% 6%;
  }
  @media (min-width: 1200px) {
    padding: 3% 10%;
  }
  @media (min-width: 1600px) {
    padding: 3% 13%;
  }
`

export const Pattern = styled.div<{
  img: string
}>`
  border: solid 2px #b5b5b5;
  border-left: 0;
  border-right: 0;
  height: 63px;
  background-image: url(${(props) => props.img});
  background-size: 42%;

  @media (min-width: 768px) {
    background-size: 20%;
    height: 77px;
  }
`

export const BgIcon = styled.div<{
  img: string
}>`
  position: absolute;
  background-image: url(${(props) => props.img});
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-position-x: left;
  left: -3%;
  right: 0;
  width: 100%;
  background-size: 28%;
  height: calc(77px + 3%);
  padding-top: calc(149px + 5%);
  @media (min-width: 768px) {
    width: 75%;
    background-size: 28%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
  }
`
export const BgIcon2 = styled.div<{
  img: string
}>`
  position: absolute;
  background-image: url(${(props) => props.img});
  margin: 0 auto;
  left: 7%;
  right: 0;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: 23%;
  background-size: 25%;
  width: 100%;
  height: calc(77px + 3%);
  padding-top: calc(172px + 5%);
  @media (min-width: 768px) {
    background-position-y: 23%;
    background-size: 20%;
    width: 70%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
  }
`

const RecentReview = styled.div`
  margin: auto;
  background-color: #f5f1eb;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  padding: 3% 6%;
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman';
    span {
      color: #233d77;
      font-family: 'Confidante';
      font-weight: normal;
    }
    margin-bottom: 5px;
  }
  @media (min-width: 768px) {
    width: 100%;
    h2 {
      font-size: 2.2rem;
      span {
      }
    }
    padding: 3% 6%;
  }
  @media (min-width: 1200px) {
    padding: 3% 10%;
  }
  @media (min-width: 1600px) {
    padding: 3% 13%;
  }
`
