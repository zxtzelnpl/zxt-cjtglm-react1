import React from 'react'
import {bindActionCreators} from 'redux'
import * as subscribeListActionsFromOtherFile from '../actions/subscriblelist'
import * as productListActionsFromOtherFile from '../actions/productlist'
import {connect} from 'react-redux'
import MySubscribe from '../subpages/MySubscribePage'

function mapStateToProps(state) {
    return {
        subscriblelist: state.subscriblelist,
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        subscribeListActions: bindActionCreators(subscribeListActionsFromOtherFile, dispatch),
        productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySubscribe)