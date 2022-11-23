import { useState } from 'react'
import Category from '../../types/category.types'

import './categories.styles.css'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  return (
    <div className="categories-container">
      <div className="categories-content">

      </div>
    </div>
  )
}

export default Categories
