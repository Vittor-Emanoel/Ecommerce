import { collection, getDocs } from 'firebase/firestore'
import { createContext, FunctionComponent, useState } from 'react'

// Utilities
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converters/firestore.converter'
import Category from '../types/category.types'

interface ICategoryContext {
  categories: Category[]
  isLoading: boolean
  fetchCategories: () => Promise<void>
}

// as duas coisas que o context irá receber
export const CategoryContext = createContext<ICategoryContext>({
  isLoading: false,
  categories: [],
  fetchCategories: () => Promise.resolve()
})

const CategoryContextProvider: FunctionComponent = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const categoriesFromFirestore: Category[] = []

      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })
      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
