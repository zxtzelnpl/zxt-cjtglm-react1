import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as productListActionsFromOtherFile from '../actions/productlist'

import Banner from '../components/Banner'
import ProductList from '../components/ProductList'
import ProductListHot from '../components/ProductListHot'
import Footer from '../components/Footer'
import Pop from '../components/Pop'

class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.url = '/ashx/productlist.ashx'
  }

  componentDidMount() {
    if (this.props.productlist.size === 0) {
      fetch(this.url, {
        method: 'get'
      })
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            this.props.productListActions.load(json)
          })
          .catch((err) => {
            console.log('****err****')
            console(err)
            console.log('****err****')
          })
    }
  }

  render() {
    if (this.props.productlist.size > 0) {
      let normal = [];
      let hot = [];
      let mapIter = this.props.productlist.values()
      let next = mapIter.next().value
      while(next){
        if (next.stocks.length > 0) {
          hot.push(next)
        }
        else {
          normal.push(next)
        }
        next = mapIter.next().value
      }
      return (
          <div className="product-page">
            <Banner/>
            <ProductListHot list={hot}/>
            <ProductList list={normal}/>
            <Footer footerIndex={1}/>
            <Pop />
          </div>
      )
    }
    else {
      return (
          <div>页面暂无数据</div>
      )
    }

  }
}
// {/*<div className="none"/>*/}
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    productlist: state.productlist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage)
