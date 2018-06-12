import './Group4in2.less'

import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {teamDetails} from '../groupDate';

class Group4in2 extends React.Component{

  renderTeamIcon(flag) {
    let dom = <div className="team-icon"/>;
    if (flag) {
      dom = <div className="team-icon">
        <img src={flag}/>
      </div>;
    }
    return dom;
  }

  render(){
    const {position, indexOf4, A, B, C, D, E, F, G, H, in4} = this.props;
    const [index1, index2] = indexOf4;
    const indexDetermin2 = (index2 + 1) / 2;
    const teamName1 = in4[index1];
    const teamName2 = in4[index2];
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];

    return (
      <div className={`group-4in2 ${position}`}>
        <div className="team-4">
          {this.renderTeamIcon(team1.flag)}
          <div className="link-up"/>
        </div>
        <div className="team-4">
          <div className="link-down"/>
          {this.renderTeamIcon(team2.flag)}
        </div>
        <div className="link-row"/>
      </div>
    )
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
    H: state.world_cup.H,
    in4: state.world_cup.in4
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
)(Group4in2);
