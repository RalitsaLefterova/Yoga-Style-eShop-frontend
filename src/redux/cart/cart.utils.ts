import { CartProduct, Product } from "shared/types/products"

export const addProductToCart = (cartProducts: CartProduct[], cartProductToAdd: Product): CartProduct[] => {
  const existingCartProduct = cartProducts.find(cartProduct => 
    cartProduct.id === cartProductToAdd.id
  )

  if (existingCartProduct) {
    return cartProducts.map(cartProduct => 
      cartProduct.id === cartProductToAdd.id
      ? {...cartProduct, quantity: ++cartProduct.quantity}
      : cartProduct
    )
  }

  return [...cartProducts, { ...cartProductToAdd, quantity: 1}]
}

export const removeProductFromCart = (cartProducts: CartProduct[], productId: string): CartProduct[] => {
  const existingCartProduct = cartProducts.find(cartProduct => 
    cartProduct.id === productId
  )

  if (existingCartProduct && existingCartProduct.quantity === 1) {
    return cartProducts.filter(cartProduct => 
      cartProduct.id !== productId
    )
  }

  return cartProducts.map(cartProduct => 
    cartProduct.id === productId 
    ? { ...cartProduct, quantity: --cartProduct.quantity }
    : cartProduct
  )
}

export const clearProductFromCart = (cartProducts: CartProduct[], productId: string): CartProduct[] => {
  return cartProducts.filter(cartProduct => 
    cartProduct.id !== productId
  )
}