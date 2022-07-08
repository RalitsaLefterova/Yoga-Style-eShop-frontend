export const addProductToCart = (cartProducts, cartProductToAdd) => {
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

export const removeProductFromCart = (cartProducts, productId) => {
  const existingCartProduct = cartProducts.find(cartProduct => 
    cartProduct.id === productId
  )

  if (existingCartProduct.quantity === 1) {
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

export const clearProductFromCart = (cartProducts, productId) => {
  return cartProducts.filter(cartProduct => 
    cartProduct.id !== productId
  )
}