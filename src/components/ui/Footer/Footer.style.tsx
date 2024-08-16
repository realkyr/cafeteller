import styled from 'styled-components'

export const Container = styled.div`
  // max-width: 1440px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
  @media (min-width: 1025px) {
    margin-top: 20px;
  }
  @media (min-width: 1200px) {
    margin-top: 30px;
  }
`

export const Pattern = styled.div<{ img: string }>`
  border: solid 1px #988a7b;
  border-bottom: 0;
  height: 100px;
  background-image: url(${(props) => props.img});
  background-size: 400%;
  @media (min-width: 768px) {
    background-size: 100%;
    height: 120px;
  }
`

export const FooterCenterTop = styled.div`
  border-top: solid 1px #988a7b;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f1eb;
  font-family: Georgia;
  font-size: 1.7rem;
  @media (min-width: 768px) {
    text-transform: uppercase;
    font-size: 2rem;
  }
`

export const FooterCenterBot = styled.div`
  border-top: solid 1px #988a7b;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f1eb;
  font-family: Georgia;
  font-style: italic;
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`

export const SocialBar = styled.div`
  background-color: #1e315c;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 768px) {
    height: 75px;
  }
`
