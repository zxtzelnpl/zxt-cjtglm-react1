import './BindWeiXin.less'

import React from 'react'

let text = 'right;111111;15921433951';

class BindWeiXin extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            phone: '',
            code: '',
            word: '获取验证码'
        }
        this.partten = /^(13\d{9})|(15\d{9})|(14\d{9})|(16\d{9})|(17\d{9})|(18\d{9})|(0\d{10,11})$/;
        this.url = '/ashx/getCode.ashx?Mobile=';
    }

    onChangePhone() {
        this.setState({
            phone: this.phone.value
        })
    }

    onChangeCode() {
        this.setState({
            code: this.code.value
        })
    }

    componentDidMount() {
        console.log('########')
        console.log(this.props.wxinfo)
        console.log('########')
    }

    onClickCode() {
        let me = this;
        if (this.counts > 0) {
            return alert('请在' + this.counts + '秒后获取');
        }
        if (!this.partten.test(this.state.phone)) {
            return alert('号码错误')
        }

        // me.onCounting.call(this, text)

        fetch(this.url + this.state.phone, {
            method: 'get'
        })
            .then((response) => {
                return response.text()
            })
            .then((text) => {
                me.onCounting.call(this,text)
            })
    }

    onCounting(text) {
        let me = this;
        let arr = text.split(';');
        if (arr[0] === 'right') {
            this.secret = arr[1];
            this.checkMobile = arr[2];
            this.counts = 60;
            this.setState({
                word: this.counts + '秒'
            })
            this.interval = setInterval(function () {
                if (me.counts <= 0) {
                    clearInterval(this.interval)
                    me.setState({
                        word: '获取验证码'
                    })
                }
                else {
                    me.counts--;
                    me.setState({
                        word: me.counts + '秒'
                    })
                }

            }, 1000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onClickSub(e) {
        let phone = this.state.phone;
        let openid = this.props.wxinfo.openid
        let head_log = this.props.wxinfo.headimgurl
        let nick_name = this.props.wxinfo.nick_name
        let city = this.props.wxinfo.city
        let url = `/ashx/Add_users.ashx?type=1&phone=${phone}&openid=${openid}&head_log=${head_log}&nike_name=${nick_name}&city=${city}`;
        if (this.state.code !== this.secret) {
            alert('验证码错误')
        }
        // else if (this.state.phone !== this.checkMobile) {
        //     alert('手机号码错误')
        // }
        else {
            fetch(url, {
                method: 'get'
            })
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    console.log(json)
                    if(json[0].erro === '1'){
                        let _wxinfo = Object.assign({},this.props.wxinfo)
                        _wxinfo.user_count = '1'
                        localStorage.setItem('wxinfo',JSON.stringify(_wxinfo))
                        this.props.wxInfoActions.update(_wxinfo)
                    }
                    else{
                        alert('数据连接错误，请稍后重试')
                    }
                })
        }

    }

    onClickShow() {
        this.props.registerStatementActions.change({show: true})
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
                               ref={(input) => {
                                   this.phone = input
                               }}
                               onChange={this.onChangePhone.bind(this)}
                        />
                    </p>
                    <p className="code-p">
                        <input name="txtCheckCode"
                               type="text"
                               maxLength="6"
                               className="form-control"
                               placeholder="请输入验证码"
                               value={this.state.code}
                               ref={(input) => {
                                   this.code = input
                               }}
                               onChange={this.onChangeCode.bind(this)}
                        />
                        <a id="btnSendCheckCode" onClick={this.onClickCode.bind(this)}>{this.state.word}</a>
                    </p>
                    <p className="agree-p">
                        注册即表示您已同意我们的
                        <a className="statement" onClick={this.onClickShow.bind(this)}>注册申明</a>
                    </p>
                    <p className="submit-p" id="btnSubmit">
                        <a onClick={this.onClickSub.bind(this)}>注册</a>
                    </p>
                </div>
            </div>
        )

    }
}

export default BindWeiXin