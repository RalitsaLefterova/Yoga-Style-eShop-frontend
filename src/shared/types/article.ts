import { JSXElementConstructor } from 'react'

export type Article = {
  title: string,
  image: string,
  content: JSX.Element | string
}