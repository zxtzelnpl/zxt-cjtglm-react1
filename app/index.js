import './static/css/font-awesome.less';
import './static/css/public.less';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';

import Perf from 'react-addons-perf';

import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import {HashRouter} from 'react-router-dom';
import App from './App';
import Loading from './component_loading';
import {view as ErrPage} from './page_err';
import {getCode, getQuery} from './static/js/tools';

/* 如果是测试环境*/
if (__DEV__) {
  /** 上线后一定要删除啊,别忘了啊**/
  localStorage.removeItem('wxinfo');
  localStorage.removeItem('userinfo');
  /** 上线后一定要删除啊,别忘了啊**/
  console.info(`__DEV__是${__DEV__}这里是测试环境`);
  if (typeof localStorage === 'object') {
    localStorage.setItem('wxinfo', '{"openid":"oijVfszBRm_nxYzNH6RAchSKXFxE","nick_name":"Aaron Z","province":"内蒙古","country":"中国","city":"兴安","sex":"1","headimgurl":"http://wx.qlogo.cn/mmopen/eicLiaJS1h1icicgVjuY73ysqeko4NXxYIK4qOfiaO1D8yjrAmcAISZUOoniaAvAZAuJice6YtWoicGnhals1PUbFXvY0L4jicF65r8VC/0","channel":"超级投顾订阅号","user_count":"0","erro":"OK"}');
  }
  if (typeof window === 'object') {
    window.Perf = Perf;
  }
}

/* 页面先进入Loading*/
render(
  <Loading/>, document.getElementById('root')
);


function __render(wxinfo) {
  const store = configureStore({
    wxinfo: wxinfo
  });
  console.log(store.getState());
  render(
    <Provider store={store}>
      <HashRouter>
        <App/>
      </HashRouter>
    </Provider>
    ,
    document.getElementById('root')
  );
}

function getInitialState() {
  return new Promise((resolve, reject) => {
    if (typeof localStorage === 'object' && localStorage.getItem('wxinfo')) {
      const wxinfo = JSON.parse(localStorage.getItem('wxinfo'));
      resolve(wxinfo);
    } else {
      const query = getQuery(location.search);
      if (query.code) {
        fetch(`/ashx/wx_openid_user_is.ashx?code=${query.code}`)
          .then(res => res.json())
          .then(json => {
            if (json.erro !== 'OK') {
              reject({
                state: 'noAttention',
                message: '您还没有关注公众号《超级投顾联盟》，请先关注后查看页面'
              });
            } else {
              json.receviedAt = new Date().getTime();
              localStorage.setItem('wxinfo', JSON.stringify(json));
              resolve(json);
            }
          })
          .catch(() => {
            reject({
              state: 'net',
              message: '网络错误，请稍后重试'
            });
          });
      } else {
        getCode();
      }
    }
  });
}

getInitialState()
  .then(wxinfo => {
    __render(wxinfo);
  })
  .catch(err => {
    if (err.message) {
      render(
        <ErrPage message={err.message}/>, document.getElementById('root')
      );
    }
  });


