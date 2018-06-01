import React from 'react';
import './WeiXin.less';

class WeiXin extends React.Component {
  constructor(props) {
    super(props);
    this.title = document.querySelector('title').innerHTML;
  }

  render() {
    return (
      <div className="loading">
        <div className="wave">
          <div className="wave1"/>
          <div className="wave2"/>
        </div>
        <h4>{this.title}</h4>
        <p>Loading...</p>
      </div>
    );
  }
}

export default WeiXin;
