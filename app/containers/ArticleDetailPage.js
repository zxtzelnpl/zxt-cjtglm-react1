import React from 'react'
import ArticleDetail from '../subpages/ArticleDetail'
import { bindActionCreators } from 'redux'
import * as articleListmentActionsFromOtherFile from '../actions/articlelist'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        articlelist:state.articlelist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        articleListmentActions:bindActionCreators(articleListmentActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetail)