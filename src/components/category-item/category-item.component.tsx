import { FunctionComponent } from 'react'

// Ultilities
import Category from '../../types/category.types'

// Styles
import { CategoryItemContainer, CategoryName } from './categoty.styles'

interface CategoryItemProps {
  category: Category
}

const CategoryItem:FunctionComponent<CategoryItemProps> = ({ category }) => {
  return (
      <CategoryItemContainer
        backgroundImage={category.imageUrl}
        >
        <CategoryName>
          <p>{category.displayName}</p>
          <p>Explorar</p>
        </CategoryName>
      </CategoryItemContainer>
  )
}

export default CategoryItem
