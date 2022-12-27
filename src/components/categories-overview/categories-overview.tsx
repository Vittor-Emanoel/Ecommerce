import { FunctionComponent, useContext, useEffect } from 'react'

// Styles
import { Container } from './categories-overview.styles'

// Ultilities
import { CategoryContext } from '../../contexts/category.context'
// interface Props {

// }

const CategoriesOverview : FunctionComponent = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [])

  return (
    <Container>
      {categories.map(category => <p key={category.id}>{category.name}</p>)}
    </Container>
  )
}

export default CategoriesOverview
