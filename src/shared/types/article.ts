import { JSXElementConstructor } from 'react'

export type ArticleType = {
  title: string,
  image: string,
  content: JSX.Element | string
}