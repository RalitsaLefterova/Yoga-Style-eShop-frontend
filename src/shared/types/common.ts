export type GenericObject = { 
  [key: string]: any 
}

export type EmptyObject = {
  [K in any] : never
}