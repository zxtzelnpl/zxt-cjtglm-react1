import React from 'react'
import { bindActionCreators } from 'redux'
import * as articleListmentActionsFromOtherFile from '../actions/articlelist'
import { connect } from 'react-redux'
import ArticleList from '../subpages/ArticleList'

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
)(ArticleList)