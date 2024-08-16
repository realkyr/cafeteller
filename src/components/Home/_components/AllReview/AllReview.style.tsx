import styled from 'styled-components'

export const Pattern = styled.div<{ img: string }>`
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

export const BgIcon1 = styled.div<{
  img: string
}>`
  position: absolute;
  background-image: url(${(props) => props.img});
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: left;
  left: 6%;
  right: 0;
  background-size: 36%;
  height: calc(38px + 3%);
  padding-top: calc(17px + 0%);
  width: 100%;
  @media (min-width: 768px) {
    background-size: 27%;
    height: calc(107px + 3%);
    padding-top: calc(116px + 5%);
    width: 80%;
  }
`
export const BgIcon2 = styled.div<{
  img: string
}>`
  position: absolute;
  background-image: url(${(props) => props.img});
  margin: 0 auto;
  left: -8%;
  right: 0;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: 13%;
  background-size: 25%;
  height: calc(77px + 3%);
  padding-top: calc(172px + 5%);
  width: 100%;
  @media (min-width: 768px) {
    background-position-y: 30%;
    background-size: 17%;
    height: calc(77px + 3%);
    padding-top: calc(172px + 5%);
    width: 62%;
  }
`

export const Container = styled.div`
  width: 95%;
  margin: 10px auto 0;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    margin-bottom: 5px;
    span {
      color: #233d77;
      font-family: 'Confidante', cursive;
      font-weight: normal;
    }
  }
  @media (min-width: 768px) {
    margin: 20px auto 0;
    padding: 0 3%;
    width: 95%;
  }
  @media (min-width: 1200px) {
    width: 98%;
    margin-top: 20px;
    padding: 0 10%;
    h2 {
      font-size: 2.2rem;
      span {
      }
    }
  }
  @media (min-width: 1600px) {
    padding: 0 13%;
  }
`

export const Underline = styled.div`
  border-bottom: solid 3px #555555;
  width: 25px;
  margin: auto;
  border-radius: 26%;
`
