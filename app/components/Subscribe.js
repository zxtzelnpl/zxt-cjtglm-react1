import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './Subscribe.less'

class Subscribe extends React.Component {
    constructor(props, context) {
        super(props, context)
        // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    }


    render() {

        return (
            <a className="subscribe" href="javascript:void(0);" onClick={this.getSubscribe.bind(this)}>
                <p>￥39.00</p>
                <p>订阅</p>
            </a>
        )
    }

    getSubscribe() {
        if (this.props.wxinfo.user_count === '1') {
            let openid = this.props.wxinfo.openid
            let money = 1;
            let user_id = this.props.userinfo.id
            let user_name = this.props.wxinfo.nick_name
            let user_phone = this.props.userinfo.phone
            let produce_id = this.props.product.id
            let produce_name = this.props.product.name
            let periods = 5
            let url = `/wx_pay/pay_Inter.aspx?openid=${openid}&money=${money}&user_id=${user_id}&user_name=${user_name}&user_phone=${user_phone}&produce_id=${produce_id}&produce_name=${produce_name}&periods=${periods}`;//获取wxJsApiParam
            fetch(url, {
                method: 'get'
            })
                .then((response) => {
                    return response.text();
                })
                .then((text) => {
                    wxJsApiParam = eval("(" + text + ")");
                    callpay(this.props.userinfo.score, this.props.history)
                })
                .catch((err) => {
                    alert('连接失败，请稍后重试')
                })
        }
        else if (this.props.wxinfo.user_count === '0') {
            alert('请先完成注册后购买')
            this.props.history.push('/center')
        }
        else {
            alert('亲，需要有限关注公众号《君银牛人堂》')
        }
    }
}

export default Subscribe

var wxJsApiParam;

function jsApiCall(score, history) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        wxJsApiParam, /*josn串*/
        function (res) {
            WeixinJSBridge.log(res.err_msg);
            if (res.err_msg === "get_brand_wcpay_request:ok") {
                alert('购买成功')
                if(!score){
                    history.push('/protocol')
                }
            }
        }
    );
}

function callpay(score, history) {
    if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }
    else {
        jsApiCall(score, history);
    }
}