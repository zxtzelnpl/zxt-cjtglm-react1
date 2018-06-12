import './Group16in8.less'

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from "react-redux";
import * as actions from "../actions";
import {bindActionCreators} from "redux";

import TeamTwo from './TeamTwo'

import {teamDetails} from '../groupDate';


class Group16in8 extends React.Component{
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
    this.handleClickOne = this.handleClick.bind(this,0)
    this.handleClickTwo = this.handleClick.bind(this,1)
  }


  handleClick(index){
    const {teams,indexDetermin8,worldCupActions} =this.props;
    const teamName = teams[index];

    worldCupActions.from16in8(indexDetermin8,teamName)
  }

  render(){
    const {position,teams,labels} =this.props
    const [label1,label2] = labels;
    const [teamName1,teamName2] = teams;
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];

    return <div className={`group-16in8 ${position}`}>
      <div className="team-16">
        <TeamTwo label={label1} team={team1} onClick={this.handleClickOne}/>
        <div className="link-up" />
      </div>
      <div className="team-16">
        <TeamTwo label={label2} team={team2} onClick={this.handleClickTwo}/>
        <div className="link-down" />
      </div>
      <div className="link-row" />
    </div>
  }
}

function mapStateToProps() {
  return {

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
