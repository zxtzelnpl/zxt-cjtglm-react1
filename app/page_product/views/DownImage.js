import './DownImage.less';

import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class DownImage extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {

  }

  render() {
    let renderDom = <div className="none"/>;

    if (this.props.pic) {
      renderDom = (
        <div className="down-img">
          <img src={this.props.pic} alt=""/>
        </div>
      );
    }

    return renderDom;
  }
}

DownImage.propTypes = {
  pic: PropTypes.string
};

export default DownImage;
