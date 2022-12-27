
import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

// Components

import CategoryDetails from '../../components/category-details/category-details.component'
import Header from '../../components/header/header.components'

const CategoryDetailsPage: FunctionComponent = () => {
  const { id } = useParams()

  if (!id) return null

  return (
    <>
      <Header />
      <CategoryDetails categoryId= {id} />
    </>
  )
}

export default CategoryDetailsPage
