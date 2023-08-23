const CartActionTypes = {
  toggleCart: 'cart/toggle' as const,
  addProductToCart: 'cart/addProduct' as const,
  removeProductFromCart: 'cart/removeProduct' as const,
  increaseCartProductQuantity: 'cart/increaseCartProductQuantity' as const,
  decreaseCartProductQuantity: 'cart/decreaseCartProductQuantity' as const,
  clearCartProducts: 'cart/clearCartProducts' as const
}

export default CartActionTypes
