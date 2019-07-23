import * as React from 'react'
import { Products } from '../types'

import ProductComponent from './Product'

interface Props {
  products: Products
}

export default (props: Props) => (
  <div className="row">
    { props.products.map(product => (
      <ProductComponent key={product._id} product={product} />
    ))}
  </div>
)