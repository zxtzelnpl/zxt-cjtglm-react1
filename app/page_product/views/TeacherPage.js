import {actions as productListActionsFromOtherFile} from '../../page_product';
import {actions as wxInfoActionsFromOtherFile} from '../../page_weixin';
import {actions as userInfoActionsFromOtherFile} from '../../page_center';
import TeachaerBrief from './TeacherBrief';
import ScrollStock from './ScrollStock';
import DownImage from './DownImage';
import Subscribe from '../../component_subscribe';
import Footer from '../../component_footer';
import Charts from './Charts';
import detail from '../../static/img/teacher/detail.jpg';
import {getQuery, getCode} from '../../static/js/tools';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TeacherPage extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.index = 0;
  }

  render() {
    console.log(++this.index);
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
      );
    }
    else {
      return <div className="none"/>;
    }
  }

  componentDidMount() {
    this.getProducts();
    let wxInfoPromise = this.getWeiXinInfo();
    let userInfoPromise = this.getUserInfo(wxInfoPromise);

    userInfoPromise.then(() => {

    })
      .catch((err) => {

      });
  }

  getWeiXinInfo() {
    return new Promise((resolve, reject) => {
      if (this.props.wxinfo.openid) {
        resolve({
          hasLoad: true,
          openid: this.props.wxinfo.openid
        });
      }
      else {
        let query = getQuery(location.search);
        if (!query.code) {
          getCode();
        } else {
          fetch('/ashx/wx_openid_user_is.ashx?code=' + query.code)
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.openid == null) {
                reject({
                  reason: 'notSubscribe',
                  msg: '关注微信公众号《君银牛人堂》注册后可进行购买'
                });
              }
              else {
                this.props.wxInfoActions.get(json);
                resolve(json);
              }
            })
            .catch((err) => {
              reject({
                reason: 'notSubscribe',
                msg: '关注微信公众号《君银牛人堂》注册后可进行购买'
              });
            });
        }
      }
    });
  }

  getUserInfo(wxInfoPromise) {
    return new Promise((resolve, reject) => {
      wxInfoPromise.then((wxinfo) => {
        if (this.props.userinfo.id) {
          resolve(
            {
              ...this.props.info,
              hasLoad: true
            }
          );
        }
        else {
          let openid = wxinfo.openid;
          let url = `/ashx/users_id.ashx?openid=${openid}`;
          fetch(url)
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.length > 0 && json[0].id) {
                resolve(json[0]);
                this.props.userInfoActions.load(json[0]);
              }
              else {
                reject({
                  reason: 'notRegister',
                  msg: '你未注册，需购注册后方可查看'
                });
              }
            })
            .catch(() => {
              reject({
                reason: 'notRegister',
                msg: '你未注册，需购注册后方可查看'
              });
            });
        }
      });
    });
  }

  getProducts() {
    if (this.props.productlist.size === 0) {
      fetch('/ashx/productlist.ashx', {
        method: 'get'
      })
        .then((response) => {
          return response.json();
        })
        .then((productlist) => {
          this.props.productListActions.load(productlist);
          document.body.scrollTop = 0;
        });
    }
  }
}

TeacherPage.propTypes = {
  productlist: PropTypes.object,
  wxinfo: PropTypes.object,
  userinfo: PropTypes.object,
  productListActions: PropTypes.object,
  wxInfoActions: PropTypes.object,
  userInfoActions: PropTypes.object
};

/**
 * ********** React Redux **********
 */
function mapStateToProps(state) {
  return {
    productlist: state.productlist,
    wxinfo: state.wxinfo,
    userinfo: state.userinfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productListActions: bindActionCreators(productListActionsFromOtherFile, dispatch),
    wxInfoActions: bindActionCreators(wxInfoActionsFromOtherFile, dispatch),
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherPage);


