import { FunctionComponent } from 'react'

// Ultilities
import { BsPlusCircle } from 'react-icons/bs'

// Components
import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'

// Styles
import { useNavigate } from 'react-router-dom'
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'

interface ProductItemProps {
  product: Product;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  // const { addProductToCart } = useContext(CartContext)
  const Navigate = useNavigate()

  // const handleAddToCartClick = () => {
  //   addProductToCart(product)
  // }

  console.log(product)

  const handleProductDetails = () => {
    Navigate(`/product-details/${product.id}`)
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton startIcon={<BsPlusCircle />} onClick={handleProductDetails}>Ver mais</CustomButton>
        {/* <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCartClick}>Adicionar ao carrinho</CustomButton> */}
      </ProductImage>

    <ProductInfo>
      <p>{product.name}</p>
      <p>R${product.price}</p>
    </ProductInfo>
    </ProductContainer>

  )
}

export default ProductItem
