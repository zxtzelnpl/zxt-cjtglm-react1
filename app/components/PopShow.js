import React from 'react';
import './PopShow.less';

class PopShow extends React.PureComponent {
  constructor() {
    super();
    this.popClose = this.popClose.bind(this);
    this.state = {
      show: true
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
            <img className="pop-img" src="http://public.jyzqsh.com/51huodong/pop.png"/>
            <a className="pop-link" href="http://new.cjtglm.com/51huodong/src/index.html" />
          </div>
        </div>
      </div>
    );
  }
}

export default PopShow
