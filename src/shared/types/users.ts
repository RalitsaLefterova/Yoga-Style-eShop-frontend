import { Address } from './addresses'
import { CartProduct } from './products'

export type User = {
  _id: string,
  fullName: string,
  email: string,
  addresses: Address[],
  shippingAddress: string,
  billingAddress: string,
  birthday: Date | string,
  phone: string,
  avatar: string,
  currency: string,
  language: string,
  cart: CartProduct[],
  role: string,
  createdAt: string
}