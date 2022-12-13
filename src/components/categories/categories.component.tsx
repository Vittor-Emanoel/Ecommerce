import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

// Components
import CategoryItem from '../category-item/category-item.component'

// Ultilities
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converter'
import Category from '../../types/category.types'

// Styles
import { CategoriesContainer, CategoriesContent } from './categories.styles'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  // pegando os dados do firebase
  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore:Category[] = []

      const querySnapshot = await getDocs(collection(db, 'categories').withConverter(categoryConverter))

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })
      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map(category => (
          <div key={category.id}>
            <CategoryItem
            category={category}/>
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
