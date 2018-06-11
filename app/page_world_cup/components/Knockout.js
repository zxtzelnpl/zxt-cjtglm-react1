import './Knockout.less';

import React from 'react';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import {connect} from 'react-redux';

import Group16in8 from './Group16in8';
import Group8in4 from './Group8in4';
import Group4in2 from './Group4in2';
import GroupFinal from './GroupFinal';

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
          <div className="groups-left-16in8">
            <Group16in8 position={'left'} labels={['A1','B2']}/>
            <Group16in8 position={'left'} labels={['C1','D2']}/>
            <Group16in8 position={'left'} labels={['E1','F2']}/>
            <Group16in8 position={'left'} labels={['G1','H2']}/>
          </div>
          <div className='groups-left-8in4'>
            <Group8in4 position={'left'} labels={[0,1]}/>
            <Group8in4 position={'left'} labels={[2,3]}/>
          </div>
          <div className='group-left-4in2'>
            <Group4in2 position={'left'} labels={[0,1]}/>
          </div>

          <div className='group-1-center'>
            <GroupFinal />
          </div>

          <div className='group-right-4in2'>
            <Group4in2 position={'right'} labels={[2,3]}/>
          </div>
          <div className='group-right-8in4'>
            <Group8in4 position={'right'} labels={[4,5]}/>
            <Group8in4 position={'right'} labels={[6,7]}/>
          </div>
          <div className='group-right-16in8'>
            <Group16in8 position={'right'} labels={['B1','A2']}/>
            <Group16in8 position={'right'} labels={['D1','C2']}/>
            <Group16in8 position={'right'} labels={['F1','E2']}/>
            <Group16in8 position={'right'} labels={['H1','G2']}/>
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
