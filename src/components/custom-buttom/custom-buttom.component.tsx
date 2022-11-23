import { FunctionComponent } from 'react'
import { CustomButtonContainer } from './custom-buttom.styles'

interface CustomButtonProps {
  children: string;
}

const CustomButton:FunctionComponent<CustomButtonProps> = ({ children }) => {
  return (
      <CustomButtonContainer>
          {children}
      </CustomButtonContainer>
  )
}
export default CustomButton
