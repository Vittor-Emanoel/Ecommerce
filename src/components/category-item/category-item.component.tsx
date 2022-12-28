import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

// Ultilities
import Category from '../../types/category.types'

// Styles
import { CategoryItemContainer, CategoryName } from './category.styles'

interface CategoryItemProps {
  category: Category
}

const CategoryItem:FunctionComponent<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate()

  // sendo redirecionado para o id ca category em especido
  const handleExploreCategory = () => {
    navigate(`/category/${category.id}`)
  }

  return (
      <CategoryItemContainer
        backgroundImage={category.imageUrl}
        >
        <CategoryName onClick={handleExploreCategory}>
          <p>{category.displayName}</p>
          <p>Explorar</p>
        </CategoryName>
      </CategoryItemContainer>
  )
}

export default CategoryItem
