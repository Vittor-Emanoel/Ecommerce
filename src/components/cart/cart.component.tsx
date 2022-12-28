import { FunctionComponent, useContext } from 'react'
import { BsCardChecklist } from 'react-icons/bs'

// Components
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'

// Styles
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context'
import { CartContainer, CartContent, CartEscapeArea, CartTitle, CartTotal } from './cart.styles'

const CartComponent : FunctionComponent = () => {
  const { isVisible, products, productsTotalPrice, toggleCart, productsCount } = useContext(CartContext)

  const navigate = useNavigate()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
    toggleCart()
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart}/>
      <CartContent>
      <CartTitle>
        Seu Carrinho
      </CartTitle>

        {products.map(product => <CartItem key={product.id} product={product}/>)}
      {productsCount > 0 && <CartTotal>Total: {productsTotalPrice}</CartTotal> }

      {productsCount > 0 && <CustomButton startIcon={<BsCardChecklist />} onClick={handleGoToCheckoutClick}>Ir para o Checkout</CustomButton>}

        {productsCount === 0 && (
          <p>Seu carrinho está vazio!</p>
        )}
      </CartContent>

    </CartContainer>

  )
}

export default CartComponent
