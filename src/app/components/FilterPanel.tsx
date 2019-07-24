import * as React from 'react'

interface Props {
  resultCount: number
  handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void
  filterByPrice: (min: number, max: number) => void
}

export default (props: Props) => (
  <div className="flex-sb-m flex-w p-b-35">
    <div className="flex-w">
      <div className="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
        <select
          className="selection-2"
          name="sorting"
          onChange={props.handleSortBy}
        >
          <option value="0">Default Sorting</option>
          <option value="-1">Price: low to high</option>
          <option value="1">Price: high to low</option>
        </select>
      </div>

      <div className="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
        <select
          className="selection-2"
          name="sorting"
          onChange={(e) => {
            const vals = e.target.value
              .replace(/\$/g, '')
              .split('-')
              .map(str => parseFloat(str.trim()))

            props.filterByPrice(vals[0], vals[1])
          }}
        >
          <option value="$0.00 - $999999.00">Price</option>
          <option>$0.00 - $50.00</option>
          <option>$50.00 - $100.00</option>
          <option>$100.00 - $150.00</option>
          <option>$150.00 - $200.00</option>
          <option>$200.00+</option>
        </select>
      </div>
    </div>

    <span className="s-text8 p-t-5 p-b-5">
      Showing 1–{props.resultCount} of {props.resultCount} results
    </span>
  </div>
)