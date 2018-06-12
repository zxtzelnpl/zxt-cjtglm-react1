import './Group8in4.less';

import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {teamDetails} from '../groupDate';

class Group8in4 extends React.Component {


  renderTeamIcon(flag) {
    let dom = <div className="team-icon"/>;
    if (flag) {
      dom = <div className="team-icon">
        <img src={flag}/>
      </div>;
    }
    return dom;
  }

  render() {
    const {position, indexOf8, A, B, C, D, E, F, G, H, in8} = this.props;
    const [index1, index2] = indexOf8;
    const indexDetermin4 = (index2 + 1) / 2;
    const teamName1 = in8[index1];
    const teamName2 = in8[index2];
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];


    return (
      <div className={`group-8in4 ${position}`}>
        <div className="team-8">
          {this.renderTeamIcon(team1.flag)}
          <div className="link-up"/>
        </div>
        <div className="team-8">
          {this.renderTeamIcon(team2.flag)}
          <div className="link-down"/>
        </div>
        <div className="link-row"/>
      </div>
    );
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
    in8: state.world_cup.in8
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
)(Group8in4);
