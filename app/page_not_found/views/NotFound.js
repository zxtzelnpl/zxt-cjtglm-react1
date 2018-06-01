import './NotFound.less';

import Footer from '../../component_footer';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

class NotFound extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="not-found">
        <div className="not-found-404">404</div>
        <div className="not-found-404">页面不存在</div>
        <div className="not-found-show"></div>
        <Footer/>
      </div>
    );
  }
}

export default NotFound;
