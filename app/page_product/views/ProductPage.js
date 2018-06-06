import * as productListActionsFromOtherFile from '../actions';
import Banner from './Banner';
import ProductList from './ProductList';
import ProductListHot from './ProductListHot';
import Footer from '../../component_footer';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (typeof this.props.productListActions.receivedAt === 'undefined') {
      this.props.productListActions.fetchListIfNeeded();
    }
  }

  renderProductList() {
    const WAITING = '数据正在加载中，请稍等';
    const {ids, data} = this.props.productList;
    let productListDom;
    if (ids.length === 0) {
      productListDom = (
        <div>{WAITING}</div>
      );
    } else {
      const hot = [], normal = [];
      ids.forEach(id => {
        if (data[id].stocks.length > 0) {
          hot.push(data[id]);
        } else {
          normal.push(data[id]);
        }
      });
      productListDom = [
        <ProductListHot key="hot" list={hot}/>,
        <ProductList key="normal" list={normal}/>
      ];
    }
    return productListDom;
  }

  render() {
    return (
      <div className="product-page">
        <Banner/>
        {this.renderProductList()}
        <Footer footerIndex={1}/>
      </div>
    );
  }
}

ProductPage.propTypes = {
  productList: PropTypes.object,
  productListActions: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    productList: state.productList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
