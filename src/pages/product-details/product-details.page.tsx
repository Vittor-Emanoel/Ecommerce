import { FunctionComponent } from 'react'
import Header from '../../components/header/header.components'
import { ProductDetailsContainer, ProductDetailsContent, ProductDetailsImage } from './product-details'

const ProductDetailsPage: FunctionComponent = () => {
  return (
    <>
    <Header />
    <ProductDetailsContainer>
      <ProductDetailsContent>
        <ProductDetailsImage>
          <img src="" alt="" />
        </ProductDetailsImage>

      </ProductDetailsContent>
    </ProductDetailsContainer>
    </>
  )
}

export default ProductDetailsPage
