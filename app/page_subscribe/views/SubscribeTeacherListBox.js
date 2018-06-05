import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class SubscribeTeacherListBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {head_log, name, overplus_produces, produce_id, style} = this.props.subscribe;
    const user_id = this.props.user_id;

    return <Link key={produce_id} className="box"
                 to={`/mysubscribearticle/${produce_id}a${user_id}`}>
      <div className="wrap">
        <div className="photo">
          <img src={head_log}/>
        </div>
        <div className="details">
          <p className="name">
            <span>
                {name}
              <span className="rest">
                  ( 剩余{overplus_produces}期 )
                </span>
            </span>
            <span className="check">查看详情</span>
          </p>
          <p className="style">
            <span>操作风格</span>
            <span>
                {style}
            </span>
          </p>
        </div>
      </div>
    </Link>;
  }
}


SubscribeTeacherListBox.propTypes = {
  subscribe: PropTypes.object,
  user_id: PropTypes.string
};


export default SubscribeTeacherListBox;
