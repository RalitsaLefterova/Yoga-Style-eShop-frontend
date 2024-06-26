export type CreateProduct = {
  title: string,
  price: number,
  stock: number,
  mainImageUrl: File | null,
  collectionId: string,
  active: boolean,
  description: string
}

export type CreateProductColor = {
  color: string
}
 
export type ProductColor = {
  _id: string,
  color: string,
  images: string[],
  sizes?: {
    size: string,
    stock: number
  }
}

export type RemoveImageFromColor = {
  imgUrl: string
}

export type Product = {
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