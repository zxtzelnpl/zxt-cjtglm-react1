import React from 'react'
import WeiXin0 from '../subpages/WeiXin0'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as wxInfoActionsFromOtherFile from '../actions/wxinfo'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

function mapStateToProps(state) {
  return {
    wxinfo: state.wxinfo,
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch),
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeiXin0)