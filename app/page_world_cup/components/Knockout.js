import './Knockout.less';

import React from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import {connect} from 'react-redux';

import groupDate from './groupDate';

import Header from './Header'

class Knockout extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    console.log(this.props);

    return (
      <div className='world-cup-knockout'>
        <Header />

        <div className="knockout_content">
          <div className="group-left-8">
            <div className="group-8">
              <div className="team-16">
                <div className="team">
                  <div className="team-num">
                    A1
                  </div>
                  <div className="team-icon">
                    <img src="" />
                    <span></span>
                  </div>
                </div>
                <div className="link-up" />
              </div>
              <div className="team-16">
                <div className="team">
                  <div className="team-num">
                    B1
                  </div>
                  <div className="team-icon">
                    <img src="" />
                    <span></span>
                  </div>
                </div>
                <div className="link-down" />
              </div>
              <div className="link-row" />
            </div>
            <div className="group-8">
              <div className="team-16">

              </div>
              <div className="team-16">

              </div>
              <div className="link-row" />
            </div>
            <div className="group-8">
              <div className="team-16">

              </div>
              <div className="team-16">

              </div>
              <div className="link-row" />
            </div>
            <div className="group-8">
              <div className="team-16">

              </div>
              <div className="team-16">

              </div>
              <div className="link-row" />
            </div>
          </div>
          <div className="group-left-4">
            <div className="group-4"></div>
            <div className="group-4"></div>
          </div>
          <div className="group-left-2">
            <div className="group-2"></div>
            <div className="group-2"></div>
          </div>

          <div className="group-1-center">

          </div>

          <div className="group-left-2">

          </div>
          <div className="group-left-4">

          </div>
          <div className="group-left-8">
            <div className="group-8"></div>
            <div className="group-8"></div>
            <div className="group-8"></div>
            <div className="group-8"></div>
          </div>
        </div>
      </div>
    )
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
)(Knockout);
