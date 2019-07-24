import * as React from 'react'
import { Product } from '../types';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';

interface Props {}
interface State {
  product: Product
}

export default class ProductDetail extends React.Component<Props, State> {
  state = {
    product: {
      _id: '',
      guid: '',
      isActive: false,
      name: '',
      price: '',
      image: '',
      about: '',
      registered: '',
      latitude: '',
      longitude: '',
      tags: [
        ''
      ]
    }
  }

  componentDidMount(): void {
    const { id } = this.props.match.params
    axios.get<Product>(`/api/products/${id}`)
      .then(response => {
        this.setState(() => ({
          ...this.state,
          product: response.data
        }))
      })
  }

  render() {
    return (
      <div>
        <Breadcrumb name={this.state.product.name} />

        <div className="container bgwhite p-t-35 p-b-80">
          <div className="flex-w flex-sb">
            <div className="w-size13 p-t-30 respon5">
              <div className="wrap-slick3 flex-sb flex-w">
                <div className="wrap-slick3-dots" />

                <div className="slick3">
                  <div className="item-slick3" data-thumb="images/thumb-item-01.jpg">
                    <div className="wrap-pic-w">
                      <img src={this.state.product.image} alt="IMG-PRODUCT" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="w-size14 p-t-30 respon5">
              <h4 className="product-detail-name m-text16 p-b-13">
                {this.state.product.name}
              </h4>

              <span className="m-text17">
                ${this.state.product.price}
              </span>

              <p className="s-text8 p-t-10">
                {this.state.product.about}
              </p>

              <div className="p-t-33 p-b-60">
                
                <div className="flex-r-m flex-w p-t-10">
                  <div className="w-size16 flex-m flex-w">
                    <div className="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
                      <button className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                        <i className="fs-12 fa fa-minus" aria-hidden="true" />
                      </button>

                      <input className="size8 m-text18 t-center num-product" type="number" name="num-product" value="1" onChange={() => {}} />

                      <button className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                        <i className="fs-12 fa fa-plus" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                      <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-b-45">
                <span className="s-text8 m-r-35">SKU: {this.state.product.guid}</span>
                <span className="s-text8">Categories: {this.state.product.tags.join(', ')}</span>
              </div>

              <div className="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
                <h5 className="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                  Description
                  <i className="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                  <i className="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                </h5>

                <div className="dropdown-content dis-none p-t-15 p-b-23">
                  <p className="s-text8">
                    {this.state.product.about}
                  </p>
                </div>
              </div>

              <div className="wrap-dropdown-content bo7 p-t-15 p-b-14">
                <h5 className="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                  Additional information
                  <i className="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                  <i className="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                </h5>

                <div className="dropdown-content dis-none p-t-15 p-b-23">
                  <p className="s-text8">
                    {this.state.product.about}
                  </p>
                </div>
              </div>

              <div className="wrap-dropdown-content bo7 p-t-15 p-b-14">
                <h5 className="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                  Reviews (0)
                  <i className="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                  <i className="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                </h5>

                <div className="dropdown-content dis-none p-t-15 p-b-23">
                  <p className="s-text8">
                    {this.state.product.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}