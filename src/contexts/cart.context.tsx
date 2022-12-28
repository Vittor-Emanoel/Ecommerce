import { createContext, FunctionComponent, useEffect, useMemo, useState } from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  productsTotalPrice: number
  productsCount: number
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: String) => void
  increaseProductQuantity: (productId: String) => void
  decreaseProductQuantity: (productId: String) => void
  clearProducts: () => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  clearProducts: () => {}
})

const CartContextProvider: FunctionComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  // exibindo a quantidade de produtos sempre que o página for recarregada

  useEffect(() => {
    const productsFromLocalStorage = JSON.parse(localStorage.getItem('cartProducts')!)
    setProducts(productsFromLocalStorage)
  }, [])

  // persistindo os produtos no carrinho
  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products))
  }, [products])

  // Soma total dos valores // reduzindo tudo ao um valor

  // Só vai fazer o calculo quando os products forem alterados
  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  // Quantidade de produtos no carrinho
  const productsCount = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity
    }, 0)
  }, [products])

  const toggleCart = () => {
    // se carrinho estiver visivel, esconde ele, se não estiver visivel deixa ele visivel!!
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

  // Remover do carrinho
  const removeProductFromCart = (productId: String) => {
    setProducts(products => products.filter(product => product.id !== productId))
  }

  // Aumentar a quantidade
  const increaseProductQuantity = (productId: String) => {
    setProducts(products => products.map(product => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product))
  }

  // Diminuindo a quantidade
  const decreaseProductQuantity = (productId: String) => {
    setProducts(products => products.map(product => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product
    ).filter(product => product.quantity > 0)
    )
  }

  const clearProducts = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider value={{ isVisible, products, productsCount, productsTotalPrice, toggleCart, addProductToCart, removeProductFromCart, increaseProductQuantity, decreaseProductQuantity, clearProducts }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
