import { FunctionComponent, useContext } from 'react'
import CustomButton from '../custom-button/custom-button.component'

import { BsCardChecklist } from 'react-icons/bs'

// Styles
import { CartContext } from '../../contexts/cart.context'
import { CartContainer, CartContent, CartEscapeArea, CartTitle, CartTotal } from './cart.styles'

interface Props {

}

const CartComponent : FunctionComponent<Props> = () => {
  const { isVisible, toggleCart } = useContext(CartContext)
  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart}/>
      <CartContent>
      <CartTitle>
        Seu Carrinho
      </CartTitle>

      {}
      <CartTotal>Total: 999</CartTotal>
      <CustomButton startIcon={<BsCardChecklist />}>Ir para o Checkout</CustomButton>
      </CartContent>

    </CartContainer>

  )
}

export default CartComponent
