import axios from 'axios'

export interface DataResponse {
  data: Products
}

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


export default class DataCache {
  private static DATA_URL = 'https://next.json-generator.com/api/json/get/EkzBIUWNL'
  private products: Products = DataCache.genEmptyCache()
  private dataSource: () => Promise<Products> = DataCache.fetchProducts

  static create = (): DataCache => new DataCache()

  private refreshCache = (products: Products) =>
    this.products = products

  private clearCache = () => this.products = DataCache.genEmptyCache()

  setDataSource = (dataSource: () => Promise<Products>) =>
    this.dataSource = dataSource

  getProducts = async (start: number = 0, max: number = 12): Promise<Products> => {
    try {
      if (this.products.length >= 1) {
        return this.products
          .slice(start, max)
      }

      const products = await this.dataSource()
      this.clearCache()
      this.refreshCache(products)

      return products.slice(start, max)
    } catch (error) {
      console.error('Error: unable to fetch products...')
      console.error(error.message)
      return []
    }
  }

  getItemById = (id: string): Promise<Product> =>
    this.getProducts()
      .then(products => products.find(product => product._id === id))

  searchProducts = (query: string, start: number = 0, max: number = 11): Promise<Products> =>
    this.getProducts()
      .then(products => products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.tags
          .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
          .length >= 1)
        .slice(start, max))

  

  private static genEmptyCache = (): Products => []

  private static fetchProducts = (): Promise<Products> =>
    axios.get<Products>(DataCache.DATA_URL)
      .then(response => response.data)
}
  

/**
 * "_id": "5c58693b2f3b8ac746a18f85",
        "guid": "074f7b84-13a8-4fa3-ba1a-0ffef59dc7c4",
        "isActive": false,
        "name": "Ex amet aliqua nisi Lorem quis magna nisi eiusmod veniam.",
        "price": "183.23",
        "image": "https://picsum.photos/300/300/?random",
        "about": "Officia dolor commodo et pariatur officia aliquip deserunt duis voluptate ex occaecat occaecat laboris. Aliqua aliquip velit irure reprehenderit. Commodo culpa reprehenderit nisi mollit qui. Amet ut ex incididunt amet minim aute excepteur est do id cillum. Nostrud adipisicing qui anim sunt ipsum fugiat quis in consectetur proident. Est minim aliqua irure cillum tempor.",
        "registered": "Saturday, October 21, 2017 2:52 AM",
        "latitude": "-6.457583",
        "longitude": "52.869909",
        "tags": [
            "id",
            "id",
            "aliqua",
            "dolore",
            "dolore"
        ]
 */