import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// Components
import CategoryItem from '../category-item/category-item.component'
import Loading from '../loading/loading.component'

// Utilities
import { fetchCategories } from '../../store/reducers/category/category.actions'

// Styles
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import { useAppSelector } from '../../hooks/redux.hooks'

const Categories = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories() as any)
  }, [])

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
