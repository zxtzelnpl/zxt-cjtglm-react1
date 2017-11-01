import './MySubscribeArticlePage.less'

import React from 'react'
import {bindActionCreators} from 'redux'
import * as productListActionsFromOtherFile from '../actions/productlist'
import * as newsListmentActionsFromOtherFile from '../actions/newslist'
import * as wxInfoActionsFromOtherFile from '../actions/wxinfo'
import {connect} from 'react-redux'

import SubscribeArticleList from '../components/SubscribeArticleList'
import Footer from '../components/Footer'

var wxJsApiParam

function jsApiCall() {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        wxJsApiParam, /*josn串*/
        function (res) {
            WeixinJSBridge.log(res.err_msg);
            if (res.err_msg === "get_brand_wcpay_request:ok") {
                alert('购买成功')
            }
        }
    );
}

function callpay() {
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
        jsApiCall();
    }
}

class MySubscribeArticlePage extends React.Component {
    constructor(props, content) {
        super(props, content)
        this.produce_id = this.props.match.params.id.split('a')[0]
        this.user_id = this.props.match.params.id.split('a')[1]
        this.state = {
            initDom: false,
            newslist: []
        }
    }

    render() {
        console.log('MySubscribeArticlePage')
        let teacher_data = this.teacher_data = this.props.productlist.get(this.produce_id);
        if (teacher_data && this.state.initDom) {
            console.log(teacher_data)
            return (
                <div className="subscribe-list-page">
                    <div className="content">
                        <div className="head">
                            <div className="wrap">
                                <img src={teacher_data.pic}/>
                                <div>
                                    <p>{teacher_data.name}</p>
                                    <p>{teacher_data.special}</p>
                                </div>
                            </div>

                            <a onClick={this.getSubscribe.bind(this)}>续 费</a>
                        </div>
                        <SubscribeArticleList
                            product_name={teacher_data.name}
                            product_id={teacher_data.id}
                            user_id={this.user_id}
                            list={this.state.newslist}
                        />
                    </div>
                    <Footer footerIndex={2}/>
                </div>
            )
        }
        else {
            return <div className="none"/>
        }
    }

    componentDidMount() {
        let productsPromise = new Promise((resolve, reject) => {
            if (this.props.productlist.size === 0) {
                return fetch('/ashx/productlist.ashx', {
                    method: 'get'
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((productlist) => {
                        this.props.productListActions.load(productlist)
                        resolve(true)
                    })
            }
            else {
                resolve(true)
            }
        })

        let newsPromise = new Promise((resolve, reject) => {
            let user_id = this.user_id
            let produce_id = this.produce_id
            let url = `/ashx/user_analysts_list.ashx?user_id=${user_id}&produce_id=${produce_id}`
            return fetch(url, {
                method: 'get'
            })
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    resolve(json)
                })
        })

        Promise.all([productsPromise, newsPromise])
            .then(([productlist, newslist]) => {
                this.setState({
                    initDom: true,
                    newslist: newslist
                })
            })
            .catch((err)=>{
                alert('数据连接错误请稍后重试')
            })
    }

    shouldComponentUpdate(nextProp, nextState) {
        return nextState.initDom
    }

    getSubscribe() {
        if (this.props.wxinfo.user_count === '1') {
            let openid = this.props.wxinfo.openid
            let money = 1;
            let user_id = this.user_id
            let user_name = this.props.wxinfo.nick_name
            let user_phone = this.props.userinfo.phone
            let produce_id = this.produce_id
            let produce_name = this.teacher_data.name
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
                    callpay()
                })
                .catch((err) => {
                    alert('连接失败，请稍后重试')
                })
        }
        else {
            alert('请先完成注册后购买')
            location.hash = 'center'
        }
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        newslist: state.newslist,
        wxinfo: state.wxinfo,
        userinfo: state.userinfo,
        productlist: state.productlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch),
        newsListmentActions: bindActionCreators(newsListmentActionsFromOtherFile, dispatch),
        wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySubscribeArticlePage)