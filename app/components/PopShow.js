import React from 'react';
import './PopShow.less';
import {public_resource} from "../constants/urls";

const link = "http://new.cjtglm.com/mother_day/index.html"
const pop_img_url = `${public_resource}/double11/pop.png`

function ifShow(){
  var showMark = sessionStorage.getItem('national');
  if(showMark === '1'){
    return false;
  }
  else{
    sessionStorage.setItem('national','1');
    return true;
  }
}

class PopShow extends React.PureComponent {
  constructor() {
    super();
    this.popClose = this.popClose.bind(this);

    this.state = {
      show: ifShow()
    }
  }

  popClose() {
    this.setState({
      show: false
    });
  }

  render() {
    let style={}
    if(!this.state.show){
      style={'display':'none'}
    }
    return (
      <div className="product-pop-show" style={style}>
        <div className="pop-bg" onClick={this.popClose}>
          <div className="pop">
            <img className="pop-img" src={pop_img_url}/>
          </div>
        </div>
      </div>
    );
  }
}

export default PopShow
