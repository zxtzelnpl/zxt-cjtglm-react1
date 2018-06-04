import Protocol from './Protocol';
import ProtocolDisabled from './ProtocolDisabled';

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions as userInfoActionsFromOtherFile} from '../../page_center';


class ProtocolPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (this.props.score) {
      return <ProtocolDisabled
        score={this.props.score}
      />;
    }

    return <Protocol
      userInfomentActions={this.props.userInfomentActions}
      openid={this.props.openid}
    />;
  }
}


ProtocolPage.propTypes = {
  score: PropTypes.string,
  userInfomentActions: PropTypes.object,
  openid: PropTypes.string
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    score: state.userinfo.score,
    openid: state.wxinfo.openid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userInfomentActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtocolPage);
