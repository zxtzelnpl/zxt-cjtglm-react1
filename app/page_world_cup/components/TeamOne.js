import './TeamOne.less';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import {connect} from 'react-redux';

class TeamOne extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
    this.add=this.add.bind(this);
    this.del=this.del.bind(this);
  }

  add() {
    const {groupName,teamName} = this.props;
    this.props.worldCupActions.add(groupName,teamName);
  }

  del() {
    const {groupName,teamName} = this.props;
    this.props.worldCupActions.del(groupName,teamName);
  }


  render() {
    const {country, flag} = this.props.team;
    const {teamName, groupName, world_cup} = this.props;

    let group = world_cup[groupName];
    let index = group.indexOf(teamName)
    let html;
    if (index > -1) {
      html = (<li className='world-cup-team_one selected' onClick={this.del}>
        <div className='world-cup-country'>
          <img src={flag}/>
          <span>{country}</span>
        </div>
        <span className='world-cup-selected'>{groupName}{index + 1}</span>
      </li>);
    }
    else {
      html = (
        <li className='world-cup-team_one' onClick={this.add}>
          <div className='world-cup-country'>
            <img src={flag}/>
            <span>{country}</span>
          </div>
          <span className='world-cup-select'/>
        </li>
      );
    }

    return html;
  }
}

function mapStateToProps(state) {
  return {
    world_cup: state.world_cup
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
)(TeamOne);
