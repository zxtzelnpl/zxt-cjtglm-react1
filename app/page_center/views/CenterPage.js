import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import User from './User' //用户中心页面
import BindWeiXin from './BindWeiXin' //注册页面
import * as userInfoActionsFromOtherFile from '../actions'
import {actions as registerStatementActionsFromOtherFile} from '../../page_register_statement'
import {actions as wxInfoActionsFromOtherFile} from '../../page_weixin'
import {actions as productListActionsFromOtherFile} from '../../page_product'
import {getCode, getQuery} from "../../static/js/tools";



/**
 * ********** React Component **********
 */
class Center extends React.Component {
  constructor(props, content) {
    super(props, content)
  }

  render() {
    let user_count = this.props.wxinfo.user_count;
    if (user_count == null) {
      return <div className="none"/>
    }
    else if (user_count === '1') {
      return <User
        userinfo={this.props.userinfo}
        wxinfo={this.props.wxinfo}
        registerStatementActions={this.props.registerStatementActions}
        userInfoActions={this.props.userInfoActions}
      />
    }
    else if (user_count === '0') {
      return <BindWeiXin
        wxinfo={this.props.wxinfo}
        registerStatementActions={this.props.registerStatementActions}
        wxInfoActions={this.props.wxInfoActions}
      />
    }
    else {
      return <div className="none"/>
    }
  }

  componentDidMount() {
    if (this.props.wxinfo.user_count == null) {
      this.getWeiXinInfo()
    }
  }

  getWeiXinInfo() {
    let query = getQuery(location.search);
    if (!query.code) {
      getCode()
    } else {
      return fetch('/ashx/wx_openid_user_is.ashx?code=' + query.code)
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          if (json.openid == null) {
            alert('您还未关注《超级投顾联盟》，如已经关注请尝试重新关注微信公众号后再次注册')
          }
          else {
            this.props.wxInfoActions.get(json)
          }
        })
        .catch((err) => {
          alert('您还未关注《超级投顾联盟》，如已经关注请尝试重新关注微信公众号后再次注册')
        })
    }
  }
}



/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    registerstatement: state.registerstatement,
    wxinfo: state.wxinfo,
    productlist: state.productlist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerStatementActions: bindActionCreators(registerStatementActionsFromOtherFile, dispatch),
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch),
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Center)