import * as React from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

interface Props {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default (props: Props) => (
  <div className="col-sm-6 col-md-4 col-lg-3 p-b-50">
    <div className="leftbar p-r-20 p-r-0-sm">
      <div className="search-product pos-relative bo4 of-hidden">
        <input
          className="s-text7 size6 p-l-23 p-r-50"
          type="text"
          name="search-product"
          placeholder="Search Products..."
          onChange={props.handleSearch}
        />

        <button className="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
          <i className="fs-12 fa fa-search" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
)
