import './Group16in8.less'

import React from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";
import {bindActionCreators} from "redux";

import TeamTwo from './TeamTwo'

import {groups,details} from '../groupDate';


class Group16in8 extends React.Component{

  renderLeft(){
    const {labels}=this.props;
    const [label1,label2] = labels;
    const groupNameOne = label1.slice(0,1);
    const indexOne = label1.slice(1,2)-1;
    const groupNameTwo = label2.slice(0,1);
    const indexTwo = label2.slice(1,2)-1;


    return <div className="group-16in8 left">
      <div className="team-16">
        <TeamTwo label={labels[0]} team={details[this.props[groupNameOne][indexOne]]}/>
        <div className="link-up" />
      </div>
      <div className="team-16">
        <TeamTwo label={labels[1]} team={details[this.props[groupNameTwo][indexTwo]]}/>
        <div className="link-down" />
      </div>
      <div className="link-row" />
    </div>
  }

  renderRight(){
    const {labels}=this.props;
    const [label1,label2] = labels;
    const groupNameOne = label1.slice(0,1);
    const indexOne = label1.slice(1,2)-1;
    const groupNameTwo = label2.slice(0,1);
    const indexTwo = label2.slice(1,2)-1;

    return <div className="group-16in8 right">
      <div className="team-16">
        <TeamTwo label={labels[0]} team={details[this.props[groupNameOne][indexOne]]}/>
        <div className="link-up" />
      </div>
      <div className="team-16">
        <TeamTwo label={labels[1]} team={details[this.props[groupNameTwo][indexTwo]]}/>
        <div className="link-down" />
      </div>
      <div className="link-row" />
    </div>
  }


  render(){
    const {position} =this.props
    let html;
    if(position==='left'){
      html=this.renderLeft()
    }
    if(position==='right'){
      html=this.renderRight()
    }

    return html;
  }
}

function mapStateToProps(state) {
  return {
    A: state.world_cup.A,
    B: state.world_cup.B,
    C: state.world_cup.C,
    D: state.world_cup.D,
    E: state.world_cup.E,
    F: state.world_cup.F,
    G: state.world_cup.G,
    H: state.world_cup.H
  };
}

function mapDispatchToProps(dispatch) {
  return {
    worldCupActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Group16in8);