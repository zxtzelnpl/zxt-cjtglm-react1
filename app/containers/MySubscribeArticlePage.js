import './MySubscribeArticlePage.less'
import React from 'react'
import {bindActionCreators} from 'redux'
import * as subscribeListActionsFromOtherFile from '../actions/subscriblelist'
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
      canBuy: false,
      newslist: []
    }
  }

  render() {
    let subscribe = null
    let data = this.props.subscriblelist.data
    if(Array.isArray(data)){
      data.forEach(item => {
        if (item.produce_id === this.produce_id) {
          subscribe = item
        }
      })
    }


    let headHtml = (
            <div className="wrap">
              <img/>
              <div>
                <p>******</p>
                <p>******</p>
              </div>
            </div>
        ),
        buyButton = (<div className="none" />)
    if(subscribe){
      let {head_log, name, style} = subscribe
      headHtml=(
          <div className="wrap">
            <img src={head_log}/>
            <div>
              <p>{name}</p>
              <p>{style}</p>
            </div>
          </div>
      )
      if(this.state.canBuy){
        buyButton = (<a onClick={this.getSubscribe.bind(this, name)}>续 费</a>)
      }
    }


    return (
        <div className="subscribe-list-page">
          <div className="content">
            <div className="head">
              {headHtml}
              {buyButton}
            </div>
            {this.state.initDom?<SubscribeArticleList
                product_id={this.produce_id}
                user_id={this.user_id}
                list={this.state.newslist}
            />:<div className="loading">数据加载中，请稍等</div>}

          </div>
          <Footer footerIndex={2}/>
        </div>
    )
  }

  componentDidMount() {
    let user_id = this.user_id
    let produce_id = this.produce_id
    let url = `/ashx/user_analysts_list.ashx?user_id=${user_id}&produce_id=${produce_id}`
    let check = `/ashx/productlist.ashx?id=${produce_id}`
    let subscribe_url = `/ashx/user_subscribe.ashx?user_id=${user_id}`
    fetch(url, {
      method: 'get'
    })
        .then((res) => {
          return res.text()
        })
        .then((text) => {
          let json = JSON.parse(text.replace(/\t/ig, ''))
          this.setState({
            initDom: true,
            newslist: json
          })
        })
        .catch((err) => {
          console.log(err)
        })

    fetch(check, {
      method: 'get'
    })
        .then((res) => {
          return res.json()
        })
        .then(json => {
          if (json.length && json.length !== 0)
            this.setState({
              canBuy: true
            })
        })

    if(typeof this.props.subscriblelist.updateAt === 'undefined'){
      fetch(subscribe_url, {
        method: 'get'
      })
          .then((response) => {
            return response.json()
          })
          .then((json) => {
            this.props.subscribeListActions.get(json)
          })
          .catch((err)=>{
            console.log(err)
          })
    }
  }

  getSubscribe(produce_name) {
    if (this.props.wxinfo.user_count === '1') {
      let openid = this.props.wxinfo.openid
      let money = 3900;
      let user_id = this.user_id
      let user_name = this.props.wxinfo.nick_name
      let user_phone = this.props.userinfo.phone
      let produce_id = this.produce_id
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
    subscriblelist: state.subscriblelist,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeListActions: bindActionCreators(subscribeListActionsFromOtherFile, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySubscribeArticlePage)