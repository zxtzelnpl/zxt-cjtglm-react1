import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as productListActionsFromOtherFile from '../actions/productlist'
import * as wxInfoActionsFromOtherFile from '../actions/wxinfo'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

import TeachaerBrief from '../components/TeacherBrief'
import ScrollStock from '../components/ScrollStock'
import DownImage from '../components/DownImage'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
import Charts from '../components/Charts'
import detail from '../static/img/teacher/detail.jpg'
import {getQuery, getCode} from "../static/js/tools";

/*Charts*/

class TeacherPage extends React.Component {
    constructor(props, content) {
        super(props, content)
        this.index=0;
    }

    render() {
        console.log(++this.index)
        let teacher_data = this.teacher_data = this.props.productlist.get(this.props.match.params.id);
        if (teacher_data) {
            return (
                <div className="teacher-page">
                    <TeachaerBrief teacher={teacher_data}/>
                    <ScrollStock stocks={teacher_data.stocks}/>
                    <Charts records={teacher_data.records}/>
                    <DownImage pic={detail}/>
                    <Subscribe
                        product={teacher_data}
                        userinfo={this.props.userinfo}
                        wxinfo={this.props.wxinfo}
                        wxInfoActions={this.props.wxInfoActions}
                        history={this.props.history}
                    />
                    <Footer footerIndex={1}/>
                </div>
            )
        }
        else {
            return <div className="none"/>
        }
    }

    componentDidMount() {
        this.getProducts()
        let wxInfoPromise = this.getWeiXinInfo()
        let userInfoPromise = this.getUserInfo(wxInfoPromise)

        userInfoPromise.then(()=>{

        })
            .catch((err)=>{

            })
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
                                    msg: '关注微信公众号《君银牛人堂》注册后可进行购买'
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
                                msg: '关注微信公众号《君银牛人堂》注册后可进行购买'
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
                                resolve(json[0])
                                this.props.userInfoActions.load(json[0])
                            }
                            else {
                                reject({
                                    reason: 'notRegister',
                                    msg: '你未注册，需购注册后方可查看'
                                })
                            }
                        })
                        .catch(() => {
                            reject({
                                reason: 'notRegister',
                                msg: '你未注册，需购注册后方可查看'
                            })
                        })
                }
            })
        })
    }

    getProducts() {
        if (this.props.productlist.size === 0) {
            fetch('/ashx/productlist.ashx', {
                method: 'get'
            })
                .then((response) => {
                    return response.json()
                })
                .then((productlist) => {
                    this.props.productListActions.load(productlist)
                    document.body.scrollTop = 0;
                })
        }
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        productlist: state.productlist,
        wxinfo: state.wxinfo,
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch),
        wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch),
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherPage)


