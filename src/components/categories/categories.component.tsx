import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'

// Components
import CategoryItem from '../category-item/category-item.component'

// Ultilities
import Category from '../../types/category.types'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converter'

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

  console.log({ categories })
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
