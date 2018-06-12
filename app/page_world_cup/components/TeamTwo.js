import './TeamTwo.less'

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class TeamTwo extends React.Component{
  constructor(props){
    super(props)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  }

  render(){
    const {label,team,onClick} = this.props
    return <div className="group-16in8-team" onClick={onClick}>
      <div className="team-num">
        {label}
      </div>
      <div className="team-icon">
        <img src={team.flag} />
        <span>{team.country}</span>
      </div>
    </div>
  }
}

export default TeamTwo
