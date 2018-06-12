import './GroupFinal.less'

import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {teamDetails} from '../groupDate';
import champing_logo from '../images/champions.png'
import champing_logo_a from '../images/champions_a.png'
import world_cup_img from '../images/cup.png'
import PureRenderMixin from 'react-addons-pure-render-mixin';


class GroupFinal extends React.Component{
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
    this.handleClickOne = this.handleClick.bind(this,0)
    this.handleClickTwo = this.handleClick.bind(this,1)
  }

  handleClick(index){
    const {worldCupActions,in2} = this.props;
    const teamName = in2[index];

    if(teamName){
      worldCupActions.from2inchampion(teamName)
    }
  }

  renderChampion(champion){
    let champion_dom=null;

    if(champion){
      champion_dom = <div className="champion">
        <div className="champion_flag">
          <img src={champion.flag} />
        </div>
        <div className="champion_name">{champion.country}</div>
        <div className="champion_logo">
          <img src={champing_logo_a} />
        </div>
      </div>
    }
    else{
      champion_dom = <div className="champion">
        <div className="champion_flag" />
        <div className="champion_name" />
        <div className="champion_logo">
          <img src={champing_logo} />
        </div>
      </div>
    }

    return champion_dom
  }

  renderTeamIcon(team) {
    let dom = null;
    if (typeof team === 'object') {
      dom = <img src={team.flag}/>;
    }
    return dom;
  }

  render(){
    const {in2,champion,ok} = this.props;
    const teamName1 = in2[0];
    const teamName2 = in2[1];
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];
    const teamChampion = teamDetails[champion];

    let linkLeft = 'link-left',
      linkRight = 'link-right',
      linkRow = 'link-row';

    if(ok&&(typeof champion==='string')){
      if(teamName1===champion){
        linkLeft+=' winline';
        linkRow+=' winline';
      }
      else if(teamName2===champion){
        linkRight+=' winline';
        linkRow+=' winline';
      }
    }

    return (
        <div className='group-final'>
          {this.renderChampion(teamChampion)}

          <div className="final-groups">
            <div className="team-2">
              <div className="team-icon" onClick={this.handleClickOne}>
                {this.renderTeamIcon(team1)}
              </div>
              <div className={linkLeft}/>
            </div>

            <div className={linkRow} />

            <div className="team-2">
              <div className="team-icon" onClick={this.handleClickTwo}>
                {this.renderTeamIcon(team2)}
              </div>
              <div className={linkRight}/>
            </div>
          </div>

          <div className="world_cup_img">
            <img src={world_cup_img} />
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    in2: state.world_cup.in2,
    champion: state.world_cup.champion,
    ok:state.world_cup.ok,
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
)(GroupFinal);
