import './SubscribeArticleList.less';

import * as actions from '../actions';
import {actions as subscribeTeacherActionsFromOtherFile} from '../../page_subscribe_teacher';
import {actions as productListActionsFromOtherFile} from '../../page_product';
import SubscribeArticleList from './SubscribeArticleListBox';
import Footer from '../../component_footer';
import {money, periods} from '../../component_subscribe/buyInfo';

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

let wxJsApiParam;

function jsApiCall() {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    wxJsApiParam, /* josn串*/
    res => {
      WeixinJSBridge.log(res.err_msg);
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        alert('购买成功');
      }
    }
  );
}

function callpay() {
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', jsApiCall);
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    }
  } else {
    jsApiCall();
  }
}

class SubscribeArticleListPage extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.produce_id = this.props.match.params.id.split('a')[0];
    this.user_id = this.props.match.params.id.split('a')[1];

    this.state = {
      initDom: false,
      canBuy: false,
      newslist: []
    };
  }

  render() {
    let subscribe = null;
    const data = this.props.subscriblelist.data;
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.produce_id === this.produce_id) {
          subscribe = item;
        }
      });
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
      buyButton = (<div className="none"/>);
    if (subscribe) {
      const {head_log, name, style} = subscribe;
      headHtml = (
        <div className="wrap">
          <img src={head_log}/>
          <div>
            <p>{name}</p>
            <p>{style}</p>
          </div>
        </div>
      );
      if (this.state.canBuy) {
        buyButton = (<a onClick={this.getSubscribe.bind(this, name)}>续 费</a>);
      }
    }


    return (
      <div className="subscribe-article-list-page">
        <div className="content">
          <div className="head">
            {headHtml}
            {buyButton}
          </div>
          {this.state.initDom ? <SubscribeArticleList
            product_id={this.produce_id}
            user_id={this.user_id}
            list={this.state.newslist}
          /> : <div className="loading">数据加载中，请稍等</div>}

        </div>
        <Footer footerIndex={2}/>
      </div>
    );
  }

  componentDidMount() {
    const user_id = this.user_id;
    const produce_id = this.produce_id;
    const url = `/ashx/user_analysts_list.ashx?user_id=${user_id}&produce_id=${produce_id}`;
    const check = `/ashx/productlist.ashx?id=${produce_id}`;
    const subscribe_url = `/ashx/user_subscribe.ashx?user_id=${user_id}`;
    fetch(url, {
      method: 'get'
    })
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.replace(/\t/ig, ''));
        this.setState({
          initDom: true,
          newslist: json
        });
      })
      .catch(err => {
        console.log(err);
      });

    fetch(check, {
      method: 'get'
    })
      .then(res => res.json())
      .then(json => {
        if (json.length && json.length !== 0) {
          this.setState({
            canBuy: true
          });
        }
      });

    if (typeof this.props.subscribleTeacher.updateAt === 'undefined') {
      this.props.subscribeTeacherActions.fetchTeacherListIfNeeded(user_id);
    }
  }

  getSubscribe(produce_name) {
    if (this.props.wxinfo.user_count === '1') {
      const openid = this.props.wxinfo.openid;
      const user_id = this.user_id;
      const user_name = this.props.wxinfo.nick_name;
      const user_phone = this.props.userinfo.phone;
      const produce_id = this.produce_id;
      const url = `/wx_pay/pay_Inter.aspx?openid=${openid}&money=${money}&user_id=${user_id}&user_name=${user_name}&user_phone=${user_phone}&produce_id=${produce_id}&produce_name=${produce_name}&periods=${periods}`;// 获取wxJsApiParam
      fetch(url, {
        method: 'get'
      })
        .then(response => response.text())
        .then(text => {
          wxJsApiParam = eval(`(${text})`);
          callpay();
        })
        .catch(err => {
          alert('连接失败，请稍后重试');
        });
    } else {
      alert('请先完成注册后购买');
      location.hash = 'center';
    }
  }
}


SubscribeArticleListPage.propTypes = {
  match: PropTypes.object,
  wxinfo: PropTypes.object,
  userinfo: PropTypes.object,
  subscribleTeacher: PropTypes.object,
  subscribleArticle: PropTypes.object,
  subscribeTeacherActions: PropTypes.object,
  subscribeArticleActions: PropTypes.object,
  productListActions: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    subscribleArticle: state.subscribleArticle,
    wxinfo: state.wxinfo,
    userinfo: state.userinfo,
    subscribleTeacher: state.subscribleTeacher
  };
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeTeacherActions: bindActionCreators(subscribeTeacherActionsFromOtherFile, dispatch),
    subscribeArticleActions: bindActionCreators(actions, dispatch),
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeArticleListPage);
