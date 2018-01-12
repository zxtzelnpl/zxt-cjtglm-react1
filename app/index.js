import './static/css/font-awesome.less'
import './static/css/public.less'
import 'whatwg-fetch'
import React from 'react'
import {render} from 'react-dom'

import Perf from 'react-addons-perf'

import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

import {HashRouter} from 'react-router-dom'
import App from './App'
import Loading from './components/Loading'
import ErrPage from './subpages/ErrPage'
import {initialState as userInitialState} from './reducers/userinfo'
import {getCode, getQuery} from './static/js/tools'

if (__DEV__) {
  /**上线后一定要删除啊,别忘了啊**/
  localStorage.removeItem('wxinfo')
  localStorage.removeItem('userinfo')
  /**上线后一定要删除啊,别忘了啊**/
  console.info('__DEV__是' + __DEV__ + '这里是测试环境')
  if (typeof localStorage === 'object') {
    localStorage.setItem('wxinfo', '{"openid":"oijVfszBRm_nxYzNH6RAchSKXFxE","nick_name":"Aaron Z","province":"内蒙古","country":"中国","city":"兴安","sex":"1","headimgurl":"http://wx.qlogo.cn/mmopen/eicLiaJS1h1icicgVjuY73ysqeko4NXxYIK4qOfiaO1D8yjrAmcAISZUOoniaAvAZAuJice6YtWoicGnhals1PUbFXvY0L4jicF65r8VC/0","channel":"超级投顾订阅号","user_count":"1","erro":"OK"}')
    // localStorage.setItem('wxinfo', '{"openid":"oijVfsw2oDpwn4Z6vnd03RZUaLSc","nick_name":"山高水深","province":"内蒙古","country":"中国","city":"兴安","sex":"1","headimgurl":"http://wx.qlogo.cn/mmopen/eicLiaJS1h1ic9fkmUp5iattHsT8EeJ0JdJicjmchz6hCicZXiaicqR4mlv9iaoV4ibTOInW2VjOhbx1MZ9U3PhT8VgVrSltZL3IRgicXf9/0","channel":"超级投顾订阅号","user_count":"1","erro":"OK"}')
  }
  if (typeof window === 'object') {
    window.Perf = Perf
  }
}


render(
    <Loading/>, document.getElementById('root')
)
getInitialState()

function __render (wxinfo, userinfo) {
  let store = configureStore({
    wxinfo: wxinfo,
    userinfo: userinfo
  })
  console.log(store.getState())
  render(
      <Provider store={store}>
        <HashRouter>
          <App/>
        </HashRouter>
      </Provider>
      ,
      document.getElementById('root')
  )
}

function getInitialState () {
  let userinfo = userInitialState
  if (typeof localStorage === 'object' && localStorage.getItem('userinfo')) {
    userinfo = JSON.parse(localStorage.getItem('userinfo'))
  }

  let getWxinfo = new Promise((resolve, reject) => {
    if (typeof localStorage === 'object' && localStorage.getItem('wxinfo')) {
      let wxinfo = JSON.parse(localStorage.getItem('wxinfo'))
      resolve(wxinfo)
    }
    else {
      let query = getQuery(location.search)
      if (query.code) {
        fetch('/ashx/wx_openid_user_is.ashx?code=' + query.code)
            .then(res => {
              return res.json()
            })
            .then(json => {
              if (json.erro !== 'OK') {
                reject({
                  state: 'noAttention',
                  message: '您还没有关注公众号《超级投顾联盟》，请先关注后查看页面'
                })
              }
              else {
                let wxinfo = json
                wxinfo.receviedAt=new Date().getTime()
                localStorage.setItem('wxinfo', JSON.stringify(wxinfo))
                resolve(wxinfo)
              }
            })
            .catch(() => {
              reject({
                state: 'net',
                message: '网络错误，请稍后重试'
              })
            })
      }
      else {
        getCode()
      }
    }
  })

  getWxinfo.then(wxinfo => {
    __render(wxinfo, userinfo)
  })
      .catch(err => {
        if (err.message) {
          render(
              <ErrPage message={err.message}/>, document.getElementById('root')
          )
        }
      })
}






