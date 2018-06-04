import './ErrPage.less';

import React from 'react';
import PropTypes from 'prop-types';

class ErrPage extends React.PureComponent {
  render() {
    return (
      <div className="ErrPage">
        <div className="innerWrap">
          <h1>哎呀！！！出错啦！</h1>
          <article>
            <span>可能原因：</span>
            <span>
            {this.props.message}
          </span>
          </article>
        </div>
      </div>
    );
  }
}

ErrPage.propTypes = {
  message: PropTypes.string
};

export default ErrPage;

