export type CreateCollection = {
  title: string,
  cover: string
}

export type Collection = {
  _id: string,
  title: string,
  urlTitle: string,
  cover: string,
  active: boolean
}

export type CollectionShortInfo = {
  _id: string,
  title: string
}