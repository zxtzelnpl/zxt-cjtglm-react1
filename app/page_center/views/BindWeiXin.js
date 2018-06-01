import './BindWeiXin.less';

import React from 'react';
import PropTypes from 'prop-types';

// let text = 'right;111111;15921433951';

class BindWeiXin extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      phone: '',
      code: '',
      word: '获取验证码'
    };
    this.interval = null;
    this.getCode = this.getCode.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.onSub = this.onSub.bind(this);
    this.onClickShow = this.onClickShow.bind(this);
    this._isMounted = false;
  }

  phoneChange(e) {
    this.setState({
      phone: e.target.value
    });
  }

  codeChange(e) {
    this.setState({
      code: e.target.value
    });
  }

  phoneCheck(phone) {
    const partten = /^(13\d{9})|(15\d{9})|(14\d{9})|(16\d{9})|(17\d{9})|(18\d{9})|(0\d{10,11})$/;
    return partten.test(phone);
  }

  getCode() {
    const me = this;
    const phone = this.state.phone;
    const check = this.phoneCheck(phone);
    const url = '/ashx/getCode.ashx?Mobile=';
    if (this.counts > 0) {
      return alert(`请在${this.counts}秒后获取`);
    }
    if (!check) {
      return alert('号码错误');
    }

    fetch(`${url}?Mobile=${this.state.phone}`, {
      method: 'get'
    })
      .then(response => response.text())
      .then(text => {
        if (this._isMounted) {
          me.onCounting.call(this, text);
        }
      });
  }

  onCounting(text) {
    const me = this;
    const arr = text.split(';');
    if (arr[0] === 'right') {
      this.secret = arr[1];
      this.checkMobile = arr[2];
      this.counts = 60;
      this.setState({
        word: `${this.counts}秒`
      });
      this.interval = setInterval(function () {
        if (me.counts <= 0) {
          clearInterval(this.interval);
          me.setState({
            word: '获取验证码'
          });
        } else {
          me.counts--;
          me.setState({
            word: `${me.counts}秒`
          });
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.interval);
  }

  onSub() {
    const user = {
      phone: this.state.phone,
      openid: this.props.wxinfo.openid,
      head_log: this.props.wxinfo.headimgurl,
      nick_name: this.props.wxinfo.nick_name,
      city: this.props.wxinfo.city
    };

    if (this.state.code !== this.secret) {
      alert('验证码错误');
    } else {
      this.props.wxInfoActions.addUser(user);
    }
  }

  onClickShow() {
    this.props.registerStatementActions.change({show: true});
  }

  componentDidMount() {
    this._isMounted = true;
  }

  render() {
    return (
      <div className="bind-weixin-page">
        <div className="login-box">
          <h2>注册</h2>
          <p className="phone-p">
            <span>+86</span>
            <input name="txtMobile"
                   type="text"
                   placeholder="请输入手机号"
                   value={this.state.phone}
                   onChange={this.phoneChange}
            />
          </p>
          <p className="code-p">
            <input name="txtCheckCode"
                   type="text"
                   maxLength="6"
                   className="form-control"
                   placeholder="请输入验证码"
                   value={this.state.code}
                   onChange={this.codeChange}
            />
            <a id="btnSendCheckCode" onClick={this.getCode}>{this.state.word}</a>
          </p>
          <p className="agree-p">
            注册即表示您已同意我们的
            <a className="statement" onClick={this.onClickShow}>注册申明</a>
          </p>
          <p className="submit-p" id="btnSubmit">
            <a onClick={this.onClickSub}>注册</a>
          </p>
        </div>
      </div>
    );
  }
}

BindWeiXin.propTypes = {
  wxinfo: PropTypes.object,
  wxInfoActions: PropTypes.object,
  registerStatementActions: PropTypes.object
};

export default BindWeiXin;
