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
    const {position,teams,labels,champion,ok} =this.props
    const [label1,label2] = labels;
    const [teamName1,teamName2] = teams;
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];

    let linkUp = 'link-up',
      linkDown = 'link-down',
      linkRow = 'link-row';

    if(ok&&(typeof champion==='string')){
      let index = teams.indexOf(champion);
      if(index===0){
        linkUp+=' winline';
        linkRow+=' winline';
      }
      else if(index===1){
        linkDown+=' winline';
        linkRow+=' winline';
      }
    }

    return <div className={`group-16in8 ${position}`}>
      <div className="team-16">
        <TeamTwo label={label1} team={team1} onClick={this.handleClickOne}/>
        <div className={linkUp} />
      </div>
      <div className="team-16">
        <TeamTwo label={label2} team={team2} onClick={this.handleClickTwo}/>
        <div className={linkDown} />
      </div>
      <div className={linkRow} />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    champion: state.world_cup.champion,
    ok:state.world_cup.ok
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
