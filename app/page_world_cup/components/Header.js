import './Header.less';

import head_img from '../images/head.png';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Header extends React.Component{
  constructor(props){
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }

  render(){
    const hint = this.props.hint;

    return (
      <div className='groupCompetition-head'>
        <img src={head_img} />
        {hint?
          <p data-v-698035a2="" className="title-hint">请在每组选择两支球队晋级淘汰赛</p>:
          <div  className="none"/>
        }

      </div>
    )
  }
}

export default Header;
