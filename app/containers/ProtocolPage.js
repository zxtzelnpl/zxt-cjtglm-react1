import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import Protocol from  '../components/Protocol'
import ProtocolDisabled from  '../components/ProtocolDisabled'

import questions from '../constants/questions'

class ProtocolPage extends React.Component{
    constructor(props,context){
        super(props,context)
    }

    render(){
        if(this.props.score){
            return <ProtocolDisabled
                questions = {questions}
                score = {this.props.score}
            />
        }
        else{
            return <Protocol
                questions = {questions}
                userInfomentActions = {this.props.userInfomentActions}
                openid = {this.props.openid}
            />
        }
    }
}



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
)(ProtocolPage)