import * as React from 'react'
import axios from 'axios'

import Header from '../components/Header'

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

interface Props {}

interface State {
  products: Products
}

export default class ProductPage extends React.Component<Props, State> {
  private static genEmptyProducts = (): Products => []

  state = {
    products: ProductPage.genEmptyProducts()
  }

  componentDidMount(): void {
    axios.get<Products>('/api/products')
      .then(response => {
        this.setState(() => ({
          ...this.state,
          products: response.data
        }))

        console.log('got some products...', response.data.length)
      })
      .catch(error => {
        console.log('there was an error fetching products')
      })
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}