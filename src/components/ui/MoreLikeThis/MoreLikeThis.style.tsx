import styled from 'styled-components'

export const Underline = styled.div`
  border-bottom: solid 3px #555555;
  width: 25px;
  margin: auto;
  border-radius: 26%;
`
export const MoreReview = styled.div`
  width: 96%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 30px;
  .ant-col {
    display: flex !important;
    justify-content: center;
  }
  h2 {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Times New Roman';
    span {
      color: #233d77;
      font-family: 'Confidante';
      font-weight: normal;
    }
  }
  @media (min-width: 768px) {
    width: 100%;
    margin-top: 20px;
    h2 {
      font-size: 2.2rem;
      span {
      }
    }
  }
`
export const MoreReviewCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  img {
    object-fit: cover;
  }
  .ant-card-cover {
    padding-top: 66%;
    overflow: hidden;
    height: 0;
    position: relative;
    width: 100%;
  }
  .ant-card-body {
    text-align: center;
    /* height: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4vw 1.9vw;
  }
  .ant-card-meta-title {
    font-family: maitree;
    font-weight: bold;
    white-space: normal;
  }
  .card-shadow {
    border-radius: 20px;
    &:hover {
      box-shadow: 8px 8px 1px 2px #dfceaf;
      .ant-card {
        box-shadow: 0px 0px 0px 3px #1e315c;
      }
    }
  }
  .ant-card {
    transition-timing-function: cubic-bezier(0.1, 0.85, 0.31, 0.99);
    transition-duration: 0.1s;
    border-radius: 18.5px;
    box-shadow: 0px 0px 0px 1px #d0c7be;
    width: 100%;
    height: 100%;
  }
  .ant-image {
    top: 0;
    height: 100%;
    position: absolute;
  }
  .ant-image-img {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }
  .ant-card-meta-title {
    font-size: 14px;
  }
  .ant-card-meta-description {
    font-size: 20px;
  }
  @media (min-width: 768px) {
    margin-top: 20px;
    .ant-card {
      width: 100%;
    }
    .ant-card-body {
      padding: 1.5vw 2.4vw;
    }
    .ant-card-meta-title {
      font-size: 1.5em;
    }
    .ant-card-meta-description {
      font-size: 1.9em;
    }
  }
`
