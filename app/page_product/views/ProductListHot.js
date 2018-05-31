import './ProductListHot.less';

import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router-dom';


class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {id, name, special, records, /* half_body_img,*/ stocks, recordNum} = this.props.data;
    const stock = stocks[0] || {result: '', name: ''};
    return (
      <li>
        <Link to={`/teacher/${id}`} className="box">
          <div className="stock">
            <p className="result">{stock.result}</p>
            <p className="name"><span>{stock.name}</span><span className="code">{stock.code}</span></p>
          </div>
          <div className="user">
            <p className="user-info">
              <span className="special">{special}</span><span>：</span><span className="name">{name}</span>
              <span className="day-count">{stock.dayCount}</span><span>：</span><span
                className="result">{stock.result}</span>
            </p>
            <p className="day-send">
              <span className="key">推出日期</span><span>：</span><span className="value">{stock.daySend}</span>
            </p>
            <p className="result_one">
              <span className="key">{records[recordNum].title}</span><span>：</span>
              <span className="progress"><b className="water" style={{width: records[recordNum].water}}/></span>
              <span className="value">{records[recordNum].result}</span>
            </p>
          </div>
        </Link>
      </li>
    );
  }
}

Product.propTypes = {
  data: PropTypes.object
};


class ProductListHot extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    if (this.props.list.length > 0) {
      const productHtml = this.props.list.map(data => (
        <Product key={data.id} data={data}/>
      ));
      return (

        <div className="product-hot">
          <div className="title">
            <span className="word">明星牛人</span>
            <span className="fa fa-chevron-right"/>
          </div>
          <div className="list">
            <ul>
              {productHtml}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="none"/>
    );
  }
}

ProductListHot.propTypes = {
  list: PropTypes.array
};

export default ProductListHot;
