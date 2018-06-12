import './Group.less';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TeamOne from './TeamOne';
import {teamDetails} from '../groupDate';

class Group extends React.Component{
  constructor(props){
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }

  renderTeams(){
    const group =  this.props.group;
    return group.map(teamName=>{
      const team = teamDetails[teamName];
      return <TeamOne
        key={team.country}
        team={team}
        groupName={this.props.groupName}
        teamName={teamName}
      />
    })
  }

  render(){
    const groupName = this.props.groupName;

    return <div className='world-cup-group'>
      <p className="world-cup-group-name">{groupName}组</p>
      <ul>
        {this.renderTeams()}
      </ul>
    </div>
  }
}

export default Group;
