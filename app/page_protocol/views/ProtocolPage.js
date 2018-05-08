import React from 'react'
import questions from '../questions'
import Protocol from './Protocol'
import ProtocolDisabled from './ProtocolDisabled'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions as userInfoActionsFromOtherFile} from '../../page_center'


class ProtocolPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    if (this.props.score) {
      return <ProtocolDisabled
        questions={questions}
        score={this.props.score}
      />
    }
    else {
      return <Protocol
        questions={questions}
        userInfomentActions={this.props.userInfomentActions}
        openid={this.props.openid}
      />
    }
  }
}


function mapStateToProps(state) {
  return {
    score: state.userinfo.score,
    openid: state.wxinfo.openid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfomentActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtocolPage)