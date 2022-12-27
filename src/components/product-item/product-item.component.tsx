import { FunctionComponent } from 'react'

import Product from '../../types/product.types'
import { ProductContainer, ProductImage, ProductInfo } from './product-item.styles'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}/>

    <ProductInfo>
      <p>{product.name}</p>
      <p>R${product.prince}</p>
    </ProductInfo>
    </ProductContainer>

  )
}

export default ProductItem
