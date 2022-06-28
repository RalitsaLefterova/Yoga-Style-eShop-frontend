export const addProductToCart = (cartProducts, cartProductToAdd) => {
  console.log('in addProductToCart')
  console.log('cartProducts', cartProducts, 'cartProductToAdd', cartProductToAdd)
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

export const removeProductFromCart = (cartProducts, cartProductToRemove) => {
  console.log('in removeProductFromCart', cartProductToRemove)
  const existingCartProduct = cartProducts.find(cartProduct => 
    cartProduct.id === cartProductToRemove.id
  )

  if (existingCartProduct.quantity === 1) {
    return cartProducts.filter(cartProduct => 
      cartProduct.id !== cartProductToRemove.id
    )
  }

  return cartProducts.map(cartProduct => 
    cartProduct.id === cartProductToRemove.id 
    ? { ...cartProduct, quantity: --cartProduct.quantity }
    : cartProduct
  )
}

export const clearProductFromCart = (cartProducts, cartProductToClean) => {
  return cartProducts.filter(cartProduct => 
    cartProduct.id !== cartProductToClean.id
  )
}