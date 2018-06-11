import './Group.less';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TeamOne from './TeamOne';

class Group extends React.Component{
  constructor(props){
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }

  renderTeams(){
    const teams =  this.props.group.teams;
    return teams.map(team=>{
      return <TeamOne
        key={team.country}
        team={team}
        groupName={this.props.group.name}
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
