import { FunctionComponent, useContext } from 'react'
import { useAlert } from 'react-alert'

// Ultilities
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'

// Components
import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'

// Styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext)
  const alert = useAlert()

  const handleAddToCartClick = async () => {
    try {
      await addProductToCart(product)
      await alert.info('Produto adicionado ao carrinho')
    } catch (error) {

    }
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCartClick}>Adicionar ao carrinho</CustomButton>
      </ProductImage>

    <ProductInfo>
      <p>{product.name}</p>
      <p>R${product.price}</p>
    </ProductInfo>
    </ProductContainer>

  )
}

export default ProductItem
