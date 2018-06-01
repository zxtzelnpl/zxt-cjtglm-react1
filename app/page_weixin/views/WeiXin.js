import './WeiXin.less';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

class WeiXin extends React.Component {
  constructor(props) {
    super(props);
    this.title = document.querySelector('title').innerHTML;
  }


  componentDidMount() {
    const search = this.props.location.search;
    this.props.wxInfoActions.fetchWxinfoIfNeeded(search);
  }

  render() {
    return (
      <div className="loading">
        <div className="wave">
          <div className="wave1"/>
          <div className="wave2"/>
        </div>
        <h4>{this.title}</h4>
        <p>Loading...</p>
      </div>
    );
  }
}

WeiXin.propTypes = {
  location: PropTypes.object,
  wxInfoActions: PropTypes.object
};

/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    wxinfo: state.wxinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wxInfoActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeiXin);
