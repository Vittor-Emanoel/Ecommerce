import styled from 'styled-components'

export const PaymentConfirmationContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  
`

export const PaymentConfirmationContent = styled.div`
  text-align: center;
  width: 500px;

  p {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 1.125rem;
    font-weight: 500;
  }

  @media (max-width: 768px) { 

    display: flex;
    flex-direction: column;
    align-items: center;
      button {
        width: 50%;
      }

}
  

`
