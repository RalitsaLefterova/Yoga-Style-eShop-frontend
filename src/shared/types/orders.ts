import { Product } from "./products"
import { Address } from "./addresses"

export type orderProduct = {
  _id: string,
  product: Product,
  quantity: number
}

export type orderOwner = {
  _id: string,
  fullName: string
}

export type Order = {
  _id: string,
  products: orderProduct[],
  owner: orderOwner,
  status: string,
  total: number,
  delivery_address: Address,
  createdAt: Date
}