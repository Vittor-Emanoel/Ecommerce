import { FunctionComponent, useEffect, useState } from 'react'

// Components
import Loading from '../loading/loading.component'
import ProductItem from '../product-item/product-item.component'

// Styles
import { CategoryTitle, Container, IconContainer, ProductsContainer } from './category-details.styles'

// ultilites
import { collection, getDocs, query, where } from 'firebase/firestore'
import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converter'
import Category from '../../types/category.types'

interface CategoryDetailsProps {
    categoryId: string;
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({ categoryId }) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const id = '6228f5beb7e6cb904bbe0119'

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true)
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', categoryId)
          )
        )
        const category = querySnapshot.docs[0]?.data()
        setCategory(category)
        console.log(category.products.find(product => {
          return product.id === id
        }))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategory()
  }, [])

  const handleToBack = () => {
    navigate('/')
  }

  if (isLoading) return <Loading />
  return (
    <Container>
      <CategoryTitle>
        <IconContainer>
            <BiChevronLeft onClick={handleToBack} size={36} />
        </IconContainer>
      <p>Explorar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}

      </ProductsContainer>
    </Container>

  )
}

export default CategoryDetails
