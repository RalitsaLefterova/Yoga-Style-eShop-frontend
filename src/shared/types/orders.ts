import { Product } from "./products"
import { Address } from "./addresses"

export type OrderProduct = {
  _id: string,
  product: Product,
  quantity: number
}

export type OrderOwner = {
  _id: string,
  fullName: string
}

export type Order = {
  _id: string,
  products: OrderProduct[],
  owner: OrderOwner,
  status: string,
  total: number,
  delivery_address: Address,
  createdAt: Date
}