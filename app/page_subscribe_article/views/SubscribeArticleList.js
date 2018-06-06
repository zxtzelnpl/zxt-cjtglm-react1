import './SubscribeArticleList.less';

import * as actions from '../actions';
import {actions as subscribeTeacherActionsFromOtherFile} from '../../page_subscribe_teacher';
import {actions as productListActionsFromOtherFile} from '../../page_product';
import SubscribeArticleBox from './SubscribeArticleBox';
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

  renderHeaderDom() {
    let headHtml = (
      <div className="wrap">
        <img/>
        <div>
          <p>******</p>
          <p>******</p>
        </div>
      </div>
    );
    let subscribe = null;
    const data = this.props.subscribleTeacher.data;
    data.forEach(item => {
      if (item.produce_id === this.produce_id) {
        subscribe = item;
      }
    });
    if (subscribe !== null) {
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
    }
    return headHtml;
  }

  renderBuyButtonDom() {
    let buyButton = <div className="none"/>;
    const ids = this.props.productList.ids;
    if (ids.indexOf(this.produce_id)) {
      buyButton = <a onClick={this.getSubscribe.bind(this, name)}>续 费</a>;
    }
    return buyButton;
  }

  renderArticleList() {
    const {data, receivedAt} = this.props.subscribleArticle;
    let articleListDom = <div className="loading">数据加载中，请稍等</div>;

    if (typeof receivedAt !== 'undefined') {
      if (data.length === 0) {
        articleListDom = <div className="no-datas">没有数据</div>;
      } else {
        articleListDom = data.map(article => <SubscribeArticleBox key={article.id} article={article}/>);
      }
    }
    return articleListDom;
  }

  render() {
    return (
      <div className="subscribe-article-list-page">
        <div className="content">
          <div className="head">
            {this.renderHeaderDom()}
            {this.renderBuyButtonDom()}
          </div>
          <div className="subscribe-article-list">
            {this.renderArticleList()}
          </div>
        </div>
        <Footer footerIndex={2}/>
      </div>
    );
  }

  componentDidMount() {
    const user_id = this.user_id;
    const produce_id = this.produce_id;

    if (typeof this.props.subscribleArticle.receivedAt === 'undefined') {
      this.props.subscribeArticleActions.fetchfetchArticleListIfNeeded(user_id, produce_id);
    }

    if (typeof this.props.subscribleTeacher.receivedAt === 'undefined') {
      this.props.subscribeTeacherActions.fetchTeacherListIfNeeded(user_id);
    }

    if (typeof this.props.productList.receivedAt === 'undefined') {
      this.props.productListActions.fetchListIfNeeded();
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
          console.log(err);
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
  subscribeTeacherActions: PropTypes.object,
  subscribleArticle: PropTypes.object,
  subscribeArticleActions: PropTypes.object,
  productList: PropTypes.object,
  productListActions: PropTypes.object
};


/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    wxinfo: state.wxinfo,
    userinfo: state.userinfo,
    productList: state.productList,
    subscribleArticle: state.subscribleArticle,
    subscribleTeacher: state.subscribleTeacher
  };
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeArticleActions: bindActionCreators(actions, dispatch),
    subscribeTeacherActions: bindActionCreators(subscribeTeacherActionsFromOtherFile, dispatch),
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeArticleListPage);
