import './Group8in4.less';

import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {teamDetails} from '../groupDate';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Group8in4 extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
    this.handleClickOne = this.handleClick.bind(this,0)
    this.handleClickTwo = this.handleClick.bind(this,1)
  }

  handleClick(index){
    const {indexOf8, worldCupActions,in8} = this.props;
    const teamIndex = indexOf8[index];
    const teamName = in8[teamIndex];
    const indexDetermin4 = indexOf8[0] / 2;

    if(teamName){
      worldCupActions.from8in4(indexDetermin4,teamName)
    }
  }

  renderTeamIcon(team) {
    let dom = null;
    if (typeof team === 'object') {
      dom = <img src={team.flag}/>;
    }
    return dom;
  }

  render() {
    const {position, indexOf8, in8,champion,ok} = this.props;
    const [index1, index2] = indexOf8;

    const teamName1 = in8[index1];
    const teamName2 = in8[index2];
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];

    let linkUp = 'link-up',
      linkDown = 'link-down',
      linkRow = 'link-row';

    if(ok&&(typeof champion==='string')){
      if(teamName1===champion){
        linkUp+=' winline';
        linkRow+=' winline';
      }
      else if(teamName2===champion){
        linkDown+=' winline';
        linkRow+=' winline';
      }
    }

    return (
      <div className={`group-8in4 ${position}`}>
        <div className="team-8">
          <div className="team-icon" onClick={this.handleClickOne}>
            {this.renderTeamIcon(team1)}
          </div>
          <div className={linkUp}/>
        </div>
        <div className="team-8">
          <div className="team-icon" onClick={this.handleClickTwo}>
            {this.renderTeamIcon(team2)}
          </div>
          <div className={linkDown}/>
        </div>
        <div className={linkRow}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    in8:state.world_cup.in8,
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
)(Group8in4);
