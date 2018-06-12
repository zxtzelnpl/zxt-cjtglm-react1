import './GroupFinal.less'

import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {teamDetails} from '../groupDate';
import champing_logo from '../images/champions.png'
import champing_logo_a from '../images/champions_a.png'
import world_cup_img from '../images/cup.png'


class GroupFinal extends React.Component{

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
        <div className="champion_logo">
          <img src={champing_logo} />
        </div>
      </div>
    }

    return champion_dom
  }

  renderTeamIcon(flag) {
    let dom = <div className="team-icon"/>;
    if (flag) {
      dom = <div className="team-icon">
        <img src={flag}/>
      </div>;
    }
    return dom;
  }

  render(){
    const {position, A, B, C, D, E, F, G, H, in2,champion} = this.props;
    const teamName1 = in2[0];
    const teamName2 = in2[1];
    const team1 = teamDetails[teamName1];
    const team2 = teamDetails[teamName2];
    const teamChampion = teamDetails[champion];

    return (
        <div className='group-final'>
          {this.renderChampion(teamChampion)}

          <div className="final-groups">
            <div className="team-2">
              {this.renderTeamIcon(team1.flag)}
              <div className="link-left"/>
            </div>

            <div className="link-row" />

            <div className="team-2">
              {this.renderTeamIcon(team2.flag)}
              <div className="link-right"/>
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
    A: state.world_cup.A,
    B: state.world_cup.B,
    C: state.world_cup.C,
    D: state.world_cup.D,
    E: state.world_cup.E,
    F: state.world_cup.F,
    G: state.world_cup.G,
    H: state.world_cup.H,
    in2: state.world_cup.in2,
    champion: state.world_cup.champion
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
