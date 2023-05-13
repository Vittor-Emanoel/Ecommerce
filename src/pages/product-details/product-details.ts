import styled from 'styled-components'

export const ProductDetailsContainer = styled.div`
  width: 100%;

  padding: 18px 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 30px 30px;
  }
`

export const ProductDetailsContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ProductDetailsImage = styled.div`
  width: 200px;

  img {
    width: 400px;
    height: 80vh;
    border-radius: 15px;
  }

  @media (max-width: 768px) {
    width: 100%;
    img {
      width: 100%;
      height: 550px;
    }
  }
`

export const ProductDetailsDescription = styled.div`
  width: 500px;

  display: flex;
  flex-direction: column;
  align-items: self-start;
  justify-content: center;
  gap: 30px;

  padding: 10px;

  p {
    font-size: 40px;
    font-weight: 600;
  }

  small {
    font-size: 20px;
    font-weight: 500;
  }

  button {
    width: 50%;
  }

  @media (max-width: 768px) {
    button {
      width: 100%;
    }
  }
`
