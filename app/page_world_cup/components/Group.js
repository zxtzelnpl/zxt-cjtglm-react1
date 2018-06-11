import './Group.less';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TeamOne from './TeamOne';
import {details} from '../groupDate';

class Group extends React.Component{
  constructor(props){
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }

  renderTeams(){
    const group =  this.props.group;
    return group.map(teamName=>{
      const team = details[teamName];
      return <TeamOne
        key={team.country}
        team={team}
        groupName={this.props.groupName}
        teamName={teamName}
      />
    })
  }

  render(){
    const name = this.props.group.name;

    return <div className='world-cup-group'>
      <p className="world-cup-group-name">{name}组</p>
      <ul>
        {this.renderTeams()}
      </ul>
    </div>
  }
}

export default Group;
