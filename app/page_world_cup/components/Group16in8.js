import './Group16in8.less'

import React from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";
import {bindActionCreators} from "redux";

import TeamTwo from './TeamTwo'

import {teamDetails} from '../groupDate';


class Group16in8 extends React.Component{

  render(){
    const {position,teams,labels} =this.props
    const [label1,label2] = labels;
    const [teamName1,teamName2] = teams;
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];

    return <div className={`group-16in8 ${position}`}>
      <div className="team-16">
        <TeamTwo label={label1} team={team1}/>
        <div className="link-up" />
      </div>
      <div className="team-16">
        <TeamTwo label={label2} team={team2}/>
        <div className="link-down" />
      </div>
      <div className="link-row" />
    </div>
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
