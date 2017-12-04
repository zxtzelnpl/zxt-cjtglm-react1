import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as registerStatementActionsFromOtherFile from '../actions/registerstatement'
import RegisterStatement from '../subpages/RegisterStatement'

function mapStateToProps(state) {
    return {
        registerstatement:state.registerstatement
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerStatementActions:bindActionCreators(registerStatementActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterStatement)