import './Group4in2.less'

import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {teamDetails} from '../groupDate';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Group4in2 extends React.Component{
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
    this.handleClickOne = this.handleClick.bind(this,0)
    this.handleClickTwo = this.handleClick.bind(this,1)
  }

  handleClick(index){
    const {indexOf4, worldCupActions,in4} = this.props;
    const teamIndex = indexOf4[index];
    const teamName = in4[teamIndex];
    const indexDetermin2 = indexOf4[0] / 2;
    worldCupActions.from4in2(indexDetermin2,teamName)
  }

  renderTeamIcon(flag) {
    let dom = null;
    if (flag) {
      dom = <img src={flag}/>;
    }
    return dom;
  }

  render(){
    const {position, indexOf4, in4} = this.props;
    const [index1, index2] = indexOf4;
    const teamName1 = in4[index1];
    const teamName2 = in4[index2];
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];

    return (
      <div className={`group-4in2 ${position}`}>
        <div className="team-4">
          <div className="team-icon" onClick={this.handleClickOne}>
            {this.renderTeamIcon(team1.flag)}
          </div>
          <div className="link-up"/>
        </div>
        <div className="team-4">
          <div className="link-down"/>
          <div className="team-icon" onClick={this.handleClickTwo}>
            {this.renderTeamIcon(team2.flag)}
          </div>
        </div>
        <div className="link-row"/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
