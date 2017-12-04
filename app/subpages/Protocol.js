import React from 'react'
import questions from '../constants/questions'
import Protocol from  '../components/Protocol'
import ProtocolDisabled from  '../components/ProtocolDisabled'

class Protocol extends React.Component{
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

export default Protocol