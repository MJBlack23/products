export interface Product {
  _id: string
  guid: string
  isActive: boolean
  name: string
  price: string
  image: string
  about: string
  registered: string
  latitude: string
  longitude: string
  tags: string[]
}

export type Products = Product[]
