import styled from 'styled-components'

export const MapSearchMenuContainer = styled.div`
  /* height: 200px; */
  background: aliceblue;
  /* position: static; */
  z-index: 20;
  overflow-y: scroll;
  height: 142px;
  @media (min-width: 768px) {
    display: none;
  }

  h2 {
    text-align: center;
    font-family: 'Georgia';
    font-size: 1.5rem;
    background-color: #f5f1eb;

    span {
      color: #233d77;
    }
  }
`

export const MapSearchMenu = styled.div`
  background-color: #f5f1eb;
  padding: 7px;
  height: 100%;
  min-height: 50vh;
`

export const Pattern1 = styled.div<{ img: string }>`
  padding: 0 19px;
  /* height: calc(100vh - 56px); */
  height: auto;
  position: absolute;
  width: 100%;
  box-shadow: 0px 0px 7px #bdbdbd;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  /* height: 63px; */
  background-image: url(${(props) => props.img});
  /* background-size: 4%; */
`
