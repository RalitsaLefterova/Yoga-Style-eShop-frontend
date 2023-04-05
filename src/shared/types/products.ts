export type ProductColor = {
  _id: string,
  color: string,
  images: string[],
  sizes?: {
    size: string,
    stock: number
  }
}

export type Product = {
  _id: string,
  id: string,
  title: string,
  price: number,
  stock: number,
  mainImageUrl: string,
  collectionId: string,
  active: boolean,
  description: string
  colors?: ProductColor[],
}

export type CartProduct = Product & {
  quantity: number
}