import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  name: string
}

export default (props: Props) => (
  <div className="bread-crumb bgwhite flex-w p-l-52 p-r-15 p-t-30 p-l-15-sm">
    <Link to="/" className="s-text16">
      Home
			<i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true" />
    </Link>

    <Link to="/" className="s-text16">
      Women
			<i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true" />
    </Link>

    <Link to="/" className="s-text16">
      T-Shirt
			<i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true" />
    </Link>

    <span className="s-text17">
      {props.name}
		</span>
  </div>
)