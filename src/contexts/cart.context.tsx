import { createContext, FunctionComponent, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: String) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {}
})

const CartContextProvider: FunctionComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    // se carrinho estiver visivel, esconde ele, se não estiver visivel deixa ele visivel
    setIsVisible((prevState) => !prevState)
  }

  const addProductToCart = (product: Product) => {
    // vericar se o produto já está no carrinho
    const productIsAlreadyInCart = products.some(item => item.id === product.id)

    // se sim => aumentar sua quantidade
    if (productIsAlreadyInCart) {
      return setProducts((products) => products.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    }

    // se não => adicionar ao carrinho

    setProducts(prevState => [...prevState, { ...product, quantity: 1 }])
  }

  const removeProductFromCart = (productId: String) => {
    setProducts(products => products.filter(product => product.id !== productId))
  }

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart, addProductToCart, removeProductFromCart }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
