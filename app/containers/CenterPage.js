import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as registerStatementActionsFromOtherFile from '../actions/registerstatement'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import * as wxInfoActionsFromOtherFile from '../actions/wxinfo'
import * as productListActionsFromOtherFile from '../actions/productlist'
import Center from '../subpages/Center'

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        registerstatement: state.registerstatement,
        wxinfo: state.wxinfo,
        productlist:state.productlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerStatementActions: bindActionCreators(registerStatementActionsFromOtherFile, dispatch),
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
        wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch),
        productListActions:bindActionCreators(productListActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Center)