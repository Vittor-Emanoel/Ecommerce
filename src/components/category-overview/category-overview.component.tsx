import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import { CategoryContainer, CategoryTitle, ProductsContainer } from './category-overview.styles'

interface CategoryOverviewProps {
    category: Category
}

const CategoryOverview : FunctionComponent<CategoryOverviewProps> = ({ category }) => {
  // const { categories } = useContext(CategoryContext)

  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer></ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
