import './User.less';

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import InfoBox from './InfoBox';
import Footer from '../../component_footer';

class UserCenterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {headimgurl, nick_name, openid} = this.props.wxinfo;
    const {name, phone, /* account,*/ ID_number, id} = this.props.userinfo;
    const {change_name, change_id, change_account} = this.props.userInfoActions;
    const customer = '13524957316';
    return (
      <div className="usercenter-page">
        <section className="head">
          <img src={headimgurl} alt=""/>
          <p>{nick_name}</p>
        </section>
        <section>
          <InfoBox data={{
            inputName: 'user_name',
            word: '姓名',
            content: name,
            placeholder: '请输入您新的姓名',
            canChange: true,
            userInfoChange: change_name,
            openid: openid
          }}/>
          <InfoBox data={{
            inputName: 'phone',
            word: '手机',
            content: phone,
            placeholder: '请输入您新的手机',
            canChange: false
          }}/>
        </section>
        <section>
          <InfoBox data={{
            inputName: 'number',
            word: '身份证号',
            content: ID_number,
            placeholder: '请输入您新的身份证',
            canChange: true,
            userInfoChange: change_id,
            openid: openid
          }}/>
        </section>
        <section>
          <div className="link-box">
            我的订阅
            <Link to={`/mysubscirbe/${id}`}>
              <span className="btn fa fa-angle-right"/>
            </Link>
          </div>
          <div className="link-box">
            注册申明
            <span
              className="btn fa fa-angle-right"
              onClick={this.showRegisterStatement.bind(this)}
            />
          </div>
          <div className="link-box">
            协<span className="hidden">空空</span>议
            <Link to="/protocol">
              <span className="btn fa fa-angle-right"/>
            </Link>
          </div>
          <div className="link-box">
            联系我们<span className="single-word">：</span>
            {customer}
            <a href={`tel:${customer}`}>
              <span className="btn fa fa-angle-right"/>
            </a>
          </div>
        </section>
        <Footer footerIndex={2}/>
      </div>
    );
  }

  componentDidMount() {
    const openid = this.props.wxinfo.openid;
    this.props.userInfoActions.fetchUserIfNeeded(openid);
  }

  showRegisterStatement() {
    this.props.registerStatementActions.change({show: true});
  }
}

UserCenterPage.propTypes = {
  userinfo: PropTypes.object,
  wxinfo: PropTypes.object,
  registerStatementActions: PropTypes.object,
  userInfoActions: PropTypes.object
};

export default UserCenterPage;
