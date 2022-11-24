/* QUANDO VOCÊ QUISER HERDAR PROPS DE UM ELEMENTO HTML USE O NOMEDOELEMENTOHTMLATTIBUTES */

import React, { FunctionComponent, ButtonHTMLAttributes } from 'react'
import { CustomButtonContainer, IconContainer } from './custom-buttom.styles'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: string,
  startIcon?: React.ReactNode;/* passando um component como props */
}

const CustomButton:FunctionComponent<CustomButtonProps> = ({ children, startIcon, ...rest }) => {
  return (
      <CustomButtonContainer {...rest}>
        {startIcon && <IconContainer>{startIcon}</IconContainer> }
          {children}
      </CustomButtonContainer>
  )
}
export default CustomButton
