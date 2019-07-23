import * as React from 'react'
import axios from 'axios'
import { Products } from '../types'

import Header from '../components/Header'
import ProductsContainer from '../components/Products'
import SideBar from '../components/SideBar'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'



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
        <section className="bgwhite p-t-55 p-b-65">
          <div className="container">
            <div className="row">
              <SideBar />
              <div className="col-sm-6 col-md-8 col-lg-9 p-b-50">
                <FilterPanel />

                <ProductsContainer
                  products={this.state.products}
                />

                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}