import './Knockout.less';

import React from 'react';
import {connect} from 'react-redux';
import html2canvas from 'html2canvas';

import Group16in8 from './Group16in8';
import Group8in4 from './Group8in4';
import Group4in2 from './Group4in2';
import GroupFinal from './GroupFinal';

import Header from './Header'
import * as actions from '../actions';
import {bindActionCreators} from 'redux';

import qr_code from '../images/qr_code.png';

class Knockout extends React.Component{
  constructor(props){
    super(props)
    this.makePicture = this.makePicture.bind(this);
    this.state={
      show:false,
      share_img:''
    }
  }

  check(){
    const {in8,in4,in2,champion} = this.props.world_cup;
    let in8Check=false,
      in4Check=false,
      in2Check = false,
      championCheck;

    if(in8.length===8){
      in8Check = in8.every(team=>{
        return typeof team === 'string'
      })
    }

    if(in4.length===4){
      in4Check = in4.every(team=>{
        return typeof team === 'string'
      })
    }

    if(in2.length===2){
      in2Check = in2.every(team=>{
        return typeof team === 'string'
      })
    }

    championCheck = (typeof champion === 'string');

    console.log(in8Check,in4Check,in2Check,championCheck)

    return in8Check&&in4Check&&in2Check&&championCheck;
  }

  makePicture(e){
    if(e.target.className.indexOf('ok')>-1){
      console.log('we finish')

      this.props.worldCupActions.teamAllOK();

      html2canvas(this.page).then(canvas => {
        let base64 = canvas.toDataURL('images/png');
        this.setState({
          show:true,
          share_img:base64
        })
      });
    }
    else{
      console.log('not finish yet')

    }
  }

  render(){
    const {A,B,C,D,E,F,G,H,ok} = this.props.world_cup;
    let check = this.check()
    return (
      <div className='world-cup-knockout' ref={page => {this.page = page}}>
        <Header />

        <div className="knockout_content">
          <div className="groups-left-16in8">
            <Group16in8 position={'left'} indexDetermin8={0} teams={[A[0],B[1]]} labels={['A1','B2']}/>
            <Group16in8 position={'left'} indexDetermin8={1} teams={[C[0],D[1]]} labels={['C1','D2']}/>
            <Group16in8 position={'left'} indexDetermin8={2} teams={[E[0],F[1]]} labels={['E1','F2']}/>
            <Group16in8 position={'left'} indexDetermin8={3} teams={[G[0],H[1]]} labels={['G1','H2']}/>
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
            <Group16in8 position={'right'} indexDetermin8={4} teams={[B[0],A[1]]} labels={['B1','A2']}/>
            <Group16in8 position={'right'} indexDetermin8={5} teams={[D[0],C[1]]} labels={['D1','C2']}/>
            <Group16in8 position={'right'} indexDetermin8={6} teams={[F[0],E[1]]} labels={['F1','E2']}/>
            <Group16in8 position={'right'} indexDetermin8={7} teams={[H[0],G[1]]} labels={['H1','G2']}/>
          </div>
        </div>

        {
          ok?
            <div className="world-cup-share">
              <img src={qr_code} />
              <p>长按图片保存分享你的预测吧</p>
            </div>:
            <div className={`world-cup-finish ${check?'ok':''}`} onClick={this.makePicture}>
              完成
            </div>
        }

        {
          this.state.show&&
            <div className="world-cup-knockout-share">
              <img src={this.state.share_img}/>
            </div>
        }

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
