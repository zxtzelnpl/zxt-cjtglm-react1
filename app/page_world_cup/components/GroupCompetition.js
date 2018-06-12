import './GroupCompetition.less';

import React from 'react';
import {Link} from 'react-router-dom';
import Group from './Group';
import {groups,groupDetails} from '../groupDate';

import {connect} from 'react-redux'

import Header from './Header'

class GroupCompetition extends React.Component{
  constructor(props){
    super(props)
  }

  renderGroups(){
    return groups.map(groupName=>{
      return <Group
        key={groupName}
        group={groupDetails[groupName]}
        groupName={groupName}
        />
    })
  }

  onCheck(){
    const {A,B,C,D,E,F,G,H} = this.props.world_cup;
    if(A.length===2
      &&B.length===2
      &&C.length===2
      &&D.length===2
      &&E.length===2
      &&F.length===2
      &&G.length===2
      &&H.length===2
    ){
      return true
    }
    else{
      return false
    }
  }

  render(){
    const ok = this.onCheck();
    let isOk = 'enter-the-knockout';
    if(ok){
      isOk='enter-the-knockout'+' ok'
    }

    return (
      <div className='groupCompetition'>
        <Header hint={"请在每组选择两支球队晋级淘汰赛"}/>

        <div className="world-cup-groups">
          {this.renderGroups()}
        </div>

        <Link className={isOk} to='/knockout'>
          进入淘汰赛
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    world_cup: state.world_cup
  }
}

export default connect(
  mapStateToProps
)(GroupCompetition)
