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
    const {A,B,C,D,E,F,G,H} = this.props;

    return (
      <div className='world-cup-knockout'>
        <Header />

        <div className="knockout_content">
          <div className="groups-left-16in8">
            <Group16in8 position={'left'} indexDeter8={0} teams={[A[0],B[1]]} labels={['A1','B2']}/>
            <Group16in8 position={'left'} indexDeter8={1} teams={[C[0],D[1]]} labels={['C1','D2']}/>
            <Group16in8 position={'left'} indexDeter8={2} teams={[E[0],F[1]]} labels={['E1','F2']}/>
            <Group16in8 position={'left'} indexDeter8={3} teams={[G[0],H[1]]} labels={['G1','H2']}/>
          </div>
          <div className='groups-left-8in4'>
            <Group8in4 position={'left'} indexOf8={[0,1]}/>
            <Group8in4 position={'left'} indexOf8={[2,3]}/>
          </div>
          <div className='group-left-4in2'>
            <Group4in2 position={'left'} indexOf4={[0,1]}/>
          </div>

          <div className='group-1-center'>
            <GroupFinal />
          </div>

          <div className='group-right-4in2'>
            <Group4in2 position={'right'} indexOf4={[2,3]}/>
          </div>
          <div className='group-right-8in4'>
            <Group8in4 position={'right'} indexOf8={[4,5]}/>
            <Group8in4 position={'right'} indexOf8={[6,7]}/>
          </div>
          <div className='group-right-16in8'>
            <Group16in8 position={'right'} indexDeter8={4} teams={[B[0],A[1]]} labels={['B1','A2']}/>
            <Group16in8 position={'right'} indexDeter8={5} teams={[D[0],C[1]]} labels={['D1','C2']}/>
            <Group16in8 position={'right'} indexDeter8={6} teams={[F[0],E[1]]} labels={['F1','E2']}/>
            <Group16in8 position={'right'} indexDeter8={7} teams={[H[0],G[1]]} labels={['H1','G2']}/>
          </div>
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
    H: state.world_cup.H
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
