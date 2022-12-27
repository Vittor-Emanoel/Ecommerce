import { FunctionComponent } from 'react'

// Components
import ProductItem from '../product-item/product-item.component'

// Ultilities
import Category from '../../types/category.types'

// Styles
import { CategoryContainer, CategoryTitle, ProductsContainer } from './category-overview.styles'

interface CategoryOverviewProps {
    category: Category
}

const CategoryOverview : FunctionComponent<CategoryOverviewProps> = ({ category }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProductItem key={product.id} product={product}/>
        ))}
      </ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
