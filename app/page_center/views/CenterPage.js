import User from './User'; // 用户中心页面
import BindWeiXin from './BindWeiXin'; // 注册页面
import * as actions from '../actions';
import {actions as registerStatementActionsFromOtherFile} from '../../page_register_statement';
import {actions as productListActionsFromOtherFile} from '../../page_product';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Center extends React.Component {
  constructor(props, content) {
    super(props, content);
  }

  render() {
    const user_count = this.props.wxinfo.user_count;
    let dom = <div className="none"/>;
    if (typeof user_count !== 'undefined') {
      if (user_count === '1') {
        dom = <User
          userinfo={this.props.userinfo}
          wxinfo={this.props.wxinfo}
          registerStatementActions={this.props.registerStatementActions}
          userInfoActions={this.props.userInfoActions}
        />;
      } else if (user_count === '0') {
        dom = <BindWeiXin
          wxinfo={this.props.wxinfo}
          registerStatementActions={this.props.registerStatementActions}
          userInfoActions={this.props.userInfoActions}
        />;
      }
    }

    return dom;
  }
}

Center.propTypes = {
  userinfo: PropTypes.object,
  registerstatement: PropTypes.object,
  wxinfo: PropTypes.object,
  productlist: PropTypes.object,
  registerStatementActions: PropTypes.object,
  userInfoActions: PropTypes.object,
  productListActions: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    registerstatement: state.registerstatement,
    wxinfo: state.wxinfo,
    productlist: state.productlist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerStatementActions: bindActionCreators(registerStatementActionsFromOtherFile, dispatch),
    userInfoActions: bindActionCreators(actions, dispatch),
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Center);
