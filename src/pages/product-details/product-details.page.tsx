import { collection, getDocs, query, where } from 'firebase/firestore'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

// Utils
import { db } from '../../config/firebase.config'
import { CartContext } from '../../contexts/cart.context'
import { categoryConverter } from '../../converters/firestore.converter'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header.components'
import Loading from '../../components/loading/loading.component'
import Product from '../../types/product.types'

// Styles
import { ProductDetailsContainer, ProductDetailsContent, ProductDetailsDescription, ProductDetailsImage } from './product-details'

interface ProductDetailsProps {
  product?: Product
}

const ProductDetailsPage: FunctionComponent<ProductDetailsProps> = () => {
  const { addProductToCart } = useContext(CartContext)

  const [product, setProduct] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()

  function handleAddToCartClick () {
    addProductToCart(product[0])
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true)
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', params.category)
          )
        )
        const category = querySnapshot.docs[0]?.data()
        const productInfo = category.products.find(product => {
          return product.id === params.id
        })
        setProduct(productInfo ? [productInfo] : [])
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategory()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
    <Header />
    <ProductDetailsContainer>
      <ProductDetailsContent>
        <ProductDetailsImage>
          <img src={product[0]?.imageUrl} alt="" />
        </ProductDetailsImage>

        <ProductDetailsDescription>
            <p>{product[0]?.name}</p>
            <small>Valor: R${product[0]?.price},00</small>
           <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCartClick}>Adicionar ao carrinho</CustomButton>
        </ProductDetailsDescription>

      </ProductDetailsContent>
    </ProductDetailsContainer>
    </>
  )
}

export default ProductDetailsPage
