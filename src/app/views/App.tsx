import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Product from './ProductPage'
import ProductDetail from './ProductDetail'

export default () => (
  <div>
    <BrowserRouter>
      <Route exact path="/" component={Product} />
      <Route path="/:id" component={ProductDetail} />
    </BrowserRouter>
  </div>
)