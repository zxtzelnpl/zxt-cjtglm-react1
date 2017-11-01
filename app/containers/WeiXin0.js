import './WeiXin0.less'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Footer from '../components/Footer'
import * as wxInfoActionsFromOtherFile from '../actions/wxinfo'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import {getQuery, getCode} from "../static/js/tools";

class WeiXin0 extends React.Component {
    constructor(props, content) {
        super(props, content)
        this.index = 0;
        this.state = {
            initDom: false,
            time: null,
            stocks: null
        }
    }

    render() {
        this.index++
        console.log(this.index)
        let stocks = this.state.stocks;
        let htmlStocks;
        if (stocks != null) {
            htmlStocks = stocks.map((stock, index) => {
                return (
                    <div className="box" key={index}>
                        <div className="up">
                            <span>{stock[0]}</span><span>{stock[1]}</span>
                        </div>
                        <div className="down">
                            <span className="label">看好理由：</span>
                            <span className="text">{stock[2]}</span>
                        </div>
                    </div>
                )
            })
        }
        else {
            htmlStocks = <div className="none"/>
        }
        return (
            <div className="wei-xin-0">
                <div className="wrap">
                    <div className="title">
                        <div className="wrap">
                            <div className="left">
                                选股策略
                            </div>
                            <div className="right">
                                {this.state.initDom ? this.state.time : ''}
                            </div>
                        </div>
                        <div className="leftD"/>
                        <div className="rightD"/>
                    </div>
                    <div className="board">
                        {this.state.initDom ? htmlStocks : ''}
                    </div>
                </div>
                <Footer footerIndex={0}/>
            </div>
        )
    }

    componentDidMount() {
        let wxInfoPromise = this.getWeiXinInfo()

        let userInfoPromise = this.getUserInfo(wxInfoPromise)

        let checkBuyPromise = this.checkBuy(userInfoPromise)

        let getArticle = this.getArticle(checkBuyPromise)

        Promise.all([wxInfoPromise, userInfoPromise, getArticle])
            .then(([wxInfo, userInfo, article]) => {
            })
            .catch((err) => {
                if (err.msg) {
                    alert(err.msg)
                    if (err.reason === 'notBuy') {
                        location.href = 'http://zjw.jyzqsh.com/#/product'
                    }
                }
                else {
                    alert('数据出现故障,请稍后再试')
                }
            })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState)
        return nextState.initDom
    }

    getWeiXinInfo() {
        return new Promise((resolve, reject) => {
            if (this.props.wxinfo.openid) {
                resolve({
                    hasLoad: true,
                    openid: this.props.wxinfo.openid
                })
            }
            else {
                let query = getQuery(location.search);
                if (!query.code) {
                    getCode()
                } else {
                    fetch('/ashx/wx_openid_user_is.ashx?code=' + query.code)
                        .then((res) => {
                            return res.json()
                        })
                        .then((json) => {
                            if (json.openid == null) {
                                reject({
                                    reason: 'notSubscribe',
                                    msg: '请先关注微信公众号《君银牛人堂》，购买后可查看'
                                })
                            }
                            else {
                                this.props.wxInfoActions.get(json)
                                resolve(json)
                            }
                        })
                        .catch((err) => {
                            reject({
                                reason: 'notSubscribe',
                                msg: '请先关注微信公众号《君银牛人堂》，购买后可查看'
                            })
                        })
                }
            }
        })
    }

    getUserInfo(wxInfoPromise) {
        return new Promise((resolve, reject) => {
            wxInfoPromise.then((wxinfo) => {
                if (this.props.userinfo.id) {
                    resolve(
                        Object.assign(
                            {hasLoad: true},
                            this.props.userinfo
                        )
                    )
                }
                else {
                    let openid = wxinfo.openid;
                    let url = `/ashx/users_id.ashx?openid=${openid}`
                    fetch(url)
                        .then((res) => {
                            return res.json()
                        })
                        .then((json) => {
                            if (json.length > 0&&json[0].id) {
                                this.props.userInfoActions.load(json[0])
                                resolve(json[0])
                            }
                            else {
                                reject({
                                    msg: '亲，还未注册哦，注册后需购买后方可查看'
                                })
                            }
                        })
                        .catch(() => {
                            reject({
                                msg: '亲，还未注册哦，注册后需购买后方可查看'
                            })
                        })
                }
            })
        })
    }

    checkBuy(userInfoPromise) {
        return new Promise((resolve, reject) => {
            userInfoPromise
                .then((userinfo) => {
                    let user_id = userinfo.id;
                    let article_id = this.props.match.params.id
                    let url = `/ashx/Article_user_Juris.ashx?user_id=${user_id}&article_id=${article_id}`
                    fetch(url)
                        .then((res) => {
                            return res.json()
                        })
                        .then((json) => {
                            if (json.error === '1') {
                                reject({
                                    reason: 'notBuy',
                                    msg: '你未购买次产品，需购买后方可查看'
                                })
                            }
                            else if (json.error === '0') {
                                resolve(json)
                            }
                            else {
                                reject({
                                    msg: '数据连接错误请稍后重试'
                                })
                            }
                        })
                })
        })
    }

    getArticle(checkBuyPromise) {
        return checkBuyPromise
            .then(() => {
                let article_id = this.props.match.params.id
                let url = `/ashx/Article_Selce.ashx?article_id=${article_id}`
                return fetch(url)
                    .then((res) => {
                        return res.json()
                    })
                    .then((json)=>{
                        let stocks = null
                        let _stocks = json[0].strategy.split('---')
                        let time = json[0].create_time.replace(/\//ig, '\-')
                        if (_stocks.length > 0) {
                            stocks = _stocks.map((stock) => {
                                let arr = stock.split(/[*]|[+]|zjw/gi)
                                return arr
                            })
                        }
                        this.setState({
                            initDom: true,
                            time: time,
                            stocks: stocks
                        })
                    })
            })
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        wxinfo: state.wxinfo,
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch),
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeiXin0)