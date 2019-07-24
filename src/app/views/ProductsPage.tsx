import * as React from 'react'
import axios from 'axios'
// import * as noUiSlider from 'nouislider'
import { Products } from '../types'

import Header from '../components/Header'
import ProductsContainer from '../components/Products'
import SideBar from '../components/SideBar'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'

interface Props {}

enum SortBy {
  Default = 0,
  PriceAscending = -1,
  PriceDescending = 1
}

interface State {
  products: Products
  startIndex: number
  sortBy: SortBy
  priceMin: number
  priceMax: number
  debounceTimer: any
}

export default class ProductPage extends React.Component<Props, State> {
  private static genEmptyProducts = (): Products => []

  state = {
    products: ProductPage.genEmptyProducts(),
    startIndex: 0,
    sortBy: SortBy.Default,
    priceMin: 0,
    priceMax: 999999,
    debounceTimer: -1,
  }

  handleFilterByPrice = (priceMin: number, priceMax: number) => {
    this.setState(() => ({
      ...this.state,
      priceMin,
      priceMax,
    }))
  }

  handleUpdateSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.persist()

    const sortBy = ((sortOrder: string): SortBy => {
      switch (sortOrder) {
        case "-1":
          return SortBy.PriceAscending
        case "1":
          return SortBy.PriceDescending
        default:
          return SortBy.Default
      }
    })(e.target.value)

    this.setState(() => ({
      ...this.state,
      sortBy,
    }))
  }

  sortProducts = (products: Products): Products => {
    switch (this.state.sortBy) {
      case SortBy.PriceAscending:
        return products.sort((a, b) => {
          if (parseFloat(a.price) < parseFloat(b.price)) {
            return -1
          } else if (parseFloat(a.price) > parseFloat(b.price)) {
            return 1
          }

          return 0
        })

      case SortBy.PriceDescending:
        return products.sort((a, b) => {
          if (parseFloat(a.price) < parseFloat(b.price)) {
            return 1
          } else if (parseFloat(a.price) > parseFloat(b.price)) {
            return -1
          }

          return 0
        })

      default:
        return products
    }
  }

  filterProducts = (products: Products): Products =>
    products.filter(product => 
      parseFloat(product.price) >= this.state.priceMin && 
      parseFloat(product.price) <= this.state.priceMax)


  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    
    clearTimeout(this.state.debounceTimer)
    this.setState(() => ({
      ...this.state,
      debounceTimer: setTimeout(() => {
        this.doSearch(e.target.value)
      }, 500)
    }))
  }

  doSearch = (query: string) => {
    axios.get<Products>(`api/products?q=${query}`)
      .then(response => {
        this.setState(() => ({
          ...this.state,
          products: response.data
        }))
      })
      .catch(error => {
        console.log('there was an error fetching products')
      })
  }

  componentDidMount(): void {
    axios.get<Products>('/api/products')
      .then(response => {
        this.setState(() => ({
          ...this.state,
          products: response.data
        }))
      })
      .catch(error => {
        console.log('there was an error fetching products')
      })


    // const filterBar = document.getElementById('filter-bar');

    // noUiSlider.create(filterBar, {
    //   start: [0, 100],
    //   connect: true,
    //   range: {
    //     'min': 0,
    //     'max': 100
    //   },
    //   step: 1,
    // });

    // const skipValues = [
    //   document.getElementById('value-lower'),
    //   document.getElementById('value-upper')
    // ];

    // filterBar.noUiSlider.on('update', function (values, handle) {
    //   console.log(values[handle])
    //   skipValues[handle].innerHTML = Math.round(values[handle]).toString()
    // });
    
  }

  render() {
    return (
      <div>
        <Header />
        <section className="bgwhite p-t-55 p-b-65">
          <div className="container">
            <div className="row">
              <SideBar 
                handleSearch={this.handleSearch}
              />
              <div className="col-sm-6 col-md-8 col-lg-9 p-b-50">
                <FilterPanel 
                  resultCount={this.state.products.length}
                  handleSortBy={this.handleUpdateSort}
                  filterByPrice={this.handleFilterByPrice}
                />

                

                <ProductsContainer
                  products={
                    this.filterProducts(
                      this.sortProducts(this.state.products))}
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