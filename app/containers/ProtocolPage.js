import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import Protocol from '../subpages/Protocol'

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        score:state.userinfo.score,
        openid:state.wxinfo.openid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfomentActions:bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Protocol)